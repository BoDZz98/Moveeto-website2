import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import ProfileReview from "../ProfileReview";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { vi } from "vitest";

describe("testing profile review", () => {
  // Mock the useRouter hook with the desired behavior
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  //---------------------------------------------------------------------------------
  test("testing profile review render correctly , not editable", () => {
    render(<ProfileReview review={mockReview} />);

    // Checking data
    const movieName = screen.getByText(/Despicable Me 4/i);
    const emoji = screen.getByRole("img", {
      name: /5 stars/i,
    });
    const reviewDescription = screen.getByText(/nice movie/i);
    const reviewDate = screen.getByText("1-8-2024");

    expect(movieName).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
    expect(reviewDescription).toBeInTheDocument();
    expect(reviewDate).toBeInTheDocument();

    // Making sure it's not editable
    const reviewDropdown = screen.queryByTestId("review dropdown");
    expect(reviewDropdown).not.toBeInTheDocument();
  });
  test("testing profile review render correctly , editable", async () => {
    const user = userEvent.setup();
    render(<ProfileReview review={mockReview} editable />);

    // Making sure it's editable
    const reviewDropdown = screen.getByTestId("review dropdown");
    expect(reviewDropdown).toBeInTheDocument();

    // Cheking the links after opening the dropdown
    await user.click(reviewDropdown);
    const editBttn = screen.getByRole("button", {
      name: /edit/i,
    });
    const deleteBttn = screen.getByRole("button", {
      name: /delete review/i,
    });
    expect(editBttn).toBeInTheDocument();
    expect(deleteBttn).toBeInTheDocument();
  });

  test("testing the edit button in the dropdown ", async () => {
    const user = userEvent.setup();
    render(<ProfileReview review={mockReview} editable />);

    const reviewDropdown = screen.getByTestId("review dropdown");
    expect(reviewDropdown).toBeInTheDocument();

    // Cheking the links after opening the dropdown
    await user.click(reviewDropdown);
    const editBttn = screen.getByRole("button", {
      name: /edit/i,
    });
    await user.click(editBttn);

    // Expect the manage rating modale to be opened with the old review value
    const editReview = screen.getByText(/edit rating/i);
    expect(editReview).toBeInTheDocument();
    const textbox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(textbox).toHaveTextContent("nice movie");
  });

  test("testing the delete button in the dropdown ", async () => {
    const user = userEvent.setup();
    render(<ProfileReview review={mockReview} editable />);

    const reviewDropdown = screen.getByTestId("review dropdown");
    expect(reviewDropdown).toBeInTheDocument();

    // Cheking the links after opening the dropdown
    await user.click(reviewDropdown);
    const deleteBttn = screen.getByRole("button", {
      name: /delete review/i,
    });
    await user.click(deleteBttn);

    // Expect the page to be refreshed
    expect(pushMock).toHaveBeenCalledWith("/profile/reviews");
  });
});

const mockReview = {
  _id: "66ab90ca6bbc879194a71316",
  username: "bodzz",
  movieId: "519182",
  movieName: "Despicable Me 4",
  rating: 5,
  description: "nice movie",
  createdAt: "2024-08-01T13:42:34.455Z",
};
