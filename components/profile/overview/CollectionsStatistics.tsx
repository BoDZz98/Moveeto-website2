import { collectionObj } from "@/models/userModel";
import React from "react";

type CollectionsStatisticsProps = {
  collections: Array<collectionObj>;
};

const CollectionsStatistics = ({ collections }: CollectionsStatisticsProps) => {
  return (
    <div className="flex flex-col gap-y-10 w-1/3  px-10">
      <span className="text-8xl font-bold">
        {collections.length}
        <span className="text-4xl font-normal ml-2">Collections</span>
      </span>
      {collections.map((c) => (
        <div
          className="flex items-end gap-x-4"
          key={c._id}
          data-testid={"coll div"}
        >
          <span>{c.name}</span>
          <div className="w-3/4 border-b-2"></div>
          {collectionIcon}
          <span> {c.movies.length}</span>
        </div>
      ))}
    </div>
  );
};

export default CollectionsStatistics;

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
