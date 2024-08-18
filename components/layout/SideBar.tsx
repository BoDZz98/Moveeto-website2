import Link from "next/link";
import React from "react";
import ChildLinkItem from "./ChildLinkItem";
import Image from "next/image";

const SideBar = () => {
  const linkClass =
    "w-fit text-white text-3xl font-extrabold py-5 hover:text-gray-400";
  return (
    <div className="flex flex-col w-2/12 z-10">
      <Link href="/" className={linkClass}>
        <h1>Home</h1>
      </Link>
      <Link href="/discover?time=pastMonth" className={linkClass}>
        <h1>Reviews</h1>
      </Link>
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">
        New Releases
      </h1>
      {newReleasesdData.map((item) => (
        <ChildLinkItem
          key={item.title}
          goTo={item.link}
          icon={item.svg}
          text={item.title}
          padding="p-2"
        />
      ))}
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">
        Top Rated{" "}
      </h1>
      {topData.map((item) => (
        <ChildLinkItem
          key={item.title}
          goTo={item.link}
          icon={item.svg}
          text={item.title}
          padding="p-2"
        />
      ))}
      <h1 className="w-fit text-white text-3xl font-extrabold py-4 ">Genres</h1>
      {genresData.map((item) => (
        <ChildLinkItem
          key={item.title}
          goTo={item.link}
          icon={item.svg}
          text={item.title}
        />
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
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 group-hover:fill-black"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    link: "/discover?time=Past Month",
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
    link: "/discover?time=This Weak",
  },
  {
    title: "Next Week",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 group-hover:fill-black"
      >
        <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
      </svg>
    ),
    link: "/discover?time=Next Weak",
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
        src={"/imgs/genres/shooter.jpg"}
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
        src={"/imgs/genres/racing.jpg"}
        alt="Racing"
        className="w-9 h-9"
        width={100}
        height={100}
      />
    ),
    link: "/",
  },
  {
    title: "Animation",
    svg: (
      <Image
        src={"/imgs/genres/animation.jpeg"}
        alt="Racing"
        className="w-9 h-9"
        width={100}
        height={100}
      />
    ),
    link: "/",
  },{
    title: "Comedy",
    svg: (
      <Image
        src={"/imgs/genres/comedy.jpg"}
        alt="Racing"
        className="w-9 h-9"
        width={100}
        height={100}
      />
    ),
    link: "/",
  },
];
