import { logRoles, render, screen } from "@testing-library/react";
import SideBar from "../SideBar";

describe("testing side bar", () => {
  test("render the side bar initially", () => {
    const { container } = render(<SideBar />);
    const linkElements = screen.getAllByRole("link");
    const homeElement = screen.getByRole("heading", {
      name: /home/i,
    });
    const newReleasesElement = screen.getByRole("heading", {
      name: /new releases/i,
    });
    const topElement = screen.getByRole("heading", {
      name: /top rated/i,
    });

    // logRoles(container);

    expect(linkElements.length).toBeGreaterThan(8);
    expect(homeElement).toBeInTheDocument();
    expect(newReleasesElement).toBeInTheDocument();
    expect(topElement).toBeInTheDocument();
  });
});
