import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import EmptyPage from "../EmptyPage";
import userEvent from "@testing-library/user-event";

describe("Testing Empty page component", () => {
  test("Testing empty page render correctly", () => {
    render(<EmptyPage pageTitle="No reviews yet" contStyle="mt-20" />);

    const emptyPageDiv = screen.getByTestId("empty page div");
    const emoji = screen.getByRole("img", { name: /sleeping/i });
    const title = screen.getByText(/no reviews yet/i);

    expect(emptyPageDiv).toHaveClass("mt-20");
    expect(emoji).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    const bttn = screen.queryByRole("button", {
      name: /Start a new collection/i,
    });
    expect(bttn).not.toBeInTheDocument();
  });

  test("Testing empty page render correctly with collectionPage as a prop", async () => {
    const user = userEvent.setup();
    render(<EmptyPage pageTitle="" collectionPage />);

    const bttn = screen.getByRole("button", {
      name: /Start a new collection/i,
    });
    await user.click(bttn);

    // Expect the modal to be opened
    const titlleTextbox = screen.getByRole("textbox", { name: /title/i });
    expect(titlleTextbox).toHaveValue("");
  });
});
