import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import MovieGridItemDropdown from "../MGIDropdown";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";
import MGIButtonGroup from "../MGIButtonGroup";
import userEvent from "@testing-library/user-event";

const movie = {
  backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
  id: "519182",
  release_date: "2024-06-20",
  title: "Despicable Me 4",
  vote_count: 157,
  genres: ["Animation", "Family", "Adventure", "Comedy"],
};

describe("testing movie grid item dropdown", () => {
  let mockUseMySession: any;

  beforeEach(() => {
    // Initialize the mock data
    mockUseMySession = {
      //   userFavMovies: [],
      //   userWishlistMovies: [],
      userCollections: [],
    };
    // Mock the return value of useMySession
    vi.spyOn(sessionHook, "default").mockReturnValue(mockUseMySession);
  });

  test("movie grid item dropdown render correctly", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "collection 2", movies: [] },
    ];
    const user = userEvent.setup();

    const { container } = render(<MGIButtonGroup movie={movie} />);
    // logRoles(container);

    const dropdownCont = screen.getByTestId("dropdownCont");
    const a = screen.getByTestId("anyyyyy");

    await user.click(a);
    // screen.debug();

    const reviewBtn = screen.getByRole("link", {
      name: /write a review/i,
    });

    const userCollectionBtn = screen.getByRole("button", {
      name: /collection 1/i,
    });
    // const userCollections = screen.getAllByRole("link");
    // expect(userCollections.length).toBe(2);
    expect(reviewBtn).toBeInTheDocument();
    expect(reviewBtn).toHaveAttribute("href", "/movie/519182?showModal=true");
  });
});
