import {
  logRoles,
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MovieGridItemDropdown from "../MGIDropdown";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";
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
      userCollections: [],
      update: vi.fn(),
    };
    // Mock the return value of useMySession
    vi.spyOn(sessionHook, "default").mockReturnValue(mockUseMySession);
  });

  test("Initially the dropdown items is not visisble as the dropdown button isn't clicked", () => {
    const { container } = render(<MovieGridItemDropdown movie={movie} />);
    const reviewBtn = screen.queryByRole("link", {
      name: /write a review/i,
    });

    expect(reviewBtn).not.toBeInTheDocument();
  });

  test("dropdown items render correctly after clicking the dropdown button", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "collection 2", movies: [] },
    ];
    const user = userEvent.setup();
    const { container } = render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn = screen.getByTestId("dropdown");
    await user.click(dropdownBtn);

    const reviewBtn = screen.getByRole("link", {
      name: /write a review/i,
    });
    const userCollectionBtn = screen.getByRole("button", {
      name: /collection 1/i,
    });
    const userCollections = screen.getAllByRole("button");

    expect(reviewBtn).toBeInTheDocument();
    expect(reviewBtn).toHaveAttribute("href", "/movie/519182?showModal=true");
    expect(userCollectionBtn).toBeInTheDocument();
    expect(userCollections).toHaveLength(2);
  });

  test("The check icon should appear if the movie is in a user certain list", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [{ id: "519182" }] },
      { name: "coll 2", movies: [] },
    ];
    const user = userEvent.setup();
    const { container } = render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn = screen.getByTestId("dropdown");
    await user.click(dropdownBtn);

    const button1 = screen.getByRole("button", {
      name: /collection 1/i,
    });
    const button2 = screen.getByRole("button", {
      name: /coll 2/i,
    });

    within(button1).getByTestId("check icon");
    const icon = within(button2).queryByTestId("check icon");
    expect(icon).toBeNull();
  });

  test("Add movie to a certain list", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "coll 2", movies: [] },
    ];
    const user = userEvent.setup();
    render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn = screen.getByTestId("dropdown");
    await user.click(dropdownBtn);

    const button = screen.getByRole("button", {
      name: /collection 1/i,
    });
    await user.click(button);
    mockUseMySession.userCollections[0].movies = [{ id: "519182" }];

    const { container } = render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn2 = within(container).getByTestId("dropdown");
    await user.click(dropdownBtn2);

    const button2 = within(container).getByRole("button", {
      name: /collection 1/i,
    });

    within(button2).getByTestId("check icon");
  });

  test("remove movie from a certain list", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "coll 2", movies: [{ id: "519182" }] },
    ];
    const user = userEvent.setup();
    render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn = screen.getByTestId("dropdown");
    await user.click(dropdownBtn);

    const button = screen.getByRole("button", {
      name: /coll 2/i,
    });
    await user.click(button);
    mockUseMySession.userCollections[1].movies = [];

    const { container } = render(<MovieGridItemDropdown movie={movie} />);

    const dropdownBtn2 = within(container).getByTestId("dropdown");
    await user.click(dropdownBtn2);

    const button2 = within(container).getByRole("button", {
      name: /coll 2/i,
    });

    const icon = within(button2).queryByTestId("check icon");
    expect(icon).toBeNull();
  });
});
