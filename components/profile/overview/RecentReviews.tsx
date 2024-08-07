import { reviewObj } from "@/models/reviewsModel";
import React from "react";
import ProfileReview from "../ProfileReview";

type RecentReviewsProps = {
  reviews: Array<reviewObj>;
};
const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  return (
    <>
      <p className="font-semibold text-5xl place-self-center my-10">
        Recently Added Reviews
      </p>
      <div className="grid grid-cols-2 gap-10">
        {reviews.map((review) => (
          <ProfileReview key={review._id} review={review} />
        ))}
      </div>
    </>
  );
};

export default RecentReviews;
