import { collectionObj } from "@/models/userModel";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import { Dropdown } from "flowbite-react";
import { useSession } from "next-auth/react";
import React, { ReactNode, useContext, useEffect, useState } from "react";

type AddButtonProps = {
  title: string;
  subTitle: string;
  icon: ReactNode;
  contStyle?: string;
  textStyle?: string;
  userCollections: Array<collectionObj>;
  clickHandler: () => void;
};
const AddButton = ({
  title,
  subTitle,
  icon,
  contStyle,
  textStyle,
  userCollections,
  clickHandler,
}: AddButtonProps) => {
  const {
    title: movieTitle,
    backdrop_path,
    genres,
    release_date,
  } = useContext(MovieDetailsCtx).movieData;
  async function addMovieHandler(collectionName: string) {
    const res = await fetch("/api/addMovies", {
      method: "POST",
      body: JSON.stringify({
        collectionName,
        movie: { title: movieTitle, backdrop_path, genres, release_date },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const collections = data.collections;
    console.log("collections is", collections);
  }
  return (
    <>
      {title !== "Collection" ? (
        <button
          onClick={clickHandler}
          className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
        >
          <div className="absolute right-0 ">{icon}</div>
          <p className="text-sm text-gray-500">{subTitle}</p>
          <p className={`font-semibold ${textStyle}`}>{title}</p>
        </button>
      ) : (
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <button
              className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
            >
              <div className="absolute right-0 ">{icon}</div>
              <p className="text-sm text-gray-500">{subTitle}</p>
              <p className={`font-semibold ${textStyle}`}>{title}</p>
            </button>
          )}
        >
          {userCollections.length !== 0 ? (
            userCollections.map((collection, index) => (
              <Dropdown.Item
                className="relative"
                key={index}
                onClick={() => addMovieHandler(collection.name)}
              >
                {collection.name}
                {collection.movies.map((m) => {
                  if (m.title === movieTitle) return checkIcon;
                })}
              </Dropdown.Item>
            ))
          ) : (
            <p>No collections</p>
          )}
        </Dropdown>
      )}
    </>
  );
};

export default AddButton;

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4.5}
    stroke=" rgb(49 196 141)"
    className="w-4 h-4 absolute right-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
