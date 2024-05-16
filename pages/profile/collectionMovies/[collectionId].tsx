import Layout from "@/components/layout/layout";
import Card from "@/components/movie-details/Card";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import User, { collectionObj, userObj } from "@/models/userModel";
import { formatDate } from "@/utils/functions-utils";
import MoviesGrid from "@/components/ui/MoviesGrid";
import Dropdown from "@/components/ui/Dropdown";

type CollectionMoviesProps = {
  userCollection: collectionObj;
};
const CollectionMovies = ({ userCollection }: CollectionMoviesProps) => {
  const lastMovieIndex = userCollection.movies.length - 1;
  return (
    <Layout>
      <Card backdrop_path={userCollection.movies[lastMovieIndex].backdrop_path}>
        <div className="flex flex-col gap-y-5">
          <h1 className="text-white text-7xl font-bold  ">
            {userCollection.name}
          </h1>
          <span className="text-gray-400 text-2xl font-semibold mb-5">
            created at
            <span className="text-white text-3xl ml-2">
              {formatDate(userCollection.createdAt)}
            </span>
          </span>

          <p className="text-lg z-10">{userCollection.description}</p>
          <Dropdown />

          <MoviesGrid movies={userCollection.movies} gridCols={3} />
        </div>
      </Card>
    </Layout>
  );
};

export default CollectionMovies;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const collectionId = ctx.params!.collectionId;

  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const email = session?.user?.email;

  const user: userObj | null = await User.findOne({ email });

  let userCollection;

  if (user) {
    const allCollections: Array<collectionObj> = JSON.parse(
      JSON.stringify(user.userCollections)
    );
    userCollection = allCollections.find((c) => c._id === collectionId);
    // console.log(userCollection);
  }

  return {
    props: {
      userCollection,
    },
  };
}
