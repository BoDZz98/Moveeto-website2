import { beforeAll, vi } from "vitest";
import { server } from "./mocks/server";
// import "@testing-library/jest-dom";

// beforeAll(() => {
//   vi.mock("next/router", () => require("next-router-mock"));
// });

// Establish API mocking befoer all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// clean up after the test are finished
afterAll(() => server.close());
