import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MGIButtonGroup from "../MGIButtonGroup";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";

const movie = {
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  id: "519182",
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  vote_count: 157,
  genres: ["Animation", "Family", "Adventure", "Comedy"],
};

describe("testing movie grid item button group renders correctly", () => {
  let mockUseMySession: any;

  beforeEach(() => {
    // Initialize the mock data
    mockUseMySession = {
      userFavMovies: [],
      userWishlistMovies: [],
      update: vi.fn(),
    };
    // Mock the return value of useMySession
    vi.spyOn(sessionHook, "default").mockReturnValue(mockUseMySession);
  });

  
  test("Testing button group render correctly", async () => {
    mockUseMySession.userFavMovies = [{ title: "Inside Out 2" }];
    mockUseMySession.userWishlistMovies = [{ title: "Inside Out 2" }];
    const user = userEvent.setup();
    render(<MGIButtonGroup movie={movie} />);

    const favCont = screen.getByTestId("favCont");
    const wishlistCont = screen.getByTestId("wishlistCont");
    const dropdownCont = screen.getByTestId("dropdownCont");

    expect(favCont).toBeInTheDocument();
    expect(wishlistCont).toBeInTheDocument();
    expect(dropdownCont).toBeInTheDocument();

    expect(favCont).not.toHaveClass("bg-green-400 hover:bg-green-500");
    expect(wishlistCont).not.toHaveClass("bg-green-400 hover:bg-green-500");
  });

  test("The favcont/wishlistCont should be in green if the movie is in user fav/wishlist movies", () => {
    mockUseMySession.userFavMovies = [{ title: "Despicable Me 4" }];
    mockUseMySession.userWishlistMovies = [{ title: "Despicable Me 4" }];

    render(<MGIButtonGroup movie={movie} />);

    const favCont = screen.getByTestId("favCont");
    const wishlistCont = screen.getByTestId("wishlistCont");

    expect(favCont).toHaveClass("bg-green-400 hover:bg-green-500");
    expect(wishlistCont).toHaveClass("bg-green-400 hover:bg-green-500");
  });

  test("Add movie to fav/wishlist", async () => {
    const user = userEvent.setup();
    render(<MGIButtonGroup movie={movie} />);

    const favCont = screen.getByTestId("favCont");
    const wishlistCont = screen.getByTestId("wishlistCont");

    await user.click(favCont);
    await user.click(wishlistCont);

    mockUseMySession.userFavMovies = [{ title: "Despicable Me 4" }];
    mockUseMySession.userWishlistMovies = [{ title: "Despicable Me 4" }];

    const { container } = render(<MGIButtonGroup movie={movie} />);

    const favCont2 = within(container).getByTestId("favCont");
    const wishlistCont2 = within(container).getByTestId("wishlistCont");

    expect(favCont2).toHaveClass("bg-green-400 hover:bg-green-500");
    expect(wishlistCont2).toHaveClass("bg-green-400 hover:bg-green-500");
  });

  test("remove movie from fav/wishlist , if they are already fav/wishlist", async () => {
    mockUseMySession.userFavMovies = [{ title: "Despicable Me 4" }];
    mockUseMySession.userWishlistMovies = [{ title: "Despicable Me 4" }];

    const user = userEvent.setup();
    render(<MGIButtonGroup movie={movie} />);

    const favCont = screen.getByTestId("favCont");
    const wishlistCont = screen.getByTestId("wishlistCont");

    await user.click(favCont);
    await user.click(wishlistCont);

    mockUseMySession.userFavMovies = [{ title: "Inside Out 2" }];
    mockUseMySession.userWishlistMovies = [{ title: "Inside Out 2" }];

    const { container } = render(<MGIButtonGroup movie={movie} />);

    const favCont2 = within(container).getByTestId("favCont");
    const wishlistCont2 = within(container).getByTestId("wishlistCont");

    expect(favCont2).not.toHaveClass("bg-green-400 hover:bg-green-500");
    expect(wishlistCont2).not.toHaveClass("bg-green-400 hover:bg-green-500");
  });
});
