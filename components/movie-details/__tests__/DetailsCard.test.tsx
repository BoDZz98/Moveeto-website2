import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import DetailsCard from "../DetailsCard";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { vi } from "vitest";

describe("testing Details Card component", () => {
  const renderMyComp = () =>
    render(
      <DetailsCard
        title="Despicable Me 4"
        movieId={519182}
        backdrop_path="any_picture_path"
        titlePage="Screenshots"
      >
        <h1>children</h1>
      </DetailsCard>
    );
  test("render Details Card correctly", () => {
    renderMyComp();

    // checking breadcrumb
    const list = screen.getByRole("list");
    within(list).getByText(/screenshots/i);

    // checking arrow icon
    const arrowIcon = screen.getByTestId("arrow icon");
    expect(arrowIcon).toBeInTheDocument();

    // Checking data
    const movieTitle = screen.getByRole("heading", {
      name: /despicable me 4/i,
    });
    const pageTitle = screen.getByRole("heading", {
      name: /screenshots/i,
    });
    expect(movieTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    // checking all links
    const linksDiv = screen.getByTestId("links div");
    const links = within(linksDiv).getAllByRole("link");
    expect(links).toHaveLength(5);

    // checking links style
    const inActiveLink = screen.getByRole("link", {
      name: /about/i,
    });
    const activeLink = screen.getByRole("link", { name: /screenshots/i });
    expect(inActiveLink).not.toHaveClass(activeLinkStyle);
    expect(activeLink).toHaveClass(activeLinkStyle);

    // Checking children
    const childrenText = screen.getByRole("heading", {
      name: /children/i,
    });
    expect(childrenText).toBeInTheDocument();
  });

  test("Testing arrow icon (previous page) functionality", async () => {
    const user = userEvent.setup();
    const pushMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    renderMyComp();

    const arrowIcon = screen.getByTestId("arrow icon");
    await user.click(arrowIcon);
    expect(pushMock).toHaveBeenCalledWith("/movie/519182");
  });

  test("Testing links navigation", async () => {
    const user = userEvent.setup();
    renderMyComp();

    const view = screen.getByTestId("links div");

    const aboutLink = screen.getByRole("link", {
      name: /about/i,
    });
    const screenshotsLink = screen.getByRole("link", {
      name: /screenshots/i,
    });
    const castLink = screen.getByRole("link", {
      name: /cast/i,
    });
    const similarMoviesLink = screen.getByRole("link", {
      name: /similar Movies/i,
    });
    const reviewsLink = within(view).getByRole("link", {
      name: /reviews/i,
    });
    expect(aboutLink).toHaveAttribute("href", "/movie/519182");
    expect(screenshotsLink).toHaveAttribute(
      "href",
      "/movie/519182/screenshots"
    );
    expect(castLink).toHaveAttribute("href", "/movie/519182/cast");
    expect(similarMoviesLink).toHaveAttribute(
      "href",
      "/movie/519182/similarMovies"
    );
    expect(reviewsLink).toHaveAttribute("href", "/movie/519182/reviews");

    // expect the link to have the right style after clicking on it
    await userEvent.click(castLink);
    expect(castLink).toHaveClass(activeLinkStyle);

    // expect the page title to be changed to cast
    const newPageTitle=screen.getByRole('heading', {
      name: /cast/i
    })
  });
});

const activeLinkStyle = "text-xl w-fit text-white font-bold cursor-default";
