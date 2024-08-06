import {
  render,
  screen,
  within,
} from "@/utils/testing-utils/testing-library-utils";
import MyBreadcrumb from "../MyBreadcrumb";

describe("testing MyBreadcrumb component", () => {
  test("renders the MyBreadcumb component correctly", () => {
    render(<MyBreadcrumb title="despicable me 4" subTitle="Screenshots" />);

    const list = screen.getByRole("list");

    // Check movie name / title
    within(list).getByText(/despicable me 4/i);

    // Check subtitle
    within(list).getByText(/screenshots/i);

    // check home element
    const homeElement = within(list).getByRole("link", {
      name: /home/i,
    });
    expect(homeElement).toHaveAttribute("href", "/");
  });
});
