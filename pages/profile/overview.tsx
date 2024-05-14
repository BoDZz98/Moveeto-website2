import Layout from "@/components/layout/layout";
import Carousel from "@/components/profile/MyCarousel";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React from "react";
import RatingBar from "@/components/profile/RatingBar";
import { GetServerSidePropsContext } from "next";
import { connectDB } from "@/utils/db-util";
import User, { collectionObj, userObj } from "@/models/userModel";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import { MovieObj } from "../movie/[movieId]";
import Review, { reviewObj } from "@/models/reviewsModel";
import GamesStatistics from "@/components/profile/GamesStatistics";
import ReviewsStatistics from "@/components/profile/ReviewsStatistics";
import CollectionsStatistics from "@/components/profile/CollectionsStatistics";
import RecentMovies from "@/components/profile/RecentMovies";

type overviewProps = {
  favMovies: Array<MovieObj>;
  wishlistMovies: Array<MovieObj>;
  collections: Array<collectionObj>;
  reviewsStatistics: Array<{ rating: number; ctr: number }>;
  reviewsLength: number;
};

const overview = (props: overviewProps) => {
  const {
    favMovies,
    wishlistMovies,
    collections,
    reviewsStatistics,
    reviewsLength,
  } = props;

  const uniqueMovies = new Set(
    favMovies.slice(0, 2).concat(wishlistMovies.slice(0, 2))
  );
  return (
    <Layout>
      <ProfileLayout pageTitle="Overview">
        <div className="relative  w-full h-[400px]">
          <h1 className="text-4xl mb-8">Favourite games</h1>
          <div className="absolute w-full ">
            <Carousel />
          </div>
        </div>
        <div className="flex my-10">
          <GamesStatistics
            favMoviesLength={favMovies.length}
            wishlistMoviesLength={wishlistMovies.length}
          />
          <ReviewsStatistics
            reviewsStatistics={reviewsStatistics}
            reviewsLength={reviewsLength}
          />
          <CollectionsStatistics collections={collections} />
        </div>
        <RecentMovies movies={Array.from(uniqueMovies)} />
      </ProfileLayout>
    </Layout>
  );
};

export default overview;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const email = session?.user?.email;
  const username = session?.user?.name;

  const user: userObj | null = await User.findOne({ email });
  const reviews = await Review.find({ username });
  let favMovies = [];
  let wishlistMovies = [];
  let collections = [];
  if (user) {
    favMovies = JSON.parse(JSON.stringify(user.favMovies));
    wishlistMovies = JSON.parse(JSON.stringify(user.wishlistMovies));
    collections = JSON.parse(JSON.stringify(user.userCollections));
  }

  const arr: Array<{}> = [];
  for (let i = 5; i >= 1; i--) {
    let ctr = 0;
    reviews.forEach((r, index) => {
      if (i.toString() === r.rating) {
        ctr += 1;
      }
      if (index + 1 === reviews.length) {
        arr.push({ rating: i, ctr });
      }
    });
  }
  return {
    props: {
      collections,
      favMovies,
      wishlistMovies,
      reviewsStatistics: arr,
      reviewsLength: reviews.length,
    },
  };
}
