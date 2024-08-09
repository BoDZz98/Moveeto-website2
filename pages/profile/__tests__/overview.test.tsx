import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import Overview from "../overview";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useRouter } from "next/router";
import {
  mockCollections,
  mockFavMovies,
  mockReviews,
  mockWishlistMovies,
} from "./mockData";

const customRender = () =>
  render(
    <Overview
      favMovies={mockFavMovies}
      wishlistMovies={mockWishlistMovies}
      reviews={mockReviews}
      collections={mockCollections}
    />
  );

const overViewComp = (
  <Overview
    favMovies={mockFavMovies}
    wishlistMovies={mockWishlistMovies}
    reviews={mockReviews}
    collections={mockCollections}
  />
);

describe("Testing overview page", () => {
  const pushMock = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
  test("Testing overview page renders correctly ", () => {
    customRender();

    // Checking carousel
    const carousel = screen.getByTestId("carousal div");
    expect(carousel).toBeInTheDocument();

    // Checking movies/reviews statistics
    const ratingBars = screen.getAllByTestId("rating bar div");
    expect(ratingBars).toHaveLength(7);

    // Checking collections statistics
    const collectionsDiv = screen.getAllByTestId("collection div");
    expect(collectionsDiv).toHaveLength(2);

    // Checking recently added movies
    const uniqueMovies = screen.getAllByTestId("recent movies div");
    expect(uniqueMovies).toHaveLength(4);

    // Checking recently added reviews
    const recentReviews = screen.getAllByTestId(/profile review/);
    expect(recentReviews).toHaveLength(2);
  });

  test("Testing the behavior of the page", async () => {
    const user = userEvent.setup();
    const { rerender } = customRender();

    // getting a civil war movie from the carousel
    // In the carousel for some reason we only got the first movie in the mockFavMovies array
    const carousel = screen.getByTestId("carousal div");
    const favMovie = within(carousel).getAllByTestId(/Civil War/i)[0];
    // Getting the buttons
    const favBttn = within(favMovie).getByTestId("favCont");
    const wishlistBttn = within(favMovie).getByTestId("wishlistCont");

    // Getting fav/wishlist rating bars
    const favRatingBar = screen.getAllByTestId("rating bar div")[0];
    const wishlistRatingBar = screen.getAllByTestId("rating bar div")[1];
    within(favRatingBar).getByText("3");
    within(wishlistRatingBar).getByText("2");

    // Adding civil war movie to wishlist
    await user.click(wishlistBttn);
    expect(pushMock).toHaveBeenCalledWith("/profile/overview");

    // Removing civil war movie from the fav
    await user.click(favBttn);
    expect(pushMock).toHaveBeenCalledWith("/profile/overview");

    // Updating the data and re-rendering the component
    mockFavMovies.splice(0, 1); // remove first element from array
    mockWishlistMovies.push(mockFavMovies[0]);
    rerender(overViewComp);

    // Checking wishlist RatingBar
    const wishlistRatingBar2 = await screen.getAllByTestId("rating bar div")[1];
    within(wishlistRatingBar2).getByText("3");

    // Checking the updated carousel, making sure civil war is removed
    const carousel2 = screen.getByTestId("carousal div");
    const favMovie2 = within(carousel2).queryAllByTestId(/Civil War/i)[0];
    expect(favMovie2).toBeUndefined();
  });
});
