import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Siginup from "../signup";
import userEvent from "@testing-library/user-event";
import { server } from "@/mocks/server";
import { useRouter } from "next/router";
import { vi } from "vitest";
import { http, HttpResponse } from "msw";

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

  test("testing a successful signup for the user", async () => {
    server.use(
      http.post("/api/auth/signin", () => {
        return HttpResponse.json({}, { status: 201 });
      })
    );
    // Mock the useRouter hook with the desired behavior
    const pushMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const user = userEvent.setup();
    const { container } = render(<Siginup backgroundImg="" />);

    // Typing the data
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const userNameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);
    const signupBttn = screen.getByRole("button", { name: /signup/i });
    await user.type(emailField, "any@gmail.com");
    await user.type(userNameField, "anyany");
    await user.type(passwordField, "any22222222");
    await user.click(signupBttn);

    // Loading appear for a second
    const loading = screen.getByRole("button", { name: /signing up/i });
    expect(loading).toBeInTheDocument();

    // Expect the user to be redirected to the login page
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  test("testing a failed signup for the user, due to using an exisiting email", async () => {
    server.use(
      http.post("/api/auth/signin", () => {
        return HttpResponse.json(
          { message: "Email already exists" },
          { status: 500 }
        );
      })
    );

    const user = userEvent.setup();
    const { container } = render(<Siginup backgroundImg="" />);

    // Typing the data
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const userNameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);
    const signupBttn = screen.getByRole("button", { name: /signup/i });
    await user.type(emailField, "existingEmail@gmail.com");
    await user.type(userNameField, "anyany");
    await user.type(passwordField, "any22222222");
    await user.click(signupBttn);

    // Checking for error message
    const errorMessage = screen.getByText(/email already exists/i);
    expect(errorMessage).toBeInTheDocument();

    // Loading state is finished
    expect(signupBttn).toHaveTextContent(/signup/i);
  });
});
