import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";
import userEvent from "@testing-library/user-event";

describe("testing the search bar", () => {
  test("search bar renders correctly", () => {
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox");

    expect(searchBox).toHaveAttribute("placeholder", "Search Movies");
    expect(searchBox).toHaveClass(
      "hover:placeholder-black hover:bg-white transition-all ease-in-out duration-300"
    );
  });

  test("testing the seach functionality", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox");

    await user.type(searchBox, "despic");
    expect(searchBox).toHaveFocus();
  });
});
