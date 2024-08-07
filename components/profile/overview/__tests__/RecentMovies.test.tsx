import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import RecentMovies from "../RecentMovies";

test("testing recent movies render correctly", () => {
  // Adding a duplicate movie to check wheter it will be rendered or not
  mockMovies.push({
    id: "653346",
    title: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_count: 636,
    _id: "66570b89a9437bb5f7e6d91f",
  });
  render(<RecentMovies movies={mockMovies} />);

  const compTitle = screen.getByText(/recently added movies/i);
  expect(compTitle).toBeInTheDocument();

  // Expect the repeated movie to be removed and not rendered
  const uniqueMovies = screen.getAllByTestId("recent movies div");
  expect(uniqueMovies).toHaveLength(3);

  // Checking data in a single movie div
  within(uniqueMovies[0]).getByRole("img", { name: /movie img/i });
  within(uniqueMovies[0]).getByText(/Kingdom of the Planet of the Apes/i);
  within(uniqueMovies[0]).getByText("2024-05-08");
  const buttons = within(uniqueMovies[0]).getAllByTestId(/cont/i);
  expect(buttons).toHaveLength(3);
});

const mockMovies = [
  {
    id: "653346",
    title: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_count: 636,
    _id: "66570b89a9437bb5f7e6d91f",
  },
  {
    id: "872585",
    title: "Oppenheimer",
    release_date: "2023-07-19",
    backdrop_path: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    genres: ["Drama", "History"],
    vote_count: 8142,
    _id: "66586ed4b8d6d66ec3c4d5db",
  },
  {
    id: "1011985",
    title: "Kung Fu Panda 4",
    release_date: "2024-03-02",
    backdrop_path: "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
    genres: ["Animation", "Action", "Family", "Comedy"],
    vote_count: 1892,
    _id: "6662f34076a2083a7e71c0bc",
  },
];
