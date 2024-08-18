import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import Rating from "../Rating";
import { useRouter } from "next/router";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import * as session from "next-auth/react";

const activeImgStyle = "w-20 h-20 opacity-100 -translate-y-2 scale-125 ";

describe("Testing rating component", () => {
  let mockUseMySession: any;
  beforeEach(() => {
    // Initialize the mock data
    mockUseMySession = {
      status: "authenticated",
    };
    // Mock the return value of useMySession
    vi.spyOn(session, "useSession").mockReturnValue(mockUseMySession);
  });
  //-----------------------------------------------------------------------
  // Provider props is used if we want to pass different data to our context , in each test case
  const movieData = { vote_average: 7.2, vote_count: 485 };
  const reviewData = { mostRepeatedRating: "Recommended", reviewsLength: 2 };
  // @ts-ignore
  const customRender = (ui) => {
    return render(
      <MovieDetailsCtx.Provider
        value={{
          // @ts-ignore
          movieData,
          reviewData,
        }}
      >
        {ui}
      </MovieDetailsCtx.Provider>
    );
  };

  //---------------------------------------------------------------------------------
  test("render rating component correctly if the modal is not opened initially (query.showModal = false)", () => {
    // Mock the useRouter hook with the desired behavior
    (useRouter as jest.Mock).mockReturnValue({
      query: { showModal: false },
    });

    customRender(<Rating />);

    // Cheking the data returned from react ctx
    const mostRepeatedRating = screen.getByRole("heading", {
      name: /Recommended/i,
    });
    const reviewCounts = screen.getByText(/2 rating/i);
    const avergeRating = screen.getByText("7.2");
    const ratingCount = screen.getByText(/485 rating/i);

    expect(mostRepeatedRating).toBeInTheDocument();
    expect(reviewCounts).toBeInTheDocument();
    expect(avergeRating).toBeInTheDocument();
    expect(ratingCount).toBeInTheDocument();

    // Checking all emojis is rendered
    const emojis = screen.getAllByTestId("emoji div");
    expect(emojis).toHaveLength(5);

    // Checking if the right emoji is selected
    const emoji = screen.getByRole("img", {
      name: /recommended/i,
    });
    expect(emoji).toHaveClass(activeImgStyle);

    // Checking review button
    const reviewBttn = screen.getByRole("button", {
      name: /write a review/i,
    });
    expect(reviewBttn).toBeInTheDocument();

    // Making sure the modale is not opened
    const textBox = screen.queryByRole("textbox", {
      name: /description/i,
    });
    expect(textBox).not.toBeInTheDocument();
  });

  test("render rating component correctly if the modal is opened initially (query.showModal = true)", () => {
    // Mock the useRouter hook with the desired behavior
    (useRouter as jest.Mock).mockReturnValue({
      query: { showModal: true },
    });

    customRender(<Rating />);

    // Making sure the modal is opended
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveValue("");
  });

  test("testing the open modal functionality", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { showModal: false },
    });
    const user = userEvent.setup();

    customRender(<Rating />);

    // clicking review button
    const reviewBttn = screen.getByRole("button", {
      name: /write a review/i,
    });
    await user.click(reviewBttn);

    // Making sure the modal is opended
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveValue("");
  });
});
