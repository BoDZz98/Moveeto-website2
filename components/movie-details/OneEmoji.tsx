import Image from "next/image";
import React from "react";

const OneEmoji = ({name}) => {
  return (
    <div className="group rating2">
      <Image
        src={"/imgs/rating/2.png"}
        alt="Racing"
        className="w-20 h-20 hover:-translate-y-2 hover:scale-125 transition ease-in-out duration-300 "
        width={100}
        height={100}
      />
      <p className="group-hover:group-[.rating2]:text-red-500">mid</p>
    </div>
  );
};

export default OneEmoji;
