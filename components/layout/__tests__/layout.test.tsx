import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

vi.mock("next/router", () => {
  const actual = vi.importActual("next/router");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

//---------------------------------------------------------------------
vi.mock("next-auth/react", async (importOriginal) => {
  const originalModule: {} = await importOriginal();
  const mockSession1 = { status: "unauthenticated" };
  const mockSession2 = { status: "authenticated" };
  return {
    ...originalModule,
    useSession: vi
      .fn()
      .mockReturnValueOnce(mockSession1)
      .mockReturnValueOnce(mockSession2),
  };
});
//---------------------------------------------------------------------

test("should first", async () => {
  render(<Header />, { wrapper: SessionProvider });

  const any = await screen.findByRole("heading", {
    name: /login/i,
  });
  expect(any).toBeDefined();
});

test("should second", async () => {
  render(<Header />, { wrapper: SessionProvider });

  const any = await screen.findByRole("heading", {
    name: /logout/i,
  });
  expect(any).toBeDefined();
});

// const push = vi.fn();
// render(
//   <AppRouterContextProviderMock router={{ push }}>
//     <Header />
//   </AppRouterContextProviderMock>,
//   { wrapper: SessionProvider }
// );
