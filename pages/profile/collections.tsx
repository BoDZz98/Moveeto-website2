import Layout from "@/components/layout/layout";
import ManageCollection from "@/components/profile/ManageCollection";
import ProfileLayout from "@/components/profile/ProfileLayout";
import MyModalCard from "@/components/ui/MyModalCard";
import Image from "next/image";
import React, { useState } from "react";

const collections = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  return (
    <Layout>
      <ProfileLayout pageTitle="Collections">
        <div className="flex flex-col gap-y-5 items-center justify-center">
          <Image
            src={`/imgs/sleeping.png`}
            alt="Racing"
            className="w-32 h-32  "
            width={50}
            height={50}
          />
          <p className="text-gray-500 font-semibold text-lg">
            No collections yet
          </p>
          <button
            className="bg-white text-black text-xl font-semibold rounded py-4 xl:px-16 px-8 hover:bg-gray-400 transition ease-in-out delay-100"
            onClick={() => {
              setModalIsVisible(true);
            }}
          >
            Start a new collection
          </button>
          {modalIsVisible && (
            <ManageCollection onClose={() => setModalIsVisible(false)} title='Start a new collection'/>
          )}
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default collections;
