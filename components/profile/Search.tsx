import React from "react";

type searchProps = {
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
const SearchComponent = ({ changeInputHandler, value }: searchProps) => {
  return (
    <div className="flex items-center p-2 border-b-4 border-gray-800 hover:border-gray-500 group ">
      {searchIcon}
      <input
        className="bg-transparent text-2xl border-none focus:ring-0 focus:border-none w-full group-hover:placeholder-gray-300"
        type="text"
        placeholder="Search my favorite"
        value={value}
        onChange={changeInputHandler}
      />
    </div>
  );
};

export default SearchComponent;

const searchIcon = (
  <svg
    className="w-8 h-8 text-gray-600 group-hover:text-gray-500"
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
