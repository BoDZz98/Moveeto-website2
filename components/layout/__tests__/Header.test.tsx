import {
  logRoles,
  render,
  screen,
} from "@/utils/testing-utils/testing-library-utils";
import Header from "../Header";
import { vi } from "vitest";
import * as nextAuthReact from "next-auth/react";

// This is working/ but I implement another way using spyon method in each test case
// vi.mock("next-auth/react", async (importOriginal) => {
//   const originalModule: {} = await importOriginal();
//   return {
//     ...originalModule,
//     useSession: vi
//       .fn()
//       .mockReturnValueOnce({ status: "unauthenticated" }) // will be returned in the first test
//       .mockReturnValueOnce({ status: "unauthenticated" }) // will be returned in the second test
//       .mockReturnValue({ status: "authenticated" }), //default return value, which will be returned in the third test and the tests after it
//   };
// });

describe("testing the header in the layout", () => {
  test("Header renders correctly", async () => {
    vi.spyOn(nextAuthReact, "useSession").mockImplementation(() => ({
      status: "unauthenticated",
      data: null,
      update: vi.fn(),
    }));
    const { container } = render(<Header />);

    const title = screen.getByRole("heading", { name: /moveeto/i });
    const logo = screen.getByRole("img", { name: /webstie logo/i });
    const searchBox = screen.getByRole("searchbox");
    const links = await screen.findAllByRole("heading", { level: 2 });

    expect(title).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
    expect(links).toHaveLength(2);
  });

  test("should show the login button if the user is not auth", async () => {
    vi.spyOn(nextAuthReact, "useSession").mockImplementation(() => ({
      status: "unauthenticated",
      data: null,
      update: vi.fn(),
    }));
    render(<Header />);

    const loginElement = await screen.findByRole("heading", {
      name: /login/i,
    });
    expect(loginElement).toBeInTheDocument();
  });

  test("should show the logout button if the user is auth", async () => {
    vi.spyOn(nextAuthReact, "useSession").mockImplementation(() => ({
      status: "authenticated",
      data: { expires: "" },
      update: vi.fn(),
    }));
    render(<Header />);

    const logoutElement = await screen.findByRole("heading", {
      name: /logout/i,
    });
    expect(logoutElement).toBeInTheDocument();
  });
});
