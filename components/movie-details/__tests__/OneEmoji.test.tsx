import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import OneEmoji from "../OneEmoji";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Testing one emoji component", () => {
  const mockFn = vi.fn();

  const ratingData = {
    key: 5,
    name: "Exeptional",
    image: "5",
    color: "bg-green-500",
    isClicked: false,
    onPress: mockFn,
  };
  const imgStyle =
    "w-20 h-20 opacity-75 group-hover:cursor-pointer group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-125 transition ease-in-out duration-300 ";
  const activeImgStyle = "w-20 h-20 opacity-100 -translate-y-2 scale-125 ";

  test("render emoji component correctly", async () => {
    const user = userEvent.setup();
    render(<OneEmoji {...ratingData} />);

    // Checking for the right image and style
    const img = screen.getByRole("img", {
      name: /exeptional/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass(imgStyle);

    // Checking the div color
    const colorDiv = screen.getByTestId("color div");
    expect(colorDiv).toHaveClass("bg-green-500");

    // Checking the text
    const ratingName = screen.getByText("Exeptional");
    expect(ratingName).toBeInTheDocument();

    // testing onClick functiontionality
    const emojiDiv = screen.getByTestId("emoji div");
    await user.click(emojiDiv);
    expect(mockFn).toHaveBeenCalled();
  });

  test("should render the emoji with the right style if it's clicked", () => {
    ratingData.isClicked = true;
    render(<OneEmoji {...ratingData} />);
    const img = screen.getByRole("img", {
      name: /exeptional/i,
    });
    expect(img).toHaveClass(activeImgStyle);
  });
});
