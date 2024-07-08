import { MovieObj } from "@/pages/movie/[movieId]";
import React, { useRef, useState } from "react";
import { searchMovies } from "../../utils/api-utils";
import SearchItem from "./SearchItem";

const SearchBar = () => {
  const [results, setResults] = useState<Array<MovieObj>>([]);
  const lastChange = useRef<number | null>();

  async function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // Adding debouncing, meaning it will only search if the user stops writing for 500ms
    if (lastChange.current) clearTimeout(lastChange.current);
    // The setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.
    lastChange.current = window.setTimeout(async () => {
      if (e.target.value.length > 3) {
        const data: Array<MovieObj> = await searchMovies(e.target.value);
        setResults(data);
      }
      if (e.target.value.length === 0) {
        setResults([]);
      }
    }, 500);
  }
  return (
    <div className="relative group rounded-full ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none ">
        {searchIcon}
      </div>

      <input
        type="search"
        placeholder="Search Movies"
        onChange={searchHandler}
        className="rounded-full opacity-60 w-full  py-5 ps-12 text-black text-lg placeholder-gray-100  bg-gray-500 hover:placeholder-black hover:bg-white  focus:bg-white focus:placeholder-black transition-all ease-in-out duration-300 "
      />
      {results.length !== 0 && (
        <div className="absolute top-20 p-6 bg-black w-full rounded-3xl z-50 ">
          {results.map((m) => (
            <SearchItem movie={m} key={m.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

const searchIcon = (
  <svg
    className="w-5 h-5 text-gray-200 z-10 group-hover:text-black group-focus-within:text-black"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>
);
