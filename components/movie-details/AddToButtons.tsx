import React, { useContext } from "react";
import AddButton from "./AddButton";
import { MovieDetailsCtx } from "@/utils/movie-details-ctx";
import { addMovieHandler } from "@/utils/db-util";
import useMySession from "@/hooks/useMySession";

const AddToButtons = () => {
  // movie data from ctx ------------------------------------------
  const { id, backdrop_path, genres, title, release_date, vote_count } =
    useContext(MovieDetailsCtx).movieData;
  const movie = {
    id: id.toString(),
    title,
    backdrop_path,
    genres,
    release_date,
    vote_count,
  };
  // Getting user data from the stored session -------------------
  const { userFavMovies, userWishlistMovies, update } = useMySession();
  const movieIsFav = !!userFavMovies?.find(
    (movieOb: { title: string }) => movieOb.title === title
  );
  const movieIsWishlist = !!userWishlistMovies?.find(
    (movieOb: { title: string }) => movieOb.title === title
  );

  // -----------------------------------------------------------------------------
  const buttonsData = [
    {
      title: "Favorites",
      subTitle: "Add to",
      icon: movieIsFav ? heartIcon : favIcon,
      textStyle: "text-black",
      contStyle: `bg-white hover:bg-gray-200 ${
        movieIsFav && "border-2 border-green-500"
      }`,

      clickHandler: () => addMovieHandler(movie, update, null, "favMovies"),
    },
    {
      title: "Wishlist",
      subTitle: "Add to",
      icon: movieIsWishlist ? addedIcon : wishlistIcon,
      contStyle: movieIsWishlist
        ? "border-2 border-green-500 hover:border-green-400"
        : "border-2 border-white hover:border-gray-400",
      clickHandler: () =>
        addMovieHandler(movie, update, null, "wishlistMovies"),
    },
    {
      title: "Collection",
      subTitle: "Save to",
      icon: collectionIcon,
      textStyle: "hover:text-gray-400",
    },
  ];
  // -----------------------------------------------------------------------------
  return (
    <div className="flex gap-x-4 ">
      {buttonsData.map((item) => (
        <AddButton {...item} key={item.title} />
      ))}
    </div>
  );
};

export default AddToButtons;

const wishlistIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    className="w-10 h-10 "
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);
const addedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="rgb(14 159 110)"
    className="w-12 h-12  "
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);
const favIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    className="w-14 h-14"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
const heartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="rgb(14 159 110)"
    className="w-12 h-12"
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);

const collectionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
);
