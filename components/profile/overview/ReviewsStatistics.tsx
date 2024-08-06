import React from "react";
import RatingBar from "./RatingBar";

type ReviewsStatisticsProps = {
  reviewsStatistics: Array<{ rating: number; ctr: number }>;
  reviewsLength: number;
};
const ReviewsStatistics = ({
  reviewsStatistics,
  reviewsLength,
}: ReviewsStatisticsProps) => {
  return (
    <div className="flex flex-col gap-y-10 w-1/3 border-r-2 px-10">
      <span className="text-8xl font-bold">
        {reviewsLength}
        <span className="text-4xl font-normal ml-2">Reviews</span>
      </span>
      {reviewsStatistics.map((r, i) => (
        <RatingBar
          key={i}
          image={r.rating}
          color="pink"
          progress={(r.ctr / reviewsLength) * 100}
          count={r.ctr}
        />
      ))}
    </div>
  );
};

export default ReviewsStatistics;
