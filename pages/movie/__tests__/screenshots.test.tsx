import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Screenshots from "../[movieId]/screenshots";
import { mockMovie } from "./index.test";

test("testing screenshots page renders correctly", () => {
  const { container } = render(<Screenshots movie={mockMovie} />);
  //   logRoles(container);

  const pageTitle = screen.getByRole("heading", { name: /screenshots/i });
  expect(pageTitle).toBeInTheDocument();

  const movieImgs = screen.getAllByRole("img", {
    name: /movieImg/i,
  });
  expect(movieImgs).toHaveLength(3);
});
