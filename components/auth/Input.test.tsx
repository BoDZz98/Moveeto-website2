import { render, screen } from "@testing-library/react";
import InputField from "./Input";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("testing input field", () => {
  test("Input field renders initially", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    render(
      <InputField
        label="Email"
        type="text"
        value="" //any@gmail.com
        hasError={false}
        setValue={mockFn}
      />
    );
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const emailField2 = screen.getByPlaceholderText("Email");

    expect(emailField2).toBeInTheDocument();
    expect(emailField).toHaveValue("");
    expect(emailField).not.toHaveClass("border-red-600 border-2");

    await user.type(emailField, "any");
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test("Input field renders with an error", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();

    render(
      <InputField
        label="Password"
        type="password"
        value="any"
        hasError={true}
        setValue={mockFn}
      />
    );
    // const emailField = screen.getByRole("textbox", { name: "Password" });
    const emailField = screen.getByPlaceholderText("Password");

    // expect(emailField2).toBeInTheDocument();
    expect(emailField).toHaveValue("any");
    expect(emailField).toHaveClass("border-red-600 border-2");

    await user.type(emailField, "1234");
    expect(mockFn).toHaveBeenCalledTimes(4);
  });
});
