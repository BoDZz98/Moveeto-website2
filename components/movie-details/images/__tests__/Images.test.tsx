import {
  act,
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import Images from "../Images";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";

describe("testing images component", () => {
  const movieData = {
    youtubeTrailerKey: "LtNYaH61dXY",
    id: 519182,
    cast,
    images,
  };
  // @ts-ignore
  const customRender = (ui) => {
    return render(
      <MovieDetailsCtx.Provider
        // @ts-ignore
        value={{ movieData }}
      >
        {ui}
      </MovieDetailsCtx.Provider>
    );
  };
  //--------------------------------------------------------------------------------------------------------------------------

  test("testing images components render correctly", async () => {
    // act(() => {});
    customRender(<Images />);

    // Check for the video player
    const videoPlayer = screen.getByTestId("video player");
    expect(videoPlayer).toBeInTheDocument();

    // checking movie imgs
    const movieImgs = screen.getAllByRole("img", {
      name: /movieImg/i,
    });
    expect(movieImgs).toHaveLength(3);

    // checking actors imgs
    const actorsImgs = screen.getAllByRole("img", {
      name: /actorImg/i,
    });
    expect(actorsImgs).toHaveLength(3);
  });
});

const images = [
  { file_path: "/5g2n3ilC8DpYv4diJeuQ1vKG2Kb.jpg" },
  { file_path: "/eTDmN6mx0YIhCtthcCmttPgSoFA.jpg" },
  { file_path: "/fDmuPREB3yTrelyYugguEine5Y1.jpg" },
];

const cast = [
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
