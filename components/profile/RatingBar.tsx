import { Progress } from "flowbite-react";
import Image from "next/image";
import React from "react";

type RatingBarProps = {
  label?: string;
  image?: number;
  color: string;
  count: number;
  progress: number;
};
const RatingBar = (props: RatingBarProps) => {
  const { label, image, count, color, progress } = props;
  return (
    <div className="flex items-center gap-x-4">
      {label ? (
        <span>{label}</span>
      ) : (
        <Image
          src={`/imgs/rating/${image}.png`}
          alt="rating"
          className="w-12 h-12  "
          width={40}
          height={40}
        />
      )}
      <div className="w-full">
        <Progress progress={progress} color={color} />
      </div>
      <span>{count}</span>
    </div>
  );
};

export default RatingBar;
