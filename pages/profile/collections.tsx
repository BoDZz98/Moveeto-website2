import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import User, { collectionObj, userObj } from "@/models/userModel";
import EmptyPage from "@/components/profile/EmptyPage";
import { useState } from "react";
import ManageCollection from "@/components/profile/ManageCollection";

type collectionsProps = {
  collections: Array<collectionObj>;
};
const collections = ({ collections }: collectionsProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <Layout>
      <ProfileLayout pageTitle="Collections">
        {collections.length === 0 && <EmptyPage collectionPage />}
        <div>
          <div className="flex justify-end">
            <p
              className="underline hover:cursor-pointer hover:text-gray-300"
              onClick={() => {
                setModalIsVisible(true);
              }}
            >
              + Start a new collection
            </p>
          </div>
          {collections.length !== 0 &&
            collections.map((collection, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-5 my-14 items-center justify-center w-2/3 h-52 rounded-lg p4 bg-gradient-to-br from-gray-800 to-gray-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 group"
              >
                <p className="underline text-3xl font-bold group-hover:text-gray-300">
                  {collection.name}
                </p>
                <p className="text-xl text-gray-300">
                  Movies: {collection.movies.length}
                </p>
              </div>
            ))}
        </div>
        {modalIsVisible && (
          <ManageCollection
            onClose={() => setModalIsVisible(false)}
            title="Start a new collection"
          />
        )}
      </ProfileLayout>
    </Layout>
  );
};

export default collections;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const email = session?.user?.email;
  const user: userObj | null = await User.findOne({ email });
  let userCollections: Array<collectionObj> = [];
  if (user) {
    userCollections = JSON.parse(JSON.stringify(user.userCollections));
  }

  return {
    props: {
      collections: userCollections,
    },
  };
}
