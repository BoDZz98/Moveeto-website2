import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import MovieComments from "../[movieId]/reviews";
import { mockMovie } from "./index.test";

test("Testing reviews page render correctly", () => {
  const { container } = render(
    <MovieComments movie={mockMovie} reviews={mockReviews} />
  );
  //   logRoles(container);
  const pageTitle = screen.getByRole("heading", { name: /reviews/i, level: 3 });
  expect(pageTitle).toBeInTheDocument();

  const allReviews = screen.getAllByTestId("review div");
  expect(allReviews).toHaveLength(2);
});

const mockReviews = [
  {
    _id: "any_id",
    username: "bodzz",
    movieName: "Despicable Me 4",
    rating: 5,
    description: "nice movie",
    createdAt: "1-8-2024",
  },
  {
    _id: "any_id2",
    username: "bodzz",
    movieName: "Despicable Me 4",
    rating: 5,
    description: "nice movie",
    createdAt: "1-8-2024",
  },
];
