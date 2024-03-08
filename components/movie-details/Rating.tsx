import Image from "next/image";
import React from "react";
import OneEmoji from "./OneEmoji";

const data = [
  { title: "Exceptional", subTitle: "46 Rating" },
  { title: "# 190" },
  { title: "# 1" },
];
const Rating = () => {
  return (
    <div className="flex flex-col  gap-y-8">
      <div className="flex ">
        {data.map((item, index) => (
          <>
            <div className={`flex flex-col `} id={item.title}>
              <p className="font-bold text-3xl">{item.title}</p>
              <p className="underline text-gray-500">{item?.subTitle}</p>
            </div>
            {index + 1 !== data.length && <div className="border mx-16"></div>}
          </>
        ))}
      </div>
      <div className="flex">
        <OneEmoji name="Exeptional" image="5" color="bg-green-500" />
        <OneEmoji name="Recommended" image="4" color="bg-blue-500" />
        <OneEmoji name="Meh" image="3" color="bg-orange-300" />
        <OneEmoji name="Bad" image="2" color="bg-yellow-500" />
        <OneEmoji name="Skip" image="1" color="bg-red-500" />
      </div>
      <div>
        <button className="bg-gray-800 rounded-lg text-gray-500 text-xl font-semibold w-fit flex gap-x-2 px-8 py-6 items-center hover:bg-white hover:text-black transition ease-in-out duration-300">
          {plusIcon}
          <p>Write a review</p>
        </button>
      </div>
    </div>
  );
};

export default Rating;

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke="currentColor"
    className="w-5 h-5 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
