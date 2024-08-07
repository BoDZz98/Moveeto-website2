import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MoviesStatistics from "../MoviesStatistics";

test("Testing Movies Statistics component render correctly", () => {
  render(<MoviesStatistics favMoviesLength={2} wishlistMoviesLength={3} />);

  const totalMovies = screen.getByText(/5/i);
  expect(totalMovies).toBeInTheDocument();

  // Checking the data in the rating bars
  const ratingBars = screen.getAllByTestId("rating bar div");
  expect(ratingBars).toHaveLength(2);
  within(ratingBars[0]).getByText(/2/i); // movies number
  within(ratingBars[0]).getByText(/Favorite/i);

  within(ratingBars[1]).getByText(/3/i); // movies number
  within(ratingBars[1]).getByText(/wishlist/i);
});
