import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React, { Suspense } from "react";
import ReactPlayer from "react-player";
type ImagesProps = {
  youtubekey: string;
  movieImgs: Array<{ file_path: string }>;
};

const Images = ({ youtubekey, movieImgs }: ImagesProps) => {
  return (
    <div className="w-2/5  z-10">
      <div className="rounded-xl overflow-hidden mb-5 mt-12">
        <Suspense fallback>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubekey}`}
            style={{ maxWidth: "100%" }}
            playing
            loop
            muted
            controls
          />
        </Suspense>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">
        {movieImgs.map((movie, index) => {
          if (index > 4) return;
          return (
            <Image
              id={movie.file_path}
              src={baseImageURL + movie.file_path}
              className="w-full rounded-lg"
              alt=""
              width={200}
              height={200}
            />
          );
        })}
        <div className="w-full rounded-lg bg-gray-800 flex flex-col justify-center items-center hover:bg-gray-400 group">
          {optionsIcon}
          <p className="text-gray-500 group-hover:text-black">View all</p>
        </div>
      </div>
    </div>
  );
};

export default Images;

const optionsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-8 h-8 group-hover:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
