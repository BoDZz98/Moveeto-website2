import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("testing Login/signup form", () => {
  test("Login form renders correctly", async () => {
    const submitMock = vi.fn();
    render(
      <LoginForm
        buttonTitle="Log in"
        errorMessage=""
        signingUp={false}
        submitHandler={submitMock}
      />
    );
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    const userNameField = screen.queryByRole("textbox", { name: "Username" });

    expect(loginBttn).toBeInTheDocument();
    expect(userNameField).not.toBeInTheDocument();
  });

  test("signup form renders correctly", async () => {
    const submitMock = vi.fn();
    render(
      <LoginForm
        buttonTitle="signup"
        errorMessage=""
        signingUp={true}
        submitHandler={submitMock}
      />
    );
    const signupBttn = screen.getByRole("button", { name: /signup/i });
    const userNameField = screen.queryByRole("textbox", { name: "Username" });

    expect(signupBttn).toBeInTheDocument();
    expect(userNameField).toBeInTheDocument();
  });

  test("checking the appearence of the error message correctly", () => {
    const user = userEvent.setup();
    const submitMock = vi.fn();

    render(
      <LoginForm
        buttonTitle="Log in"
        errorMessage="Invalid Credentials"
        signingUp={false}
        submitHandler={submitMock}
      />
    );
    const errorMssg = screen.getByText(/invalid credentials/i);
    expect(errorMssg).toBeInTheDocument();
  });

  test("testing the validation of the login/signup page ", async () => {
    const user = userEvent.setup();
    const submitMock = vi.fn();

    render(
      <LoginForm
        buttonTitle="signup"
        errorMessage=""
        signingUp={true}
        submitHandler={submitMock}
      />
    );

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const userNameField = screen.getByRole("textbox", { name: "Username" });
    const signupBttn = screen.getByRole("button", { name: /signup/i });

    // type invalid data
    await user.type(emailField, "no at symbol"); // doesn't include @
    await user.type(userNameField, "any"); // length is less than 4
    await user.type(passwordField, "123"); // length is less than 4
    expect(emailField).toHaveValue("no at symbol");
    expect(userNameField).toHaveValue("any");
    expect(passwordField).toHaveValue("123");

    // Invalid class appear
    await user.click(signupBttn);
    expect(emailField).toHaveClass("border-red-600 border-2");
    expect(userNameField).toHaveClass("border-red-600 border-2");
    expect(passwordField).toHaveClass("border-red-600 border-2");

    // signup button won't be clicked
    await user.click(signupBttn);
    expect(submitMock).toHaveBeenCalledTimes(0);

    // when typing new data, valid class appear
    await user.type(emailField, "any@gmail.com");
    await user.type(userNameField, "anyyy");
    await user.type(passwordField, "1234");
    expect(emailField).not.toHaveClass("border-red-600 border-2");
    expect(userNameField).not.toHaveClass("border-red-600 border-2");
    expect(passwordField).not.toHaveClass("border-red-600 border-2");

    // signup button will be clicked
    await user.click(signupBttn);
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
});
