import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import { mockMovie } from "./index.test";
import Cast from "../[movieId]/cast";

test("testing cast page renders correctly", () => {
  const { container } = render(<Cast movie={mockMovie} />);
  //   logRoles(container);

  const pageTitle = screen.getByRole("heading", { name: /cast/i });
  expect(pageTitle).toBeInTheDocument();

  const actorsImgs = screen.getAllByRole("img", {
    name: /actorimg/i,
  });
  expect(actorsImgs).toHaveLength(3);
});
