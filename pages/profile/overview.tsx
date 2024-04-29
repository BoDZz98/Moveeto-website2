import Layout from "@/components/layout/layout";
import Carouselll from "@/components/profile/Cor";
import EmptyMovieCard from "@/components/profile/EmptyMovieCard";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React from "react";

const overview = () => {
  return (
    <Layout>
      <ProfileLayout pageTitle="Overview">
        <div className="">
          <h1 className="text-4xl mb-8">Favourite games</h1>
          {/* <div className="flex gap-x-10 relative ">
            {leftArrow}
            <EmptyMovieCard />
            <EmptyMovieCard />
            <EmptyMovieCard />
            {rightArrow}
          </div> */}
          <Carouselll />
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
