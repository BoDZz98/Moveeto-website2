import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import ProfileLayout from "../ProfileLayout";
import { vi } from "vitest";
import * as nextAuth from "next-auth/react";
import userEvent from "@testing-library/user-event";

describe("testing profile layout", () => {
  const mockUseSession = {
    data: {
      user: {
        name: "bodzz",
      },
    },
  };
  //   @ts-ignore
  vi.spyOn(nextAuth, "useSession").mockReturnValue(mockUseSession);

  test("testing profile layout render correctly", () => {
    render(
      <ProfileLayout pageTitle="Overview">
        <h1>Children</h1>
      </ProfileLayout>
    );
    // cheking username and settings button
    const userName = screen.getByText(/bodzz/i);
    const settingsBttn = screen.getByRole("button", { name: /settings/i });
    expect(userName).toBeInTheDocument();
    expect(settingsBttn).toBeInTheDocument();

    // checking all links
    const linksDiv = screen.getByTestId("links div");
    const links = within(linksDiv).getAllByRole("link");
    expect(links).toHaveLength(5);

    // checking links style
    const inActiveLink = screen.getByRole("link", {
      name: /favorite/i,
    });
    const activeLink = screen.getByRole("link", { name: /overview/i });
    expect(inActiveLink).not.toHaveClass(activeLinkStyle);
    expect(activeLink).toHaveClass(activeLinkStyle);

    // Checking children
    const childrenText = screen.getByRole("heading", {
      name: /children/i,
    });
    expect(childrenText).toBeInTheDocument();
  });

  test("Testing links navigation", async () => {
    const user = userEvent.setup();

    render(
      <ProfileLayout pageTitle="Overview">
        <h1>Children</h1>
      </ProfileLayout>
    );

    const overviewLink = screen.getByRole("link", {
      name: /overview/i,
    });
    const favoriteLink = screen.getByRole("link", {
      name: /favorite/i,
    });
    const wishlistLink = screen.getByRole("link", {
      name: /wishlist/i,
    });
    const reviewsLink = screen.getByRole("link", {
      name: /reviews/i,
    });
    const collectionsLink = screen.getByRole("link", {
      name: /collections/i,
    });

    expect(overviewLink).toHaveAttribute("href", "/profile/overview");
    expect(favoriteLink).toHaveAttribute("href", "/profile/favorite");
    expect(wishlistLink).toHaveAttribute("href", "/profile/wishlist");
    expect(reviewsLink).toHaveAttribute("href", "/profile/reviews");
    expect(collectionsLink).toHaveAttribute("href", "/profile/collections");

    expect(overviewLink).toHaveClass(activeLinkStyle);

    // expect the link to have the right style after clicking on it
    await userEvent.click(favoriteLink);
    expect(favoriteLink).toHaveClass(activeLinkStyle);
    expect(overviewLink).not.toHaveClass(activeLinkStyle);
  });
});

const activeLinkStyle =
  "text-gray-300 text-3xl font-semibold underline-offset-8 underline";
