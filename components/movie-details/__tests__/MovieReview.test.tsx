import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import MovieReview from "../MovieReview";

const reviewData = {
  username: "bodzz",
  rating: 5,
  description: "nice movie",
  createdAt: "1-8-2024",
};

test("Testing movie review renders correctly ", () => {
  render(<MovieReview {...reviewData} />);

  const rating = screen.getByText(/exeptional/i);
  const ratingEmoji = screen.getByRole("img", {
    name: /exeptional/i,
  });
  const reviewDescription = screen.getByText(/nice movie/i);
  const username = screen.getByText(/bodzz/i);
  const createdAt = screen.getByText(/8\-1\-2024/i);

  expect(rating).toBeInTheDocument();
  expect(ratingEmoji).toBeInTheDocument();
  expect(reviewDescription).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(createdAt).toBeInTheDocument();
});
