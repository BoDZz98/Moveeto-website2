import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MovieDetails from "../MovieDetails";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";

describe("testing details component", () => {
  // Provider props is used if we want to pass different data to our context , in each test case
  const movieData = {
    runtime: "1h 34 min",
    release_date: "2024-06-20",
    revenue: "686.66 M",
    overview:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family,",
    genres: ["Animation", "Family", "Comedy", "Action"],
    production_companies: [{ name: "Illumination" }, { name: "Universal" }],
    production_countries: [{ name: "United States of America" }],
  };
  // @ts-ignore
  const customRender = (ui) => {
    return render(
      <MovieDetailsCtx.Provider
        // @ts-ignore
        value={{ movieData }}
      >
        {ui}
      </MovieDetailsCtx.Provider>
    );
  };
  test("Render movie details component correctly", () => {
    customRender(<MovieDetails />);

    const date = screen.getByText(/2024\-06\-20/i);
    const runtime = screen.getByText(/1h 34 min/i);
    const revenue = screen.getByText(/686\.66 m/i);
    expect(date).toBeInTheDocument();
    expect(runtime).toBeInTheDocument();
    expect(revenue).toBeInTheDocument();

    const genresDiv = screen.getByTestId("Genres");
    const genres = within(genresDiv).getAllByRole("heading");
    expect(genres).toHaveLength(4);

    const production_companiesDiv = screen.getByTestId("Production Companies");
    const production_companies = within(production_companiesDiv).getAllByRole(
      "heading"
    );
    expect(production_companies).toHaveLength(2);

    const production_countriesDiv = screen.getByTestId("Production Countries");
    const production_countries = within(production_countriesDiv).getAllByRole(
      "heading"
    );
    expect(production_countries).toHaveLength(1);
  });
});
