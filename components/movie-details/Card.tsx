import { baseImageURL } from "@/utils/api-utils";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  backdrop_path: string;
  noLeftPadding?: boolean;
};

const Card = ({ children, backdrop_path, noLeftPadding }: CardProps) => {
  const backgroundStyle = {
    backgroundImage: `url(${baseImageURL}${backdrop_path})`,
  };
  return (
    <div
      className={`${
        noLeftPadding ? "" : "pl-32 2xl:pr-48"
      }  w-full min-h-screen flex flex-col `}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 "
        style={backgroundStyle}
      ></div>
      <div className="absolute  inset-0 top-1/2  bg-gradient-to-b from-transparent to-gray-900"></div>
      {children}
    </div>
  );
};

export default Card;
