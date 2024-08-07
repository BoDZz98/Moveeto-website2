import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { connectDB } from "@/utils/db-util";
import User, { collectionObj, userMovieObj, userObj } from "@/models/userModel";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import Review, { reviewObj } from "@/models/reviewsModel";
import ReviewsStatistics from "@/components/profile/overview/ReviewsStatistics";
import CollectionsStatistics from "@/components/profile/overview/CollectionsStatistics";
import RecentMovies from "@/components/profile/overview/RecentMovies";
import RecentReviews from "@/components/profile/overview/RecentReviews";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MoviesStatistics from "../../components/profile/overview/MoviesStatistics";
import Carousel from "../../components/profile/overview/MyCarousel";

type overviewProps = {
  favMovies: Array<userMovieObj>;
  wishlistMovies: Array<userMovieObj>;
  collections: Array<collectionObj>;
  reviews: Array<reviewObj>;
};

const Overview = (props: overviewProps) => {
  const { favMovies, wishlistMovies, collections, reviews } = props;
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    // if (session) {
    router.push("/profile/overview");
    // }
  }, [session]);

  // console.log("in here3");

  const reviewsStatistics: Array<{ rating: number; ctr: number }> = [];
  for (let i = 5; i >= 1; i--) {
    let ctr = 0;
    reviews.forEach((r, index) => {
      if (i == r.rating) ctr += 1;

      if (index + 1 === reviews.length)
        reviewsStatistics.push({ rating: i, ctr });
    });
  }
  return (
    <Layout>
      <ProfileLayout pageTitle="Overview">
        <div className="relative  w-full  h-[600px]">
          <h1 className="text-4xl mb-8">Favourite games</h1>
          <div className="absolute w-full overflow-visible ">
            <Carousel movies={favMovies} />
          </div>
        </div>
        <div className="flex my-10 mt-20">
          <MoviesStatistics
            favMoviesLength={favMovies.length}
            wishlistMoviesLength={wishlistMovies.length}
          />
          <ReviewsStatistics
            reviewsStatistics={reviewsStatistics}
            reviewsLength={reviews.length}
          />
          <CollectionsStatistics collections={collections} />
        </div>
        <RecentMovies
          movies={favMovies.slice(0, 4).concat(wishlistMovies.slice(0, 4))}
        />
        <RecentReviews reviews={reviews.slice(0, 2)} />
      </ProfileLayout>
    </Layout>
  );
};

export default Overview;

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
  console.log(JSON.parse(JSON.stringify(reviews)));

  return {
    props: {
      collections,
      favMovies,
      wishlistMovies,
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
