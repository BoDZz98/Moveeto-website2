import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import MoviesGrid from "../MoviesGrid";

const movies = [
  {
    backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    id: "1022789",
    release_date: "2024-06-11",
    title: "Inside Out 2",
    vote_count: 1541,
    genres: ["Animation", "Family", "Adventure", "Comedy"],
  },
  {
    backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
    id: "519182",
    release_date: "2024-06-20",
    title: "Despicable Me 4",
    vote_count: 157,
    genres: ["Animation", "Family", "Comedy", "Action"],
  },
  {
    backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    id: "1022789",
    release_date: "2024-06-11",
    title: "Inside Out 2",
    vote_count: 1541,
    genres: ["Animation", "Family", "Adventure", "Comedy"],
  },
  {
    backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
    id: "519182",
    release_date: "2024-06-20",
    title: "Despicable Me 4",
    vote_count: 157,
    genres: ["Animation", "Family", "Comedy", "Action"],
  },
];

describe("testing movies grid component", () => {
  test("renders movies grid correctly", () => {
    render(<MoviesGrid movies={movies} />);
    const moviesItem = screen.getAllByTestId("movieGridItem");
    expect(moviesItem).toHaveLength(4);
  });
});
