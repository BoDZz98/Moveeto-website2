import Image from "next/image";
import React from "react";

type GameReviewProps = {
  username: string;
  rating: String | any; // any to prevent compiler error
  description: String;
  createdAt: string;
};
const GameReview = (props: GameReviewProps) => {
  const { username, rating, description, createdAt } = props;

  return (
    <div className="flex flex-col gap-y-5 bg-gray-900 bg-opacity-70 p-10 rounded">
      <div className="flex items-center gap-x-5 ">
        <span className="text-5xl font-bold text-white ">
          {ratingArray[parseInt(rating)]}
        </span>
        <Image
          src={`/imgs/rating/${rating}.png`}
          alt="Racing"
          className="w-20 h-20 opacity-100 "
          width={50}
          height={50}
        />
      </div>
      <p className="text-gray-400 text-xl font-semibold">{description}</p>
      <div className="flex items-center gap-x-5">
        <Image
          src={`/imgs/rating/5.png`}
          alt="User Img"
          className="w-20 h-20 opacity-100 "
          width={50}
          height={50}
        />
        <div>
          <p className="text-xl font-bold">{username}</p>
          <p className="text-gray-500 text-lg font-semibold">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default GameReview;

const ratingArray = ["Skip", "Bad", "Meh", "Recommended", "Exeptional"];
