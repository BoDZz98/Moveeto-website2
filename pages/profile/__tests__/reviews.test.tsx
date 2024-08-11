import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import Reviews from "../reviews";
import { mockReviews } from "./mockData";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useRouter } from "next/router";

describe("testing profile Reviews pages", () => {
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  test("testing profile Reviews pages renders correctly", () => {
    render(<Reviews reviews={mockReviews} />);

    // Checking profile review is rendered
    const userReviews = screen.getAllByTestId("profile review");
    expect(userReviews).toHaveLength(4);

    // Checking reviews number
    const reviewsNumber = screen.getByRole("heading", {
      name: /4 reviews/i,
    });
    expect(reviewsNumber).toBeInTheDocument();

    // Checking rating div is rendered
    const ratingDivs = screen.getAllByTestId("rating div");
    expect(ratingDivs).toHaveLength(3);
  });

  test("testing the filter functionality", async () => {
    const user = userEvent.setup();
    console.log(mockReviews);

    render(<Reviews reviews={mockReviews} />);

    // Getting the first rating div
    const exeptionalRatingDiv = screen.getAllByTestId("rating div")[0];
    expect(exeptionalRatingDiv).toHaveClass(cont);

    // press on the rating div to activate the filter
    await user.click(exeptionalRatingDiv);
    const exeptionalRatingDiv2 = screen.getAllByTestId("rating div")[0];
    expect(exeptionalRatingDiv2).toHaveClass(activeCont);

    // Expect reviews with exeptional rating only to appear
    const filteredUserReviews = screen.getAllByTestId("profile review");
    expect(filteredUserReviews).toHaveLength(2);

    // press on the rating div to deactivate the filter
    await user.click(exeptionalRatingDiv2);
    const allUserReviews = screen.getAllByTestId("profile review");
    expect(allUserReviews).toHaveLength(4);
  });
  test("testing the edit functionality of the profile review", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Reviews reviews={mockReviews} />);

    // Getting the first profile review
    const userReview = screen.getAllByTestId("profile review")[0];
    const reviewDropdown = within(userReview).getByTestId("review dropdown");

    // finding and clicking the edit button
    await user.click(reviewDropdown);
    const editBttn = screen.getByRole("button", {
      name: /edit/i,
    });
    await user.click(editBttn);

    // Expect the manage rating modale to be opened with the old review value
    const emoji = screen.getByRole("img", {
      name: /meh emoji/i,
    });
    const textbox = screen.getByRole("textbox", {
      name: /description/i,
    });

    await user.click(emoji);
    await user.clear(textbox);
    await user.type(textbox, "new review description");

    // Finding and clicking submit bttn
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Expect the page to be refreshed, and the modal to be closed
    expect(pushMock).toHaveBeenCalledWith("/profile/reviews");
    const modalTitle = screen.queryByText(/edit rating/i);
    expect(modalTitle).not.toBeInTheDocument();

    // update the data and re-render the page
    mockReviews[0].rating = 3;
    mockReviews[0].description = "new review description";
    rerender(<Reviews reviews={mockReviews} />);

    // Finding the new user review
    const newUserReview = screen.getAllByTestId("profile review")[0];
    within(newUserReview).getByRole("img", {
      name: /3 stars/i,
    });
    within(newUserReview).getByText(/new review description/i);
  });
  test("Making sure the emptyPage component is rendered if there is no reviews", () => {
    mockReviews.splice(0, 4); // removing all elements of array
    render(<Reviews reviews={mockReviews} />);

    // Checking the emptyPage component is rendered
    const title = screen.getByText(/no reviews yet/i);
    expect(title).toBeInTheDocument();

    // Checking profile review is not rendered
    const userReviews = screen.queryAllByTestId("profile review");
    expect(userReviews).toHaveLength(0);

    // Checking reviews number is not rendered
    const reviewsNumber = screen.queryByRole("heading", {
      name: /reviews/i,
    });
    expect(reviewsNumber).toBeInTheDocument();

    // Checking rating div is not rendered
    const ratingDivs = screen.queryAllByTestId("rating div");
    expect(ratingDivs).toHaveLength(0);
  });
});

const cont =
  "flex relative w-fit p-4 items-center rounded-full bg-transparent ring-2 ring-gray-500 text-white hover:bg-white  hover:cursor-pointer group transition ease-in-out delay-150";
const activeCont =
  "flex relative w-fit p-4 items-center rounded-full text-black ring-2 ring-gray-500  bg-white  hover:cursor-pointer  ";
