import Link from "next/link";
import React from "react";

type MyBreadcrumbProps = {
  title: string;
  subTitle?: string;
};

const MyBreadcrumb = ({ title, subTitle }: MyBreadcrumbProps) => {
  return (
    <nav className="flex " aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            {arrowIcon}
            <Link
              href="#"
              className="ms-1 text-sm font-medium text-gray-500 hover:text-white md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              Movies
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            {arrowIcon}
            <span className="ms-1 text-sm font-medium text-gray-400 md:ms-2 dark:text-gray-400">
              {title}
            </span>
          </div>
        </li>
        {subTitle && (
          <li aria-current="page">
            <div className="flex items-center">
              {arrowIcon}
              <span className="ms-1 text-sm font-medium text-gray-400 md:ms-2 dark:text-gray-400">
                {subTitle}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default MyBreadcrumb;

const arrowIcon = (
  <svg
    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 9 4-4-4-4"
    />
  </svg>
);
