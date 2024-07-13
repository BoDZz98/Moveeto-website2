import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Login from "../login";
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

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    expect(emailField).toHaveTextContent("");
    expect(passwordField).toHaveTextContent("");

    // Expect nothing to happen if login was clicked with no data typed
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.click(loginBttn);
    expect(loginElement).toBeInTheDocument();
  });

  test("testing the validation of the login page ", async () => {
    const user = userEvent.setup();
    render(<Login backgroundImg="rrwt0u1rW685u9bJ9ougg5HJEHC.jpg" />);

    const validClass =
      "rounded bg-black border-black py-5 text-lg focus:ring-0 focus:border-none false";
    const inValidClass =
      "rounded bg-black border-black py-5 text-lg focus:ring-0 focus:border-none border-red-600 border-2";

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });

    // type invalid data
    await user.type(emailField, "no at symbol"); // doesn't include @
    await user.type(passwordField, "any"); // length is less than 4
    expect(emailField).toHaveValue("no at symbol");
    expect(passwordField).toHaveValue("any");

    // Invalid class appear
    await user.click(loginBttn);
    expect(emailField).toHaveClass(inValidClass);
    expect(passwordField).toHaveClass(inValidClass);

    // when typing new data, valid class appear
    await user.type(emailField, "no at symbol 2");
    await user.type(passwordField, "anyyy");
    expect(emailField).toHaveClass(validClass);
    expect(passwordField).toHaveClass(validClass);
  });

  ///////////////////////////////

  // vi.mock("next/router", () => {
  //   const actual = vi.importActual("next/router");
  //   return {
  //     ...actual,
  //     useRouter: vi.fn(() => ({
  //       push: vi.fn(),
  //       // query: { time: "This Weak" },
  //     })),
  //   };
  // });

  test("testing a successful login for the user", async () => {
    const user = userEvent.setup();
    render(<Login backgroundImg="" />);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.type(emailField, "boudy1q@gmail.com");
    await user.type(passwordField, "boudy1q1q");
    await user.click(loginBttn);

    // const loading = screen.getByRole("button", { name: /logging in/i });
    // expect(loading).toBeInTheDocument();

    // const spy = vi.spyOn(push, "");'

    const pushMock = vi.fn(); // Mock the push function
    expect(pushMock).toHaveBeenCalledOnce();

    // Mock the useRouter hook with the desired behavior
    (useRouter as jest.Mock).mockReturnValue({
      push: vi.fn(),
    });
    expect(useRouter).toHaveBeenCalled();

    expect(useRouter().push).toHaveBeenCalledOnce();
    expect(useRouter().push).toHaveBeenNthCalledWith(11, "/");

    // expect(pushMock).toHaveBeenCalledWith("/");

    // const homePageTitle =await screen.findByRole("heading", {
    //   name: /new and trending/i,
    // });
    // expect(homePageTitle).toBeInTheDocument();
  });
});

// server.resetHandlers(
//   http.get("http://localhost:3030/scoops"),
//   () => {
//     return new HttpResponse(null, { status: 500 });
//   },
//   http.get("http://localhost:3030/toppings"),
//   () => {
//     return new HttpResponse(null, { status: 500 });
//   }
// );

// const a = await screen.findByText(/invalid credentials/i);
// expect(a).toBeInTheDocument();
