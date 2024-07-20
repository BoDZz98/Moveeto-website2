import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import MovieGridItem from "../MovieGridItem";

const movie = {
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  id: "519182",
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  vote_count: 157,
  genres: ["Animation", "Family", "Adventure", "Comedy"],
};

describe("testing Movie Grid Item", () => {
  test("Movie Grid Item renders correctly", () => {
    const { container } = render(<MovieGridItem movie={movie} />);

    // logRoles(container);

    const img = screen.getByRole("img", { name: /movie img/i });
    const movieTitleLink = screen.getByRole("link", {
      name: /despicable me 4/i,
    });
    const movieDate = screen.getByRole("heading", {
      name: /2024\-06\-20/i,
    });
    const similarMoviesLink = screen.getByRole("link", {
      name: /show more like this/i,
    });
    const movieGenres = screen.getAllByRole("heading", {
      level: 6,
    });
    expect(img).toBeInTheDocument();
    expect(movieDate).toBeInTheDocument();
    expect(movieGenres).toHaveLength(4);
    expect(movieTitleLink).toHaveAttribute("href", "/movie/519182");
    expect(similarMoviesLink).toHaveAttribute(
      "href",
      "/movie/519182/similarMovies"
    );
  });
});
