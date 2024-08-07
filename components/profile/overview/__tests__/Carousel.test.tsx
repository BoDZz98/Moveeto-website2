// describe('first', () => { second })

import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import Carousel from "../MyCarousel";

test("Testing my carousel component renders correctly", () => {
  const { container } = render(<Carousel movies={mockFavMovies} />);
  //   logRoles(container);

  const movieGridItems = screen.getAllByRole("img");
  expect(movieGridItems).toHaveLength(2);
});

const mockFavMovies = [
  {
    id: "653346",
    title: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_count: 794,
    _id: "666189f25b5f88fd0348a108",
  },
  {
    id: "929590",
    title: "Civil War",
    release_date: "2024-04-10",
    backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
    genres: ["War", "Action", "Drama"],
    vote_count: 1260,
    _id: "666194ba5b5f88fd0348a1dd",
  },
];
