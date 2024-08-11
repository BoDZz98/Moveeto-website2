import {
  act,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import Favorite from "../favorite";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";
import { mockFavMovies } from "./mockData";
import userEvent from "@testing-library/user-event";

describe("Testing favorite page ", () => {
  let mockUseMySession: any;
  beforeEach(() => {
    // Initialize the mock data
    mockUseMySession = {
      userFavMovies: mockFavMovies,
      update: vi.fn(),
    };
    // Mock the return value of useMySession
    vi.spyOn(sessionHook, "default").mockReturnValue(mockUseMySession);
  });

  //--------------------------------------------------------------------------------------------------------------------------

  test("Testing favorite page renders correctly", () => {
    render(<Favorite />);

    // Checking search bar
    const searchBar = screen.getByPlaceholderText("Search my favorite");
    expect(searchBar).toHaveValue("");

    // Checking movies grid
    const moviesItem = screen.getAllByTestId(/movieGridItem/i);
    expect(moviesItem).toHaveLength(3);
  });
  test("Testing search functionality", async () => {
    const user = userEvent.setup();
    render(<Favorite />);

    // Type in the search bar
    const searchBar = screen.getByPlaceholderText("Search my favorite");
    await user.type(searchBar, "Civil War");

    // Checking movies grid
    const moviesItem = screen.getAllByTestId(/movieGridItem/i);
    expect(moviesItem).toHaveLength(1);

    // Clear search bar and check movies grid
    user.clear(searchBar);
    const moviesItem2 = screen.getAllByTestId(/movieGridItem/i);
    expect(moviesItem2).toHaveLength(3);
  });
  test("The movie should be removed from the page if we press on the fav bttn", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Favorite />);

    // Find movie and fav bttn
    const movie = screen.getByTestId(/civil war movieGridItem/i);
    const favBttn = within(movie).getByTestId("favCont");

    await user.click(favBttn);

    // Modifying data and re-rendering page
    mockUseMySession.userFavMovies.splice(0, 1); //removing the first element
    rerender(<Favorite />);

    // Make sure it's removed from the page
    const movie2 = screen.queryByTestId(/civil war movieGridItem/i);
    expect(movie2).not.toBeInTheDocument();

    // Making sure the rest of the movies is rendered
    const moviesItem = screen.getAllByTestId(/movieGridItem/i);
    expect(moviesItem).toHaveLength(2);
  });
  test("Empty page component should be rendered if there no fav movies", () => {
    mockUseMySession.userFavMovies = []; //clearing the array
    render(<Favorite />);

    // Checking Empty page
    const title = screen.getByText(/no movies yet/i);
    const emoji = screen.getByRole("img", { name: /sleeping/i });
    expect(title).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();

    // Checking the search bar is not rendered
    const searchBar = screen.queryByPlaceholderText("Search my favorite");
    expect(searchBar).not.toBeInTheDocument();

    // Checking movies grid is not rendered
    const moviesItem = screen.queryAllByTestId(/movieGridItem/i);
    expect(moviesItem).toHaveLength(0);
  });
});
