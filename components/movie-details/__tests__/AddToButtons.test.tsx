import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import AddToButtons from "../AddToButtons";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import userEvent from "@testing-library/user-event";

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
  //--------------------------------------------------------------------------------------------------------------------------
  // Provider props is used if we want to pass different data to our context , in each test case
  const providerProps = {};
  // @ts-ignore
  const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <MovieDetailsCtx.Provider
        value={{ movieData: { id: "519182", ...providerProps } }}
      >
        {ui}
      </MovieDetailsCtx.Provider>,
      renderOptions
    );
  };
  //--------------------------------------------------------------------------------------------------------------------------
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
    mockUseMySession.userFavMovies = [{ id: "519182" }];
    mockUseMySession.userWishlistMovies = [{ id: "519182" }];

    customRender(<AddToButtons />, { providerProps });

    const favButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    const wishlistButton = screen.getByRole("button", {
      name: /add to wishlist/i,
    });

    // Checking the right icons is rendered
    within(favButton).getByTestId("heartIcon");
    within(wishlistButton).getByTestId("wishlisted");

    // Checking the right style is applied
    expect(favButton).toHaveClass("border-2 border-green-500 ");
    expect(wishlistButton).toHaveClass(
      "border-2 border-green-500 hover:border-green-400"
    );
  });

  test("Testing the functionality of the buttons", async () => {
    const user = userEvent.setup();

    customRender(<AddToButtons />, { providerProps });
    // Finding the buttons and clicking it
    const favButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    const wishlistButton = screen.getByRole("button", {
      name: /add to wishlist/i,
    });

    await user.click(favButton);
    await user.click(wishlistButton);

    mockUseMySession.userFavMovies = [{ id: "519182" }];
    mockUseMySession.userWishlistMovies = [{ id: "519182" }];

    // re-rendering the component
    const { container } = customRender(<AddToButtons />, { providerProps });

    const favBttn = within(container).getByRole("button", {
      name: /add to favorites/i,
    });
    const wishlistBttn = within(container).getByRole("button", {
      name: /add to wishlist/i,
    });

    // Checking the right style is applied
    expect(favBttn).toHaveClass("border-2 border-green-500 ");
    expect(wishlistBttn).toHaveClass(
      "border-2 border-green-500 hover:border-green-400"
    );
  });
});
