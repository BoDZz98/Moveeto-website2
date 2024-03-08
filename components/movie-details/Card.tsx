import { baseImageURL } from "@/utils/api-utils";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  backdrop_path: string;
};
const Card = ({ children, backdrop_path }: CardProps) => {
  return (
    <div className="pl-32 pr-48 w-full h-fit flex ">
      <div
        className="absolute inset-0 bg-cover bg-center  opacity-20 "
        style={{
          backgroundImage: `url(${baseImageURL}${backdrop_path})`,
        }}
      ></div>
      <div className="absolute  inset-0 top-1/2  bg-gradient-to-b from-transparent to-gray-900"></div>
      {children}
    </div>
  );
};

export default Card;
