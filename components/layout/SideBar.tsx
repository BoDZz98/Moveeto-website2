import Link from "next/link";
import React from "react";
import ChildLinkItem from "./ChildLinkItem";
import Image from "next/image";

const SideBar = () => {
  const linkClass =
    "w-fit text-white text-3xl font-extrabold py-5 hover:text-gray-400";
  return (
    <div className="flex flex-col  w-2/12">
      <Link href="/" className={linkClass}>
        <h1>Home</h1>
      </Link>
      <Link href="/" className={linkClass}>
        <h1>Reviews</h1>
      </Link>
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">
        New Releases
      </h1>
      {newReleasesdData.map((item) => (
        <ChildLinkItem
          goTo={item.link}
          icon={item.svg}
          text={item.title}
          padding="p-2"
        />
      ))}
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">Top</h1>
      {topData.map((item) => (
        <ChildLinkItem
          goTo={item.link}
          icon={item.svg}
          text={item.title}
          padding="p-2"
        />
      ))}
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">Genres</h1>
      {genresData.map((item) => (
        <ChildLinkItem goTo={item.link} icon={item.svg} text={item.title} />
      ))}
    </div>
  );
};

export default SideBar;

const newReleasesdData = [
  {
    title: "Last 30 Days",
    svg: (
      <svg
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
      </svg>
    ),
    link: "/",
  },
  {
    title: "This Week",
    svg: (
      <svg
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
      </svg>
    ),
    link: "/",
  },
];

const topData = [
  {
    title: "Best of the year",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
        />
      </svg>
    ),
    link: "/",
  },
  {
    title: "All time top 250",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
        />
      </svg>
    ),
    link: "/",
  },
];

const genresData = [
  {
    title: "Action",
    svg: (
      <Image
        src={"/imgs/shooter.jpg"}
        alt="Racing"
        className="w-9 h-9"
        width={100}
        height={100}
      />
    ),
    link: "/",
  },
  {
    title: "Racing",
    svg: (
      <Image
        src={"/imgs/racing.jpg"}
        alt="Racing"
        className="w-9 h-9"
        width={100}
        height={100}
      />
    ),
    link: "/",
  },
];
