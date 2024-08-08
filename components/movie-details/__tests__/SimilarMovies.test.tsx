import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import SimilarMovies from "../SimilarMovies";

test("testing Similar Movies component render correctly", () => {
  render(
    <SimilarMovies
      title="Despicable Me 4"
      movies={similarMovies}
      genresDetails={genreDetails}
    />
  );
  const title = screen.getByRole("heading", {
    name: /movies like despicable me 4/i,
  });
  expect(title).toBeInTheDocument();

  const movies = screen.getAllByTestId(/movieGridItem/i);
  expect(movies).toHaveLength(3);
});

const similarMovies = [
  {
    backdrop_path: "/rlvM2us5esS6TXB581vZx6BzHzO.jpg",
    genre_ids: [28, 12],
    id: 401461,
    poster_path: "/uSZrqoprWkiK770H7XUjLXzyGzD.jpg",
    release_date: "1943-12-24",
    title: "The Phantom",
    vote_count: 9,
  },
  {
    backdrop_path: "/ojN1ZbXnCJ7evbbp57oLG1EQTM7.jpg",
    genre_ids: [28],
    id: 401478,
    poster_path: "/1PrlKvPUbDQAqFQBCyyt68hLLl.jpg",
    release_date: "2018-10-02",
    title: "Death Race: Beyond Anarchy",
    vote_count: 319,
  },
  {
    backdrop_path: "/2ex2beZ4ssMeOduLD0ILzXKCiep.jpg",
    genre_ids: [28, 12],
    id: 246655,
    poster_path: "/2mtQwJKVKQrZgTz49Dizb25eOQQ.jpg",
    release_date: "2016-05-18",
    title: "X-Men: Apocalypse",
    vote_count: 12723,
  },
];

const genreDetails = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
];
