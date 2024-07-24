import { describe, expect, test, vi } from "vitest";
import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Login from "../login";
import * as nextAuthReact from "next-auth/react";
import { useRouter } from "next/router";

describe("Testing the login page", () => {
  test("renders the login page correctly", async () => {
    const user = userEvent.setup();
    render(<Login backgroundImg="rrwt0u1rW685u9bJ9ougg5HJEHC.jpg" />);

    const loginElement = screen.getByRole("heading", {
      name: /login/i,
    });
    expect(loginElement).toBeInTheDocument();

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
    const passwordField = screen.getByLabelText(/password/i);
    expect(emailField).toHaveTextContent("");
    expect(passwordField).toHaveTextContent("");

    // Expect nothing to happen if login was clicked with no data typed
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.click(loginBttn);
    expect(loginBttn).toHaveTextContent(/log in/i);
  });

  test("testing a successful login for the user", async () => {
    // Mock the useRouter hook with the desired behavior
    const pushMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    vi.spyOn(nextAuthReact, "signIn").mockImplementation(() =>
      Promise.resolve({ error: null, status: 200, ok: true, url: "" })
    );
    const user = userEvent.setup();
    const { container } = render(<Login backgroundImg="" />);

    // Typing the data
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.type(emailField, "any@gmail.com");
    await user.type(passwordField, "anyany");
    await user.click(loginBttn);

    // Loading appear for a second
    const loading = screen.getByRole("button", { name: /logging in/i });
    expect(loading).toBeInTheDocument();

    // Expect the user to be redirected to the home page
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("testing a falied login for the user,due to Invalid credintials", async () => {
    vi.spyOn(nextAuthReact, "signIn").mockImplementation(() =>
      Promise.resolve({
        error: "Invalid Credentials",
        status: 401,
        ok: false,
        url: "",
      })
    );

    const user = userEvent.setup();
    const { container } = render(<Login backgroundImg="" />);

    // Typing the data
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.type(emailField, "any@gmail.com");
    await user.type(passwordField, "anyany");
    await user.click(loginBttn);

    // Checking for error message
    const error = screen.getByText(/invalid credentials/i);
    expect(error).toBeInTheDocument();

    // Loading state is finished
    expect(loginBttn).toHaveTextContent(/Log in/i);
  });
});
