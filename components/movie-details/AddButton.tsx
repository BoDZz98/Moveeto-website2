import useMySession from "@/hooks/useMySession";
import { collectionObj } from "@/models/userModel";
import { addMovieHandler } from "@/utils/db-util";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import { Dropdown } from "flowbite-react";
import React, { ReactNode, useContext, useEffect, useState } from "react";

type AddButtonProps = {
  title: string;
  subTitle: string;
  icon: ReactNode;
  contStyle?: string;
  textStyle?: string;
  clickHandler?: () => void;
};

const AddButton = (props: AddButtonProps) => {
  const { id, title, backdrop_path, genres, release_date, vote_count } =
    useContext(MovieDetailsCtx).movieData;
  const movie = {
    id: id.toString(),
    title,
    backdrop_path,
    genres,
    release_date,
    vote_count,
  };
  const { userCollections, update } = useMySession();

  useEffect(() => {}, [userCollections]);

  // async function addMovieHandler(collectionId: string) {
  //   const res = await fetch("/api/addMovies", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       collectionId,
  //       movie: { id, title, backdrop_path, genres, release_date, vote_count },
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.ok) update();
  // }
  //-----------------------------------------------
  return (
    <>
      {props.title !== "Collection" ? (
        <button
          onClick={props.clickHandler}
          className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${props.contStyle}`}
        >
          <div className="absolute right-0 ">{props.icon}</div>
          <p className="text-sm text-gray-500">{props.subTitle}</p>
          <p className={`font-semibold ${props.textStyle}`}>{props.title}</p>
        </button>
      ) : (
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <button
              className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${props.contStyle}`}
            >
              <div className="absolute right-0 ">{props.icon}</div>
              <p className="text-sm text-gray-500">{props.subTitle}</p>
              <p className={`font-semibold ${props.textStyle}`}>
                {props.title}
              </p>
            </button>
          )}
        >
          {userCollections && userCollections.length !== 0 ? (
            userCollections.map((c: collectionObj) => (
              <Dropdown.Item
                className="relative"
                key={c._id}
                onClick={() => addMovieHandler(movie, update, c._id)}
              >
                {c.name}
                {c.movies.map((m) => {
                  if (m.title === title) return checkIcon;
                })}
              </Dropdown.Item>
            ))
          ) : (
            <p className="p-2">No collections</p>
          )}
        </Dropdown>
      )}
    </>
  );
};

export default AddButton;

export const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4.5}
    stroke=" rgb(49 196 141)"
    className="w-4 h-4 absolute right-4"
    key="any"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
