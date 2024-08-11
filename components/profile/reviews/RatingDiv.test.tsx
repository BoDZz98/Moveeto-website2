import { render, screen } from "@testing-library/react";
import RatingDiv from "./RatingDiv";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("testing rating div comp", () => {
  const mockClickHandler = vi.fn();
  const mockData = {
    isActive: false,
    onClickHandler: mockClickHandler,
    rating: 5,
    reviewsNumber: 2,
  };
  test("testing rating div renders correctly", async () => {
    const user = userEvent.setup();

    render(<RatingDiv {...mockData} />);

    const ratingDiv = screen.getByTestId("rating div");
    const emoji = screen.getByRole("img", {
      name: /exeptional/i,
    });
    const rating = screen.getByText(/exeptional/i);
    const reviewsNumber = screen.getByText(/2/i);

    expect(ratingDiv).toHaveClass(cont);
    expect(emoji).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(reviewsNumber).toBeInTheDocument();

    // Testing the click handler functionality
    await user.click(ratingDiv);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
  test("testing rating div renders correctly with isActive=true prop", () => {
    render(<RatingDiv {...mockData} isActive />);

    const ratingDiv = screen.getByTestId("rating div");
    expect(ratingDiv).toHaveClass(activeCont);
  });
});

const cont =
  "flex relative w-fit p-4 items-center rounded-full bg-transparent ring-2 ring-gray-500 text-white hover:bg-white  hover:cursor-pointer group transition ease-in-out delay-150";
const activeCont =
  "flex relative w-fit p-4 items-center rounded-full text-black ring-2 ring-gray-500  bg-white  hover:cursor-pointer  ";
