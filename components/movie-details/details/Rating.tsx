import React, { useContext, useEffect, useState } from "react";
import OneEmoji from "../OneEmoji";
import { useRouter } from "next/router";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import ManageRating from "@/components/profile/reviews/ManageRating";
import { useSession } from "next-auth/react";

const Rating = () => {
  const router = useRouter();
  const { query } = router;
  const { status } = useSession();

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [errorMssg, setErrorMssg] = useState(false);

  useEffect(() => {
    setModalIsVisible(!!query.showModal);
  }, [query.showModal]);

  const { vote_average, vote_count } = useContext(MovieDetailsCtx).movieData;
  const { mostRepeatedRating, reviewsLength } =
    useContext(MovieDetailsCtx).reviewData;

  const data = [
    { title: mostRepeatedRating, subTitle: reviewsLength + " Rating" },
    { title: vote_average },
    { title: "Based on", subTitle: vote_count + " Rating" },
  ];

  return (
    <div className="flex flex-col  gap-y-8 ">
      <div className="flex gap-x-16">
        {data.map((item, index) => (
          <div
            className={index + 1 !== data.length ? "border-r pr-16" : ""}
            key={item.title}
          >
            <h1 className="font-bold text-3xl">{item.title}</h1>
            <p className="underline text-gray-500">{item?.subTitle}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        {ratingData.map((obj) => (
          <OneEmoji
            {...obj}
            key={obj.key}
            isClicked={obj.name === mostRepeatedRating}
          />
        ))}
      </div>
      <div className="flex items-center gap-x-12">
        <button
          className="bg-gray-800 rounded-lg text-gray-500 text-xl font-semibold w-fit flex gap-x-2 px-8 py-6 items-center hover:bg-white hover:text-black transition ease-in-out duration-300"
          onClick={() => {
            status === "unauthenticated"
              ? setErrorMssg(true)
              : setModalIsVisible(true);
          }}
        >
          {plusIcon}
          <p>Write a review</p>
        </button>
        {modalIsVisible && (
          <ManageRating
            onClose={() => setModalIsVisible(false)}
            title="Write a review"
          />
        )}
        {errorMssg && <p className="text-red-500 font-bold">login first</p>}
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

export const ratingData = [
  { key: 1, name: "Skip", image: "1", color: "bg-red-500" },
  { key: 2, name: "Bad", image: "2", color: "bg-yellow-500" },
  { key: 3, name: "Meh", image: "3", color: "bg-orange-300" },
  { key: 4, name: "Recommended", image: "4", color: "bg-blue-500" },
  { key: 5, name: "Exeptional", image: "5", color: "bg-green-500" },
];
