import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import User, { collectionObj, userObj } from "@/models/userModel";
import EmptyPage from "@/components/profile/EmptyPage";
import { useState } from "react";
import { baseImageURL } from "@/utils/api-utils";
import UserCollection from "@/components/profile/collections/UserCollection";
import ManageCollection from "@/components/profile/collections/ManageCollection";

type collectionsProps = {
  collections: Array<collectionObj>;
};
const Collections = ({ collections }: collectionsProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <Layout>
      <ProfileLayout pageTitle="Collections">
        {collections.length === 0 ? (
          <EmptyPage pageTitle="" collectionPage />
        ) : (
          <>
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
            {collections.map((collection) => {
              return (
                <UserCollection key={collection._id} collection={collection} />
              );
            })}
          </>
        )}
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

export default Collections;

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
