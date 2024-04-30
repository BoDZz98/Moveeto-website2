import Layout from "@/components/layout/layout";
import Carousel from "@/components/profile/MyCarousel";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React from "react";

const overview = () => {
  return (
    <Layout>
      <ProfileLayout pageTitle="Overview">
        <div className="relative  w-full h-[400px]">
          <h1 className="text-4xl mb-8">Favourite games</h1>
          <div className="absolute w-full ">
            <Carousel />
          </div>
        </div>
        <div>
          <p>assssss</p>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default overview;

const leftArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3.5}
    stroke="rgb(55 65 81)"
    className="w-10 h-10 absolute top-24 -left-14 hover:stroke-white hover:cursor-pointer transition ease-in-out delay-150"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3.5}
    stroke="rgb(55 65 81)"
    className="w-10 h-10  absolute top-24 -right-14 hover:stroke-white hover:cursor-pointer transition ease-in-out delay-150"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);
