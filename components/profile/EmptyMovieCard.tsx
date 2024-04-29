import React from "react";

const EmptyMovieCard = () => {
  return (
    <div className="rounded-lg p-8 h-56 w-3/4 text-xl font-semibold flex flex-col justify-between bg-gray-700 text-gray-400 hover:bg-white hover:text-black hover:cursor-pointer transition ease-in-out delay-150">
      <p className="text-4xl font-bold">+</p>
      <p>Add Movie</p>
    </div>
  );
};

export default EmptyMovieCard;