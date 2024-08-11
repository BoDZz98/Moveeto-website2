import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Collections from "../collections";
import { mockCollectionMovies, mockCollections } from "./mockData";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useRouter } from "next/router";

describe("Testing profile collections page", () => {
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  test("Testing profile collections page renders correctly", () => {
    render(<Collections collections={mockCollections} />);

    // Checking new collection bttn
    const newCollectionBttn = screen.getByText(/\+ start a new collection/i);
    expect(newCollectionBttn).toBeInTheDocument();

    // Checking user Collections
    const userCollections = screen.getAllByTestId("collection background");
    expect(userCollections).toHaveLength(2);
  });
  test("empty page component should render if there is no collections", () => {
    render(<Collections collections={[]} />);

    // Checking Empty page
    const title = screen.getByText(/no collections yet/i);
    const button = screen.getByRole("button", {
      name: /Start a new collection/i,
    });
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // Checking new collection bttn is not rendered
    const newCollectionBttn = screen.queryByText(/\+ start a new collection/i);
    expect(newCollectionBttn).not.toBeInTheDocument();

    // Checking user Collections is not rendered
    const userCollections = screen.queryAllByTestId("collection background");
    expect(userCollections).toHaveLength(0);
  });
  test("Testing adding a new collection functionality", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Collections collections={mockCollections} />);

    // clicking on new collection bttn
    const newCollectionBttn = screen.getByText(/\+ start a new collection/i);
    await user.click(newCollectionBttn);

    // Expect the modal to be opened and type in the data fields
    const modalTitle = screen.getByText("Start a new collection");
    const titleTextbox = screen.getByRole("textbox", { name: /title/i });
    const descTextBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.type(titleTextbox, "new collection");
    await user.type(descTextBox, "this is a new collection");

    // Submitting data
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Expect the modal to be closed
    expect(modalTitle).not.toBeInTheDocument();

    // Expect the page to be refreshed
    expect(pushMock).toHaveBeenCalledWith("/profile/collections");

    // Modify data and re-render the page
    const newCollections = [...mockCollections, newCollection];
    rerender(<Collections collections={newCollections} />);

    // making sure the new collection is added
    const userCollections = screen.getAllByTestId("collection background");
    expect(userCollections).toHaveLength(3);
  });
});

const newCollection = {
  _id: "id3",
  name: "new collection",
  description: "this is a new collection",
  movies: [],
  createdAt: "1-8-2024",
};
