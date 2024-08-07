import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import RatingBar from "../RatingBar";

describe("testing Rating bar component", () => {
  const mockRatingBar = { color: "red", count: 3, progress: 40 };
  test("should render rating bar correctly with a label", () => {
    render(<RatingBar label="Favorite" {...mockRatingBar} />);

    // checking the progress of the rating bar
    const ratingBar = screen.getByRole("progressbar");
    expect(ratingBar).toHaveAttribute("aria-valuenow", "40");

    // checking the label and count
    const label = screen.getByText(/Favorite/i);
    const count = screen.getByText(/3/i);
    expect(label).toBeInTheDocument();
    expect(count).toBeInTheDocument();
  });

  test("should render rating bar correctly with an emoji", () => {
    render(<RatingBar image={5} {...mockRatingBar} progress={50} />);

    // checking the progress of the rating bar
    const ratingBar = screen.getByRole("progressbar");
    expect(ratingBar).toHaveAttribute("aria-valuenow", "50");

    // checking the label and count
    const emoji = screen.getByRole("img", { name: /rating/i });
    const count = screen.getByText(/3/i);
    expect(emoji).toBeInTheDocument();
    expect(count).toBeInTheDocument();
  });
});
