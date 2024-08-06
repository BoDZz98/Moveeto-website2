import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import { mockMovie } from "./index.test";
import SimilarMovies from "../[movieId]/similarMovies";

test("testing cast page renders correctly", () => {
  const { container } = render(<SimilarMovies movie={mockMovie} />);
  //   logRoles(container);

  const pageTitle = screen.getByRole("heading", { name: /similar movies/i });
  expect(pageTitle).toBeInTheDocument();

  const similarMovies = screen.getAllByTestId("movieGridItem");
  expect(similarMovies).toHaveLength(3);
});
