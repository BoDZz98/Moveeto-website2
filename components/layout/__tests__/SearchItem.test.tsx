import { render, screen } from "@testing-library/react";
import SearchItem from "../SearchItem";
import userEvent from "@testing-library/user-event";

const movie = {
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  poster_path: "/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
  id: 519182,
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  vote_count: 157,
  vote_average: 7.5,
};

describe("testing search item", () => {
  test("search item renders correctly", () => {
    render(<SearchItem movie={movie} />);

    const img = screen.getByRole("img", {
      name: /movie img/i,
    });
    const movieTitle = screen.getByRole("link", { name: "Despicable Me 4" });
    const movieLinks = screen.getAllByRole("link");

    expect(img).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieLinks).toHaveLength(2);

    expect(img).toHaveClass(" hover:opacity-60 cursor-pointer");
    expect(movieTitle).toHaveClass("hover:text-gray-500 cursor-pointer");
  });
});
