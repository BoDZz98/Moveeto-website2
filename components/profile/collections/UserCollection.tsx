import { collectionObj } from "@/models/userModel";
import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type UserCollectionProps = {
  collection: collectionObj;
};
const UserCollection = ({ collection }: UserCollectionProps) => {
  const router = useRouter();
  // Background Image-----------------------------------------------
  let backgroundStyle = { backgroundImage: "" };
  let lastMovieIndex = 0;
  if (collection?.movies.length !== 0) {
    lastMovieIndex = collection.movies.length - 1;
    backgroundStyle = {
      backgroundImage: `url(${baseImageURL}${collection.movies[lastMovieIndex].backdrop_path})`,
    };
  }

  return (
    <div
      className="relative w-2/3 h-96 rounded-xl my-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 group hover:cursor-pointer"
      onClick={() => router.push(`/profile/collectionMovies/${collection._id}`)}
    >
      <div
        style={backgroundStyle}
        data-testid="collection background"
        className="absolute bg-cover bg-center opacity-40 w-full h-full "
      ></div>
      <div className="absolute  w-full h-full  bg-gradient-to-t from-gray-800  to-transparent "></div>
      <div className="absolute  top-20 w-full flex flex-col gap-y-5 items-center ">
        <p className="underline text-3xl font-bold group-hover:text-gray-300">
          {collection.name}
        </p>
        <p className="text-xl text-gray-300">
          Movies: {collection.movies.length}
        </p>
        {collection.movies.length !== 0 && (
          <div className="flex justify-center items-end gap-x-2 w-full ">
            {collection.movies.toReversed().map((m, i) => {
              // Max 3 imgs appear
              if (i > 2) return;
              // To make the center Image larger
              const className =
                lastMovieIndex === 0 || // if list only contain 1 movie
                (lastMovieIndex > 1 && i === 1) //if list contains more than 2 movies
                  ? "rounded-xl w-1/3"
                  : "rounded-xl w-1/4 ";
              return (
                <Image
                  key={m.backdrop_path}
                  alt={"collection movie " + m.title}
                  width={300}
                  height={300}
                  className={className}
                  src={baseImageURL + m.backdrop_path}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCollection;
