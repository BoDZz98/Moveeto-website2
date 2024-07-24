import {
  logRoles,
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MovieGridItem from "../MovieGridItem";
import userEvent from "@testing-library/user-event";
import * as sessionHook from "@/hooks/useMySession";
import { vi } from "vitest";

const movie = {
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  id: "519182",
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  vote_count: 157,
  genres: ["Animation", "Family", "Adventure", "Comedy"],
};

describe("testing Movie Grid Item", () => {
  let mockUseMySession: any;

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

  beforeEach(() => {
    // Initialize the mock data
    mockUseMySession = {
      userFavMovies: [],
      userWishlistMovies: [],
      userCollections: [
        { name: "collection 1", movies: [] },
        { name: "coll 2", movies: [] },
      ],
      update: vi.fn(),
    };
    // Mock the return value of useMySession
    vi.spyOn(sessionHook, "default").mockReturnValue(mockUseMySession);
  });

  test("Adding movie to fav/wishlist and userLists", async () => {
    const user = userEvent.setup();
    render(<MovieGridItem movie={movie} />);

    const favCont = screen.getByTestId("favCont");
    const wishlistCont = screen.getByTestId("wishlistCont");
    const dropdownCont = screen.getByTestId("dropdown");

    // Adding movie to fav/wishlist
    await user.click(favCont);
    await user.click(wishlistCont);
    mockUseMySession.userFavMovies = [{ title: "Despicable Me 4" }];
    mockUseMySession.userWishlistMovies = [{ title: "Despicable Me 4" }];
    // Adding movie to a user list
    await user.click(dropdownCont);
    const collectionBttn = screen.getByRole("button", {
      name: /collection 1/i,
    });
    await user.click(collectionBttn);
    mockUseMySession.userCollections[0].movies = [{ id: "519182" }];

    // re-render again (refreshing the page)
    const { container } = render(<MovieGridItem movie={movie} />);

    // Checking the fav/wishlist cont
    const favCont2 = within(container).getByTestId("favCont");
    const wishlistCont2 = within(container).getByTestId("wishlistCont");
    expect(favCont2).toHaveClass("bg-green-400 hover:bg-green-500");
    expect(wishlistCont2).toHaveClass("bg-green-400 hover:bg-green-500");

    const dropdownBtn2 = within(container).getByTestId("dropdown");
    await user.click(dropdownBtn2);

    // Checking the check icon
    const button2 = within(container).getByRole("button", {
      name: /collection 1/i,
    });
    within(button2).getByTestId("check icon");
  });
});
