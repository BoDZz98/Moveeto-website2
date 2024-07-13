import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Header from "../Header";

vi.mock("next-auth/react", async (importOriginal) => {
  const originalModule: {} = await importOriginal();
  return {
    ...originalModule,
    useSession: vi
      .fn()
      .mockReturnValue({ status: "authenticated" }) //default return value, which will be returned in the third test and the tests after it
      .mockReturnValueOnce({ status: "unauthenticated" }) // will be returned in the first test
      .mockReturnValueOnce({ status: "authenticated" }), // will be returned in the second test
  };
});
//---------------------------------------------------------------------
describe("Auth flow", () => {
  test("should show the login button if the user is not auth", async () => {
    render(<Header />);

    const loginElement = await screen.findByRole("heading", {
      name: /login/i,
    });
    expect(loginElement).toBeInTheDocument();
  });

  test("should show the logout button if the user is auth", async () => {
    render(<Header />);

    const logoutElement = await screen.findByRole("heading", {
      name: /logout/i,
    });
    expect(logoutElement).toBeInTheDocument();
  });
});

// test("should go to the right page when clicking on a link", async () => {
//   const user = userEvent.setup();
//   render(
//     <Layout>
//       <h1>This weak</h1>
//     </Layout>
//   );

//   const linkElement = screen.getByRole("heading", {
//     name: /this week/i,
//   });
//   await user.click(linkElement);
//   const pageTitle = screen.getByRole("heading", {
//     name: /this weak/i,
//   });
//   expect(pageTitle).toBeDefined();
// });
// const push = vi.fn();
// render(
//   <AppRouterContextProviderMock router={{ push }}>
//     <Header />
//   </AppRouterContextProviderMock>,
//   { wrapper: SessionProvider }
// );
