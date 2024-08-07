import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Screenshots from "../[movieId]/screenshots";

test("testing screenshots page renders correctly", () => {
  const { container } = render(<Screenshots movie={mockMovie} />);
  //   logRoles(container);

  const pageTitle = screen.getByRole("heading", { name: /screenshots/i });
  expect(pageTitle).toBeInTheDocument();

  const movieImgs = screen.getAllByRole("img", {
    name: /movieImg/i,
  });
  expect(movieImgs).toHaveLength(3);
});

const mockMovie = {
  id: 519182,
  title: "Despicable Me 4",
  poster: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
  backdrop_path: "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
  vote_average: "7.2",
  release_date: "2024-06-20",
  runtime: "1h 34 min",
  overview:
    "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
  genres: ["Animation", "Family", "Comedy", "Action"],
  images: [
    {
      file_path: "/5g2n3ilC8DpYv4diJeuQ1vKG2Kb.jpg",
    },
    {
      file_path: "/fDmuPREB3yTrelyYugguEine5Y1.jpg",
    },
    {
      file_path: "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
    },
  ],
  production_companies: [
    {
      name: "Illumination",
    },
    {
      name: "Universal Pictures",
    },
  ],
  production_countries: [{ name: "United States of America" }],
  cast: [
    {
      name: "Steve Carell",
      profile_path: "/dzJtsLspH5Bf8Tvw7OQC47ETNfJ.jpg",
      character: "Felonious Gru / Chet (voice)",
    },
    {
      name: "Kristen Wiig",
      profile_path: "/p4QYkJ7EboyhzQcexH86SgCOki7.jpg",
      character: "Lucy Gru / Blanche (voice)",
    },
    {
      name: "Joey King",
      profile_path: "/b0diEOPPAxOOInWOP9koaqvqUvi.jpg",
      character: "Poppy Prescott (voice)",
    },
  ],
  similarMovies: [
    {
      backdrop_path: "/pEIMupNX89ICz7LoLkimn14aSDQ.jpg",
      genre_ids: [28, 12],
      id: 253780,
      poster_path: "/dgQCBgt4lKEywMpOzoBtyh9lv4q.jpg",
      release_date: "1942-04-04",
      title: "Spy Smasher",
      vote_count: 6,
    },
    {
      backdrop_path: "/8FRvEFTdZxx0ICeP0egjxRE5NHE.jpg",
      genre_ids: [28, 12],
      id: 254263,
      poster_path: "/vfDbTS4eg5I7x70JoPIFvyzayx0.jpg",
      release_date: "2014-02-25",
      title: "The Swan Princess: A Royal Family Tale",
      vote_count: 40,
    },
    {
      backdrop_path: "/8FRvEFTdZxx0ICeP0egjxRE5NHE.jpg",
      genre_ids: [28, 12],
      id: 1204917,
      poster_path: "/cPaGEf4RuVvwPArTjjaagHAv4jf.jpg",
      release_date: "2025-02-02",
      title: "Kung Fu Slayers",
      vote_count: 0,
    },
  ],
  revenue: "752.66 M",
  youtubeTrailerKey: "LtNYaH61dXY",
  vote_count: 512,
};
