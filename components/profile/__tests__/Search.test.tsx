import { render, screen } from "@testing-library/react";
import SearchComponent from "../Search";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockFn = vi.fn();
test("test Search Component renders correctly", async () => {
  const user = userEvent.setup();
  render(
    <SearchComponent
      placeholder="Search my favorite"
      changeInputHandler={mockFn}
    />
  );

  const searchBar = screen.getByRole("searchbox");
  const placeholder = screen.getByPlaceholderText("Search my favorite");
  expect(placeholder).toBeInTheDocument()
  expect(searchBar).toHaveValue("");

  // Typing data
  await user.type(searchBar, "any");
  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(searchBar).toHaveValue("any");
});
