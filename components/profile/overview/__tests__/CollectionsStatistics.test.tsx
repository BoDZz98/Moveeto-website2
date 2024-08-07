import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import CollectionsStatistics from "../CollectionsStatistics";

test("testing Collections Statistics renders correctly ", () => {
  render(<CollectionsStatistics collections={mockCollections} />);

  const totalCollections = screen.getByText("2");
  expect(totalCollections).toBeInTheDocument();

  // Checking data in collection divs
  const collections = screen.getAllByTestId("coll div");
  within(collections[0]).getByText("coll 1");
  within(collections[0]).getByText("3"); // movies number

  within(collections[1]).getByText("coll 2");
  within(collections[1]).getByText("1"); // movies number
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

const mockCollections = [
  {
    _id: "id1",
    name: "coll 1",
    description: "first coll",
    movies: mockMovies,
    createdAt: "1-8-2024",
  },
  {
    _id: "id2",
    name: "coll 2",
    description: "second coll",
    movies: mockMovies.slice(0, 1),
    createdAt: "1-8-2024",
  },
];
