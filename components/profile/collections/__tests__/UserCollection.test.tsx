import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import UserCollection from "../UserCollection";
import { mockCollections } from "@/pages/profile/__tests__/mockData";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useRouter } from "next/router";

describe("Testing user collection comp", () => {
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  test("Testing user collection comp renders correctly, collection have 3 movies", async () => {
    const user = userEvent.setup();
    render(<UserCollection collection={mockCollections[0]} />);

    // Testing background image
    const backgroundDiv = screen.getByTestId("collection background");
    expect(backgroundDiv).toHaveStyle(
      "background-image: url(http://image.tmdb.org/t/p/original/kYgQzzjNis5jJalYtIHgrom0gOx.jpg)"
    );

    // Checking data
    const collectionName = screen.getByText(/coll 1/i);
    const moviesLength = screen.getByText(/movies: 3/i);
    expect(collectionName).toBeInTheDocument();
    expect(moviesLength).toBeInTheDocument();

    // Checking movies img
    const collectionMovies = screen.getAllByRole("img", {
      name: /collection movie/i,
    });
    expect(collectionMovies).toHaveLength(3);

    // Expect the middle image to have bigger size
    expect(collectionMovies[1]).toHaveClass("w-1/3");

    // testing navigation
    await user.click(backgroundDiv);
    expect(pushMock).toHaveBeenCalledWith('/profile/collectionMovies/id1')
  });
  test("Testing user collection comp renders correctly, collection have 2 movies", () => {
    const newCollectionData = {
      ...mockCollections[0],
      movies: mockCollections[0].movies.slice(0, 2),
    };
    render(<UserCollection collection={newCollectionData} />);

    // Checking movies img
    const collectionMovies = screen.getAllByRole("img", {
      name: /collection movie/i,
    });
    expect(collectionMovies).toHaveLength(2);

    // Expect the 2 images to have the same size
    expect(collectionMovies[0]).toHaveClass("w-1/4");
    expect(collectionMovies[1]).toHaveClass("w-1/4");
  });
});
