import React, { ReactNode, useState } from "react";
import Card from "./Card";
import MyBreadcrumb from "./Breadcrumb";
import Link from "next/link";
import Router from "next/router";

type ScreenShotsCardProps = {
  titlePage: string;
  movieId: number;
  children: ReactNode;
  title: string;
  backdrop_path: string;
};

const ScreenShotsCard = ({
  titlePage,
  movieId,
  children,
  title,
  backdrop_path,
}: ScreenShotsCardProps) => {
  const [pageTitle, setPageTitle] = useState(titlePage);
  const linkStyle =
    "text-xl w-fit text-gray-500 hover:text-white font-semibold underline ease-in-out duration-500";

  const ActiveLinkStyle = "text-xl w-fit text-white font-bold cursor-default";
  const arrowLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-14 h-14 hover:stroke-gray-500 mt-16"
      onClick={() => Router.push(`/movie/${movieId}`)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
  return (
    <div>
      <Card backdrop_path={backdrop_path}>
        <div className="h-fit w-full flex gap-x-5 z-10 ">
          {arrowLeft}

          <div className="flex flex-col gap-y-5 w-full ">
            <MyBreadcrumb title={title} subTitle={pageTitle} />
            <h1 className="text-white text-8xl font-extrabold ">{title}</h1>
            <h1 className="text-gray-400 text-6xl font-extrabold ">
              {pageTitle}
            </h1>
            <div className="flex">
              {children}
              <div className="flex flex-col gap-y-4 w-1/4 pl-10 ">
                <Link href={`/movie/${movieId}`} className={linkStyle}>
                  About
                </Link>
                <Link
                  href={`/movie/${movieId}/screenshots`}
                  className={
                    pageTitle === "Screenshots" ? ActiveLinkStyle : linkStyle
                  }
                  onClick={() => setPageTitle("Screenshots")}
                >
                  Screenshots
                </Link>
                <Link
                  href={`/movie/${movieId}/cast`}
                  className={pageTitle === "Cast" ? ActiveLinkStyle : linkStyle}
                  onClick={() => setPageTitle("Cast")}
                >
                  Cast
                </Link>
                <Link
                  href={`/movie/${movieId}/similarMovies`}
                  className={
                    pageTitle === "Similar Movies" ? ActiveLinkStyle : linkStyle
                  }
                  onClick={() => setPageTitle("Similar Movies")}
                >
                  Similar Movies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScreenShotsCard;
