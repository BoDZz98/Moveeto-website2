import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Siginup from "../signup";
import userEvent from "@testing-library/user-event";

describe("Testing the signup page", () => {
  test("renders the login page correctly", async () => {
    const user = userEvent.setup();

    render(<Siginup backgroundImg="rrwt0u1rW685u9bJ9ougg5HJEHC.jpg" />);

    const signupElement = screen.getByRole("heading", {
      name: /signup/i,
    });
    expect(signupElement).toBeInTheDocument();

    // Make sure that background image appears
    const backgroundDiv = screen.getByTestId("backgroundDiv");
    expect(backgroundDiv).toHaveStyle(
      "background-image:url(http://image.tmdb.org/t/p/originalrrwt0u1rW685u9bJ9ougg5HJEHC.jpg)"
    );

    // Make sure that the side bar is not rendered
    const homeElement = screen.queryByRole("heading", {
      name: /home/i,
    });
    expect(homeElement).not.toBeInTheDocument();

    // Checking the initial values of data
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const userNameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);
    expect(emailField).toHaveTextContent("");
    expect(userNameField).toHaveTextContent("");
    expect(passwordField).toHaveTextContent("");

    // Expect nothing to happen if login was clicked with no data typed
    const loginBttn = screen.getByRole("button", { name: /signup/i });
    await user.click(loginBttn);
    expect(loginBttn).toHaveTextContent(/signup/i);
  });
});
