import Layout from "@/components/layout/layout";
import { connectDB, deleteCollection } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import authOptions from "../../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import User, { collectionObj, userObj } from "@/models/userModel";
import { formatDate } from "@/utils/functions-utils";
import MoviesGrid from "@/components/ui/MoviesGrid";
import Dropdown from "@/components/ui/Dropdown";
import { useRouter } from "next/router";
import useMySession from "@/hooks/useMySession";
import Card from "@/components/layout/Card";
import ManageCollection from "@/components/profile/collections/ManageCollection";

type CollectionMoviesProps = {
  userCollection: collectionObj;
};
const CollectionMovies = ({ userCollection }: CollectionMoviesProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const router = useRouter();

  // In order to update the page if a change occured (movie removed, collection name updated)
  const { update } = useMySession();

  const lastMovieIndex = userCollection.movies.length - 1;
  const background =
    lastMovieIndex >= 0
      ? userCollection.movies[lastMovieIndex].backdrop_path
      : "";

  return (
    <Layout>
      <Card backdrop_path={background}>
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between">
            <h1 className="text-white text-7xl font-bold  ">
              {userCollection.name}
            </h1>
            <div className="flex gap-x-4">
              <button
                onClick={() => setModalIsVisible(true)}
                className="h-fit z-10 py-4 px-8 rounded text-3xl font-semibold bg-white bg-opacity-20 hover:bg-opacity-100  hover:cursor-pointer hover:text-black transition-all ease-in-out duration-300"
              >
                Edit
              </button>
              {modalIsVisible && (
                <ManageCollection
                  title="Edit Collection"
                  oldValue={{
                    _id: userCollection._id,
                    name: userCollection.name,
                    description: userCollection.description,
                  }}
                  onClose={() => setModalIsVisible(false)}
                />
              )}
              <button
                onClick={() =>
                  deleteCollection(userCollection._id, router, update)
                }
                className="h-fit z-10 py-4 px-8 rounded text-3xl font-semibold bg-white bg-opacity-20 hover:bg-opacity-100  hover:cursor-pointer hover:text-red-500 transition-all ease-in-out duration-300"
              >
                Delete
              </button>
            </div>
          </div>
          <span className="text-gray-400 text-2xl font-semibold mb-5">
            created at
            <span className="text-white text-3xl ml-2">
              {formatDate(userCollection.createdAt)}
            </span>
          </span>

          <p className="text-lg ">{userCollection.description}</p>
          <Dropdown />

          <MoviesGrid movies={userCollection.movies} gridCols={3} />

          {lastMovieIndex === -1 && (
            <p className="place-self-center mt-20 text-3xl font-bold">
              No Movies In This Collection
            </p>
          )}
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
