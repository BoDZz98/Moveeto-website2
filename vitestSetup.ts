import { beforeAll, vi } from "vitest";
import { server } from "./mocks/server";
// import "@testing-library/jest-dom";

// beforeAll(() => {
//   vi.mock("next/router", () => require("next-router-mock"));
// });

// Establish API mocking, or any mock in general before all tests
beforeAll(() => {
  server.listen();
  vi.mock("next/router", () => {
    const actual = vi.importActual("next/router");
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        // query: { time: "This Weak" },
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// clean up after the test are finished
afterAll(() => server.close());

// To prevent an error -> matchmedia not present legacy browsers require a polyfill
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
