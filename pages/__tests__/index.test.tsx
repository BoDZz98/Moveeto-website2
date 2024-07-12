import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Home from "../index";

const popularMovies = [
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

describe("Testing the Home page", () => {
  test("renders the home page", () => {
    render(<Home movies={popularMovies} />);
    const movieTitle = screen.getByRole("heading", {
      name: /inside out 2/i,
    });
    expect(movieTitle).toBeDefined();

    const moviesItem = screen.getAllByTestId("movieGridItem");
    expect(moviesItem.length).toBe(2); // Asserts that YourComponent is rendered twice
  });
});
