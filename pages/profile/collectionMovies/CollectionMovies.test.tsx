import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import CollectionMovies from "./[collectionId]";
import { mockCollections } from "../__tests__/mockData";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { vi } from "vitest";

describe("Testing colection movies page", () => {
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  test("Testing colection movies page renders correctly ", () => {
    render(<CollectionMovies userCollection={mockCollections[0]} />);

    // Checking collection data
    const collectionTitle = screen.getByRole("heading", { name: /coll 1/i });
    const createdAt = screen.getByText("14-5-2024");
    const description = screen.getByText("first coll");
    expect(collectionTitle).toBeInTheDocument();
    expect(createdAt).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Checking edit and delete buttons
    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Checking collection movies
    const movies = screen.getAllByTestId(/movieGridItem/i);
    expect(movies).toHaveLength(3);
  });
  test("Testing the edit button ", async () => {
    const user = userEvent.setup();
    render(<CollectionMovies userCollection={mockCollections[0]} />);

    // Finding and clicking the button
    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    // Expect the modal to be opened and typing new data
    const titleTextbox = screen.getByRole("textbox", { name: /title/i });
    const descTextBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.type(titleTextbox, "upadted title");
    await user.type(descTextBox, "updated desc");

    // Submitting data
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Expect modale to be closed, and refresh the page
    const modaleTitle = screen.queryByText(/edit collection/i);
    expect(modaleTitle).not.toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/profile/collectionMovies/id1");
  });
  test("Testing the delete button ", async () => {
    const user = userEvent.setup();
    render(<CollectionMovies userCollection={mockCollections[0]} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(pushMock).toHaveBeenCalledWith("/profile/collections");
  });

  test("Testing the page with no movies in the collection", () => {
    mockCollections[0].movies = [];
    render(<CollectionMovies userCollection={mockCollections[0]} />);

    const message = screen.getByText(/No Movies In This Collection/i);
    expect(message).toBeInTheDocument();

    // Checking collection movies
    const movies = screen.queryAllByTestId(/movieGridItem/i);
    expect(movies).toHaveLength(0);
  });
});
