import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Login from "../login";
describe("Testing the login page", () => {
  test("renders the login page", async () => {
    render(<Login backgroundImg=""/>);
  });
});
