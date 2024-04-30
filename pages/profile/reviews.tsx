import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import ProfileReview from "@/components/profile/ProfileReview";
import Image from "next/image";
import React from "react";

const reviews = () => {
  return (
    <Layout>
      <ProfileLayout pageTitle="Reviews">
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-col xl:w-2/3 order-2 xl:order-1 ">
            <ProfileReview />
          </div>
          <div className=" flex flex-col gap-y-6 xl:w-1/3 p-10 order-1 ">
            <h1 className="text-4xl font-bold text-gray-200 ">1 Reviews</h1>
            <div className="flex relative w-fit p-4 items-center rounded-full bg-transparent ring-2 ring-gray-500 text-white hover:bg-white  hover:cursor-pointer group transition ease-in-out delay-150">
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
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default reviews;
