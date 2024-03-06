import Image from "next/image";
import React, { useEffect } from "react";
type OneEmojiProps = {
  name: string;
  image: string;
  color: string;
  trys?: string;
};
const OneEmoji = ({ name, image, color, trys }: OneEmojiProps) => {
  useEffect(() => {}, [name]);

  return (
    <div className={`flex flex-col gap-y-10 items-center mr-10 w-28  group`}>
      <Image
        src={`/imgs/rating/${image}.png`}
        alt="Racing"
        className="w-20 h-20 opacity-75 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-125 transition ease-in-out duration-300 "
        width={100}
        height={100}
      />
      <div className="flex gap-x-2 p-2 items-center rounded-full ring-gray-500 group-hover:ring-2">
        <div className={`bg-${color} w-3 h-3 rounded-full`}></div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default OneEmoji;
