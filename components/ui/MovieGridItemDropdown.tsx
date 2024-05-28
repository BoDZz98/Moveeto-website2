import { Dropdown } from "flowbite-react";
import React, { useState } from "react";
import { optionsIcon } from "./MovieGridItem";
import { useSession } from "next-auth/react";
import { collectionObj, userMovieObj } from "@/models/userModel";
import { checkIcon } from "../movie-details/AddButton";
import { useRouter } from "next/router";

type MovieGridItemDropdownProps = {
  movie: userMovieObj;
};
const MovieGridItemDropdown = ({ movie }: MovieGridItemDropdownProps) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  async function addMovieHandler(collectionName: string) {
    const res = await fetch("/api/addMovies", {
      method: "POST",
      body: JSON.stringify({
        collectionName,
        movie: movie,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      update();
    }
  }
  //-----------------------------------------------------
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

        {session && session?.user?.userCollections.length !== 0 ? (
          session?.user?.userCollections.map((c: collectionObj) => (
            <Dropdown.Item key={c._id} onClick={() => addMovieHandler(c.name)}>
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
