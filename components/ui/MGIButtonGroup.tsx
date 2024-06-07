import { userMovieObj } from "@/models/userModel";
import MovieGridItemDropdown from "./MovieGridItemDropdown";
import { addMovieHandler } from "@/utils/db-util";
import useMySession from "@/hooks/useMySession";

type MGIButtonGroupProps = {
  movie: userMovieObj;
};

const MGIButtonGroup = ({ movie }: MGIButtonGroupProps) => {
  const { userFavMovies, userWishlistMovies, update } = useMySession();
  const movieIsFav = !!userFavMovies?.find(
    (movieOb: { title: string }) => movieOb.title === movie.title
  );
  const movieIsWishlist = !!userWishlistMovies?.find(
    (movieOb: { title: string }) => movieOb.title === movie.title
  );
  //-------------------------------------------------------------------------
  const contClassName =
    "flex items-center gap-x-1 rounded bg-gray-600 w-fit group cont hover:cursor-pointer transition ease-in-out duration-300";

  return (
    <div className="flex gap-x-3">
      <div
        onClick={addMovieHandler.bind(null, movie, update, null, "favMovies")}
        className={`${contClassName} p-2 ${
          movieIsFav ? "bg-green-400 hover:bg-green-500" : "hover:bg-white "
        }`}
      >
        {!movieIsFav && plusIcon}
        <p className=" group-hover:group-[.cont]:text-black font-semibold">
          {movieIsFav ? heartIcon : movie.vote_count}
        </p>
      </div>
      <div
        onClick={addMovieHandler.bind(
          null,
          movie,
          update,
          null,
          "wishlistMovies"
        )}
        className={`${contClassName} px-4 py-2 hidden group-hover:flex ${
          movieIsWishlist
            ? "bg-green-400 hover:bg-green-500 "
            : "hover:bg-white "
        }`}
      >
        {giftIcon}
      </div>
      <div className={`hidden group-hover:flex `}>
        <MovieGridItemDropdown movie={movie} />
      </div>
    </div>
  );
};

export default MGIButtonGroup;

const heartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-7 h-7 "
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke="currentColor"
    className="w-5 h-5 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
export const giftIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);
export const optionsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-8 h-8 group-hover:group-[.cont]:stroke-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
