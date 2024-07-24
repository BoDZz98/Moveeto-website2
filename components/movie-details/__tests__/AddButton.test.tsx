import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import AddButton from "../AddButton";
import { collectionIcon, favIcon } from "../AddToButtons";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import * as sessionHook from "@/hooks/useMySession";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";

const mockHandler = vi.fn();
const favButtonData = {
  title: "Favorites",
  subTitle: "Add to",
  icon: favIcon,
  textStyle: "text-black",
  contStyle: "bg-white hover:bg-gray-200",
  clickHandler: mockHandler,
};

const collectionButtonData = {
  title: "Collection",
  subTitle: "Save to",
  icon: collectionIcon,
  textStyle: "hover:text-gray-400",
};

describe("Testing AddButton component", () => {
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
  test("render AddButton component correctly", async () => {
    const user = userEvent.setup();
    render(<AddButton {...favButtonData} />);

    const button = screen.getByRole("button", {
      name: /add to favorites/i,
    });

    within(button).getByText(/add to/i);
    within(button).getByTestId("favIcon");

    // testing button click handler
    await user.click(button);
    expect(mockHandler).toHaveBeenCalled();
  });

  test("render AddButton component with a title = collection while user have no collections", async () => {
    const user = userEvent.setup();
    render(<AddButton {...collectionButtonData} />);

    // Click the button to open dropdown
    const button = screen.getByRole("button", {
      name: /save to collection/i,
    });
    await user.click(button);

    const notFound = screen.getByText("No collections");
    expect(notFound).toBeInTheDocument();
  });

  test("render AddButton component with a title = collection while user have created at least 1 collection", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "coll 2", movies: [] },
    ];
    const user = userEvent.setup();
    render(<AddButton {...collectionButtonData} />);

    // Click the button to open droplist
    const button = screen.getByRole("button", {
      name: /save to collection/i,
    });
    await user.click(button);

    const userColl = screen.getByRole("button", {
      name: /collection 1/i,
    });
    expect(userColl).toBeInTheDocument();
  });

  test("render AddButton component while this movie is added to user collection", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "coll 2", movies: [{ id: "519182" }] },
    ];

    const user = userEvent.setup();
    customRender(<AddButton {...collectionButtonData} />, { providerProps });

    // Click the button to open droplist
    const button = screen.getByRole("button", {
      name: /save to collection/i,
    });
    await user.click(button);

    // Checking the Icon
    const userColl1 = screen.getByRole("button", {
      name: /collection 1/i,
    });
    const userColl2 = screen.getByRole("button", {
      name: /coll 2/i,
    });
    const icon = within(userColl1).queryByTestId("check icon");
    expect(icon).toBeNull();
    within(userColl2).getByTestId("check icon");
  });

  test("render AddButton component and testing adding movie to user collection", async () => {
    mockUseMySession.userCollections = [
      { name: "collection 1", movies: [] },
      { name: "coll 2", movies: [] },
    ];
    const user = userEvent.setup();
    customRender(<AddButton {...collectionButtonData} />, { providerProps });

    // Click the button to open dropdown
    const button = screen.getByRole("button", {
      name: /save to collection/i,
    });
    await user.click(button);

    // Adding movie to user collection
    const userColl = screen.getByRole("button", {
      name: /collection 1/i,
    });
    await user.click(userColl);
    mockUseMySession.userCollections[0].movies = [{ id: "519182" }];

    // re-rendering component
    const { container } = customRender(
      <AddButton {...collectionButtonData} />,
      { providerProps }
    );

    // Click the button to open dropdown
    const button2 = within(container).getByRole("button", {
      name: /save to collection/i,
    });
    await user.click(button2);

    const userColl2 = within(container).getByRole("button", {
      name: /collection 1/i,
    });
    within(userColl2).getByTestId("check icon");
  });
});
