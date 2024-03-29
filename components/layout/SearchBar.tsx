import React from "react";

const SearchBar = () => {
  return (
    <div className="relative ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none ">
        <svg
          className="w-4 h-4 text-gray-200 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        className=" rounded-full w-full  py-5 ps-12  text-white placeholder-gray-100  bg-gray-500 focus:ring-red-500 focus:border-red-500 "
        placeholder="Search Mockups, Logos..."
        required
      />
      <button
        type="submit"
        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
