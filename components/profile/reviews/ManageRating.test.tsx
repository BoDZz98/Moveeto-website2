import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import ManageRating from "./ManageRating";

describe("Testing manage rating modale", () => {
  const mockFn = vi.fn();
  const oldReviewData = {
    title: "Update a review",
    onClose: mockFn,
    oldValue: {
      _id: "519182",
      rating: "5",
      description: "nice movie",
    },
  };
  test("render manage rating modale correctly (Creating a new review)", () => {
    render(<ManageRating title="Write a review" onClose={mockFn} />);

    // Checking module title
    const moduleTitle = screen.getByText("Write a review");
    expect(moduleTitle).toBeInTheDocument();

    // Checking all emojis is rendered
    const emojis = screen.getAllByTestId("emoji div");
    expect(emojis).toHaveLength(5);

    //  Checking the text box
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveValue("");

    // Checking the submit button
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    expect(submitBttn).toBeInTheDocument();
  });

  test("should render manage rating modale with review data passed as a props (Updating a review)", () => {
    render(<ManageRating {...oldReviewData} />);

    // Checking if the right emoji is selected
    const img = screen.getByRole("img", {
      name: /exeptional/i,
    });
    expect(img).toHaveClass("w-20 h-20 opacity-100 -translate-y-2 scale-125 ");

    // Checking the value of textbox
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(textBox).toHaveValue("nice movie");
  });

  test("testing the close functionality", async () => {
    const user = userEvent.setup();
    render(<ManageRating title="Write a review" onClose={mockFn} />);

    // Checking close button
    const closeBttn = screen.getByRole("button", {
      name: /×/i,
    });
    expect(closeBttn).toBeInTheDocument();
    await user.click(closeBttn);
    expect(mockFn).toHaveBeenCalled();
  });

  test("testing the validation of manage rating modale", async () => {
    const user = userEvent.setup();
    render(<ManageRating title="Write a review" onClose={mockFn} />);

    // typing Invalid data, length is less than 4
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.type(textBox, "aaa");

    // Submitting data
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Error messages appear
    const ratingError = screen.getByText(/rating is required/i);
    const descError = screen.getByText(/description is invalid/i);
    expect(ratingError).toBeInTheDocument();
    expect(descError).toBeInTheDocument();

    // Typing valid data
    const img = screen.getByRole("img", {
      name: /exeptional/i,
    });
    await user.click(img);
    await user.type(textBox, "nice movie");

    // Error message should dissapear
    expect(ratingError).not.toBeInTheDocument();
    expect(descError).not.toBeInTheDocument();

    // Submitting data
    await user.click(submitBttn);
    expect(mockFn).toHaveBeenCalled();
  });
  test("updating an already created review", async () => {
    // Mock the useRouter hook with the desired behavior
    const pushMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    const user = userEvent.setup();
    render(<ManageRating {...oldReviewData} />);

    // Typing valid data
    const textBox = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.type(textBox, "what a movie");

    // Submitting data
    const submitBttn = screen.getByRole("button", {
      name: /save changes/i,
    });
    await user.click(submitBttn);

    // Expect the page to be refreshed
    expect(pushMock).toHaveBeenCalledWith("/profile/reviews");
    expect(mockFn).toHaveBeenCalled();
  });
});
