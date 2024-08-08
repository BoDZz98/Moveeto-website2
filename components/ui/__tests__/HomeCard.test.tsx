import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import HomeCard from "../HomeCard";

const data = {
  title: "New and trending",
  subTitle: "Based on player counts and release date",
};
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
];

test("testing homecard component", () => {
  render(
    <HomeCard title={data.title} subTitle={data.subTitle} movies={movies} />
  );
  const pageTitle = screen.getByRole("heading", {
    name: /new and trending/i,
  });
  expect(pageTitle).toBeInTheDocument();

  const moviesItem = screen.getAllByTestId(/movieGridItem/i);
  expect(moviesItem.length).toBe(2);
});
