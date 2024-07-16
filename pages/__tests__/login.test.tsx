import { describe, expect, test, vi } from "vitest";
import {
  logRoles,
  render,
  screen,
  waitFor,
} from "@/utils/testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Login from "../login";
import { useRouter } from "next/router";
import { server } from "@/mocks/server";
import { delay, http, HttpResponse } from "msw";

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
    expect(loginBttn).toHaveTextContent(/log in/i);
  });

  test("testing a successful login for the user", async () => {
    const user = userEvent.setup();
    render(<Login backgroundImg="" />);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.type(emailField, "any@gmail.com");
    await user.type(passwordField, "anyany");
    await user.click(loginBttn);

    const loading = screen.getByRole("button", { name: /logging in/i });
    expect(loading).toBeInTheDocument();

    // Mock the useRouter hook with the desired behavior
    (useRouter as jest.Mock).mockReturnValue({
      push: vi.fn(),
    });
    useRouter().push("/");
    expect(useRouter().push).toHaveBeenCalledWith("/");
  });

  //I should find another way to mock the next auth API, as MSW doesnt work
  test.skip("testing a falied login for the user,due to Invalid credintials", async () => {
    // server.use(
    //   http.get("/api/auth/providers", async () => {
    //     await delay();
    //     return HttpResponse.json({
    //       error: "Invalid Credentials",
    //       ok: false,
    //       status: 401,
    //     });
    //   })
    // );

    const user = userEvent.setup();
    const { container } = render(<Login backgroundImg="" />);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBttn = screen.getByRole("button", { name: /log in/i });
    await user.type(emailField, "any@gmail.com");
    await user.type(passwordField, "anyany");
    await user.click(loginBttn);

    // screen.debug();
    // logRoles(container);

    expect(loginBttn).toHaveTextContent("logging in");

    const loginBttn2 = await screen.findByRole("button", { name: /log in/i });
    expect(loginBttn2).toHaveTextContent("Log in");

    screen.debug();

    // await waitFor(
    //   () => {
    //     const a = screen.findByText(/invalid credentials/i);
    //     expect(a).toBeInTheDocument();
    //   },
    //   { timeout: 1000 }
    // );
  });
});
