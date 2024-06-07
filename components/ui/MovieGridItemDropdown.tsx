import { Dropdown } from "flowbite-react";
import React from "react";
import { collectionObj, userMovieObj } from "@/models/userModel";
import { checkIcon } from "../movie-details/AddButton";
import { useRouter } from "next/router";
import { optionsIcon } from "./MGIButtonGroup";
import { addMovieHandler } from "@/utils/db-util";
import useMySession from "@/hooks/useMySession";

type MovieGridItemDropdownProps = {
  movie: userMovieObj;
};
const MovieGridItemDropdown = ({ movie }: MovieGridItemDropdownProps) => {
  const { userCollections, update } = useMySession();

  const router = useRouter();

  function reviewHandler() {
    router.push(`/movie/${movie.id}?showModal=true`);
  }

  return (
    <div className="z-20">
      <Dropdown
        label=""
        placement="right-start"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-x-1 rounded bg-gray-600 w-fit group cont hover:bg-white hover:cursor-pointer transition ease-in-out duration-300 px-2 py-2 h-full">
            {optionsIcon}
          </div>
        )}
      >
        <Dropdown.Item className="text-lg" onClick={reviewHandler}>
          Write a Review
        </Dropdown.Item>

        <Dropdown.Divider className="bg-black" />
        <Dropdown.Header>
          <span className="block text-sm">Add to Collection</span>
        </Dropdown.Header>

        {userCollections && userCollections.length !== 0 ? (
          userCollections.map((c: collectionObj) => (
            <Dropdown.Item
              key={c._id}
              onClick={() => addMovieHandler(movie, update, c._id, null)}
            >
              {c.name}
              {c.movies.map((m) => {
                if (m.id == movie.id) return checkIcon;
              })}
            </Dropdown.Item>
          ))
        ) : (
          <p className="p-2">No collections</p>
        )}
      </Dropdown>
    </div>
  );
};

export default MovieGridItemDropdown;
