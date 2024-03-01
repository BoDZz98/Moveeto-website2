import Link from "next/link";
import React from "react";

type ChildLinkItemProps = {
  text: string;
  icon: any;
  goTo: string;
  padding?: string;
};
const ChildLinkItem = ({ text, icon, goTo, padding }: ChildLinkItemProps) => {
  return (
    <Link href={goTo} className="group py-1">
      <div className="flex items-center gap-x-2">
        <div
          className={`bg-gray-800  ${padding} rounded group-hover:bg-gray-400`}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6  group-hover:stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg> */}
          {icon}
        </div>
        <h1>{text}</h1>
      </div>
    </Link>
  );
};

export default ChildLinkItem;
