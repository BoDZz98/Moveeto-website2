import Image from "next/image";
import React from "react";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { formatDate } from "@/utils/functions-utils";

type ProfileReviewProps = {
  movieName: String;
  rating: String | any; // any to prevent compiler error
  description: String;
  createdAt: String;
};

const ProfileReview = (props: ProfileReviewProps) => {
  return (
    <div className="flex flex-col gap-y-5 bg-gray-800  p-10 my-10 rounded">
      <div className="relative flex items-center gap-x-5 ">
        <span className="text-4xl font-bold text-gray-200 underline-offset-8 underline ">
          {props.movieName}
        </span>
        <Image
          src={`/imgs/rating/${props.rating}.png`}
          alt="Racing"
          className="w-16 h-16  "
          width={50}
          height={50}
        />
        {dropdown}
      </div>
      <p className="text-gray-400 text-xl font-semibold">{props.description}</p>
      <div className="flex items-center gap-x-5">
        <p className="text-gray-500 text-lg font-semibold">
          {formatDate(props.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ProfileReview;

const dropdown = (
  <div className="w-40 flex justify-end absolute right-0 ">
    <Dropdown
      label=""
      placement="left-start"
      dismissOnClick={false}
      renderTrigger={() => optionsIcon}
    >
      <Dropdown.Item as={Link} href="/edit" className="text-lg">
        Edit
      </Dropdown.Item>
      <Dropdown.Item className="text-lg text-red-600" onClick={() => {}}>
        Delete Review
      </Dropdown.Item>
    </Dropdown>
  </div>
);

const optionsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="rgb(107 114 128)"
    className="w-10 h-10 hover:cursor-pointer bg-gray500 hover:stroke-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
