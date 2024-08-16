import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import ManageCollection from "../ManageCollection";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

describe("Testing Manage Collection modale ", () => {
  const mockCloseHandler = vi.fn();
  const oldCollectionData = {
    title: "Update a collection",
    onClose: mockCloseHandler,
    oldValue: {
      _id: "id1",
      name: "old coll",
      description: "this is oldd",
    },
  };
  //-----------------------------------------
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  //-----------------------------------------
  test("Testing Manage Collection renders correctly, (Creating a new collection) ", () => {
    render(
      <ManageCollection title="new collection" onClose={mockCloseHandler} />
    );
    // Checking module title
    const moduleTitle = screen.getByText("new collection");
    expect(moduleTitle).toBeInTheDocument();

    //  Checking the data fields
    const titleTextbox = screen.getByRole("textbox", { name: /title/i });
    const descTextBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(titleTextbox).toBeInTheDocument();
    expect(descTextBox).toBeInTheDocument();
    expect(titleTextbox).toHaveValue("");
    expect(descTextBox).toHaveValue("");

    // Checking the submit button
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    expect(submitBttn).toBeInTheDocument();
  });
  test("should render manage Collection modale with Collection data passed as a props (Updating a Collection)", () => {
    render(<ManageCollection {...oldCollectionData} />);

    //  Checking the value of data fields
    const titleTextbox = screen.getByRole("textbox", { name: /title/i });
    const descTextBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(titleTextbox).toHaveValue("old coll");
    expect(descTextBox).toHaveValue("this is oldd");
  });

  test("testing the close functionality", async () => {
    const user = userEvent.setup();
    render(<ManageCollection {...oldCollectionData} />);

    // Checking close button
    const closeBttn = screen.getByRole("button", {
      name: /×/i,
    });
    expect(closeBttn).toBeInTheDocument();
    await user.click(closeBttn);
    expect(mockCloseHandler).toHaveBeenCalled();
  });
  test("testing the validation of manage collection modale", async () => {
    const user = userEvent.setup();
    render(
      <ManageCollection title="new collection" onClose={mockCloseHandler} />
    );

    // typing Invalid data, length is less than 4
    const titleTextbox = screen.getByRole("textbox", { name: /title/i });
    const descTextBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.type(titleTextbox, "aaa");
    await user.type(descTextBox, "123");

    // Submitting data
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Error messages appear
    const titleError = screen.getByText(/title is invalid/i);
    const descError = screen.getByText(/description is invalid/i);
    expect(titleError).toBeInTheDocument();
    expect(descError).toBeInTheDocument();

    // Typing valid data
    await user.type(titleTextbox, "test collection");
    await user.type(descTextBox, "new collection");

    // Error message should dissapear
    expect(titleError).not.toBeInTheDocument();
    expect(descError).not.toBeInTheDocument();

    // Submitting data
    await user.click(submitBttn);
    expect(mockCloseHandler).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/profile/collections");
  });
  test("updating an already created collection", async () => {
    const user = userEvent.setup();
    render(<ManageCollection {...oldCollectionData} />);

    // typing new data
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

    expect(mockCloseHandler).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/profile/collectionMovies/id1");
  });
});
