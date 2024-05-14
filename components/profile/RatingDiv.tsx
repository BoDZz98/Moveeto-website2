import Image from "next/image";
import React from "react";

type ratingDivProps = {
  rating: number; // to prvent error compiler
  reviewsNumber: number;
  isActive: boolean;
  onClickHandler: (rating: number) => void;
};

const RatingDiv = (props: ratingDivProps) => {
  const { rating, reviewsNumber, isActive, onClickHandler } = props;
  const cont =
    "flex relative w-fit p-4 items-center rounded-full bg-transparent ring-2 ring-gray-500 text-white hover:bg-white  hover:cursor-pointer group transition ease-in-out delay-150";
  const activeCont =
    "flex relative w-fit p-4 items-center rounded-full text-black ring-2 ring-gray-500  bg-white  hover:cursor-pointer  ";
  return (
    <div
      onClick={onClickHandler.bind(null, rating)}
      className={isActive ? activeCont : cont}
    >
      <Image
        src={`/imgs/rating/${rating}.png`}
        alt="Racing"
        className="w-12 h-12  "
        width={40}
        height={40}
      />
      <p className="font-semibold ml-2 group-hover:text-black transition ease-in-out delay-150">
        {ratingArray[rating - 1]}
      </p>
      <p className="absolute -right-10 text-xl text-white">{reviewsNumber}</p>
    </div>
  );
};

export default RatingDiv;

const ratingArray = ["Skip", "Bad", "Meh", "Recommended", "Exeptional"];
