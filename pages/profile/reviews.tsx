import Layout from "@/components/layout/layout";
import EmptyPage from "@/components/profile/EmptyPage";
import ProfileLayout from "@/components/profile/ProfileLayout";
import ProfileReview from "@/components/profile/ProfileReview";
import Review, { reviewObj } from "@/models/reviewsModel";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import authOptions from "../api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import RatingDiv from "@/components/profile/reviews/RatingDiv";

type reviewsProps = {
  reviews: Array<reviewObj>;
};
const Reviews = ({ reviews }: reviewsProps) => {
  const [filterReviews, setFilterReviews] = useState(reviews);
  const [activeRating, setActiveRating] = useState(0);

  useEffect(() => {
    // we needed this use effect , bec when a review was deleted, ui wasn't updated
    setFilterReviews(reviews);
  }, [reviews]);

  let arr: Array<{ rating: number; count: number }> = [];

  for (let i = 5; i >= 1; i--) {
    let ctr = 0;
    reviews.forEach((r, index) => {
      if (i == r.rating) ctr += 1;
      if (index + 1 === reviews.length && ctr !== 0)
        arr.push({ rating: i, count: ctr });
    });
  }
  //------------------------------------------------------
  function filterHandler(rating: number) {
    // If it's already clicked, then reset
    if (rating === activeRating) {
      setActiveRating(0);
      setFilterReviews(reviews);
      return;
    }

    setActiveRating(rating);
    setFilterReviews(reviews.filter((r) => r.rating == rating));
  }

  return (
    <Layout>
      <ProfileLayout pageTitle="Reviews">
        {reviews.length === 0 ? (
          <EmptyPage pageTitle="No reviews yet" />
        ) : (
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col xl:w-2/3 order-2 xl:order-1 ">
              {filterReviews.map((review) => (
                <ProfileReview
                  review={review}
                  editable={true}
                  key={review._id}
                />
              ))}
            </div>
            {/* -------------------- */}
            <div className=" flex flex-col gap-y-6 xl:w-1/3 p-10 order-1 ">
              <h1 className="text-4xl font-bold text-gray-200 ">
                {reviews.length} Reviews
              </h1>
              {arr.map((o) => (
                <RatingDiv
                  key={Math.random() * 1000}
                  rating={o.rating}
                  reviewsNumber={o.count}
                  isActive={o.rating === activeRating}
                  onClickHandler={filterHandler}
                />
              ))}
            </div>
          </div>
        )}
      </ProfileLayout>
    </Layout>
  );
};

export default Reviews;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const username = session?.user?.name;

  const reviews = await Review.find({ username });

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
