import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import ReviewsStatistics from "../ReviewsStatistics";

test("Testing Reviews Statistics renders correctly", () => {
  render(
    <ReviewsStatistics reviewsLength={6} reviewsStatistics={mockReviewStats} />
  );
  const totalReviews = screen.getByText(/6/i);
  expect(totalReviews).toBeInTheDocument();

  // Checking all emojis is rendered
  const emojis = screen.getAllByRole("img", { name: /rating/i });
  expect(emojis).toHaveLength(5);

  // Checking the data in the rating bars
  const ratingBars = screen.getAllByTestId("rating bar div");
  expect(ratingBars).toHaveLength(5);

  within(ratingBars[0]).getByText(/2/i); // reviews number
  within(ratingBars[1]).getByText(/3/i); // reviews number
  within(ratingBars[2]).getByText(/0/i); // reviews number
  within(ratingBars[3]).getByText(/1/i); // reviews number
  within(ratingBars[4]).getByText(/0/i); // reviews number
});

const mockReviewStats = [
  { rating: 5, ctr: 2 },
  { rating: 4, ctr: 3 },
  { rating: 3, ctr: 0 },
  { rating: 2, ctr: 1 },
  { rating: 1, ctr: 0 },
];
