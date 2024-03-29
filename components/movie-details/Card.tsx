import { baseImageURL } from "@/utils/api-utils";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  backdrop_path: string;
};

const Card = ({ children, backdrop_path }: CardProps) => {
  const backgroundStyle = {
    backgroundImage: `url(${baseImageURL}${backdrop_path})`,
  };
  return (
    <div className="pl-32 pr-48 w-full h-fit flex flex-col">
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
