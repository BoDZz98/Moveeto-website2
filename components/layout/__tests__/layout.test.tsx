import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterContextProviderMock } from "./app-router-context-provider-mock";
// import { useRouter } from "next/router";
// import * as mockRouter from "next-router-mock";
// const useRouter = mockRouter.useRouter;

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
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

test("should first", () => {
  // render(<Header />, { wrapper: SessionProvider });
  const push = jest.fn();

  render(
    <AppRouterContextProviderMock router={{ push }}>
      <Header />
    </AppRouterContextProviderMock>,
    { wrapper: SessionProvider }
  );

  const any = screen.getByRole("heading", {
    name: /my library/i,
  });
  expect(any).toBeDefined();
});

/* 
vi.mock("next/router", () => ({
    // require("next-router-mock");
    ...mockRouter,
    useRouter: () => {},
  }));
  
*/
