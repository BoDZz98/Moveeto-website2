import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import AddToButtons from "../AddToButtons";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";

describe("Testing AddToButtons component", () => {
  let mockUseMySession: any;

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
  test("render AddToButtons component correctly", () => {
    render(<AddToButtons />);

    const favButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    const wishlistButton = screen.getByRole("button", {
      name: /add to wishlist/i,
    });
    const collectionBtn = screen.getByRole("button", {
      name: /save to collection/i,
    });

    // Checking for all 3 buttons
    expect(favButton).toBeInTheDocument();
    expect(wishlistButton).toBeInTheDocument();
    expect(collectionBtn).toBeInTheDocument();
  });

  test("render component correctly if the movie is added to fav and wishlist", async () => {
    mockUseMySession.userFavMovies = [{ title: "Despicable Me 4" }];
    mockUseMySession.userWishlistMovies = [{ title: "Despicable Me 4" }];

    render(<AddToButtons />);

    const favButton = await screen.findByRole("button", {
      name: /add to favorites/i,
    });
    const wishlistButton = await screen.findByRole("button", {
      name: /add to wishlist/i,
    });
    screen.debug();
    expect(favButton).toHaveClass("border-2 border-green-500 ");
    expect(wishlistButton).toHaveClass(
      "border-2 border-green-500 hover:border-green-400"
    );
  });
});
