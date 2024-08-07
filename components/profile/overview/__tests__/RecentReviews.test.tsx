import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import RecentReviews from "../RecentReviews";

test("Testing recent reviews render correctly", () => {
  render(<RecentReviews reviews={reviewsMock} />);

  const compTitle = screen.getByText(/recently added reviews/i);
  expect(compTitle).toBeInTheDocument();

  const recentReviews = screen.getAllByTestId("profile review");
  expect(recentReviews).toHaveLength(2);
});

const reviewsMock = [
  {
    _id: "66a0c68435f47fb9361908b2",
    username: "bodzz",
    movieId: "929590",
    movieName: "Civil War",
    rating: 4,
    description: "very goood",
    createdAt: "2024-07-24T09:16:53.004Z",
  },
  {
    _id: "66ab90ca6bbc879194a71316",
    username: "bodzz",
    movieId: "519182",
    movieName: "Despicable Me 4",
    rating: 5,
    description: "nice movie",
    createdAt: "2024-08-01T13:42:34.455Z",
  },
];
