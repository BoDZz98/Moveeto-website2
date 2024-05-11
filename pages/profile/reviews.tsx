import Layout from "@/components/layout/layout";
import EmptyPage from "@/components/profile/EmptyPage";
import ProfileLayout from "@/components/profile/ProfileLayout";
import ProfileReview from "@/components/profile/ProfileReview";
import Review, { reviewObj } from "@/models/reviewsModel";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React, { JSXElementConstructor } from "react";
import { GetServerSidePropsContext } from "next";
import authOptions from "../api/auth/[...nextauth]";
import RatingDiv from "@/components/profile/RatingDiv";

type reviewsProps = {
  reviews: Array<reviewObj>;
};
const reviews = ({ reviews }: reviewsProps) => {
  const arr: Array<React.JSX.Element> = [];
  for (let i = 5; i >= 1; i--) {
    let ctr = 0;
    reviews.forEach((r, index) => {
      if (i.toString() === r.rating) {
        ctr += 1;
      }
      if (index + 1 === reviews.length && ctr !== 0) {
        arr.push(<RatingDiv rating={i} reviewsNumber={ctr} />);
      }
    });
  }
  return (
    <Layout>
      <ProfileLayout pageTitle="Reviews">
        {/* {reviews.length === 0 && <EmptyPage collectionPage={false} />} */}
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-col xl:w-2/3 order-2 xl:order-1 ">
            {reviews.map((review) => (
              <ProfileReview {...review} />
            ))}
          </div>
          {/* -------------------- */}
          <div className=" flex flex-col gap-y-6 xl:w-1/3 p-10 order-1 ">
            <h1 className="text-4xl font-bold text-gray-200 ">
              {reviews.length} Reviews
            </h1>
            {arr}
            {/* <div className="flex relative w-fit p-4 items-center rounded-full bg-transparent ring-2 ring-gray-500 text-white hover:bg-white  hover:cursor-pointer group transition ease-in-out delay-150">
              <Image
                src={`/imgs/rating/3.png`}
                alt="Racing"
                className="w-12 h-12  "
                width={50}
                height={50}
              />
              <p className="font-semibold ml-2 group-hover:text-black transition ease-in-out delay-150">
                Exceptional
              </p>
              <p className="absolute -right-10 text-xl ">2</p>
            </div> */}
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default reviews;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const username = session?.user?.name;

  const reviews = await Review.find({ username });
  // console.log(reviews);

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
