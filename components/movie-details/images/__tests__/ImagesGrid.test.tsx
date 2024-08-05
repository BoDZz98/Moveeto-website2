import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import ImagesGrid from "../ImagesGrid";
import { useRouter } from "next/router";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const movieImgs = [
  { file_path: "/5g2n3ilC8DpYv4diJeuQ1vKG2Kb.jpg" },
  { file_path: "/eTDmN6mx0YIhCtthcCmttPgSoFA.jpg" },
  { file_path: "/fDmuPREB3yTrelyYugguEine5Y1.jpg" },
];

const actors = [
  {
    character: "Felonious Gru / Chet (voice)",
    name: "Steve Carell",
    profile_path: "/any_profile_path",
  },
  {
    character: "Felonious Gru / Chet (voice)",
    name: "Steve Carell2",
    profile_path: "/any_profile_path",
  },
  {
    character: "Felonious Gru / Chet (voice)",
    name: "Steve Carell3",
    profile_path: "/any_profile_path",
  },
];

describe("testing images grid component", () => {
  const pushMock = vi.fn();
  // Mock the useRouter hook with the desired behavior
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  //---------------------------------------------------------------------

  test("testing images grid render correctly with movie imgs passed as props", async () => {
    const user = userEvent.setup();
    render(<ImagesGrid movieId={519182} movieImgs={movieImgs} />);

    // check all imgs is rendered
    const allMovieImgs = screen.getAllByRole("img");
    expect(allMovieImgs).toHaveLength(3);

    // Check the link redirect to the right page
    const viewAllDiv = screen.getByTestId("view all div");
    await user.click(viewAllDiv);
    expect(pushMock).toHaveBeenCalledWith("/movie/519182/screenshots");
  });

  test("testing images grid render correctly with cast passed as props", async () => {
    const user = userEvent.setup();
    render(<ImagesGrid movieId={519182} cast={actors} />);

    // check all imgs is rendered
    const allActorsImgs = screen.getAllByRole("img");
    expect(allActorsImgs).toHaveLength(3);

    // Check the link redirect to the right page
    const viewAllDiv = screen.getByTestId("view all div");
    await user.click(viewAllDiv);
    expect(pushMock).toHaveBeenCalledWith("/movie/519182/cast");
  });
});

