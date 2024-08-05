import { baseImageURL } from "@/utils/api-utils";
import Image from "next/image";
import React from "react";

type ActorImageProps = {
  actor: { profile_path: string; character: string; name: string };
  imgSize?: string;
};
const ActorImage = ({ actor, imgSize }: ActorImageProps) => {
  return (
    <div className=" flex flex-col  w-full rounded-lg bg-gray-800 ">
      <Image
        src={baseImageURL + actor.profile_path}
        className={`rounded-lg w-full object-cover ${imgSize} `}
        alt={'actorImg '+actor.name}
        width={200}
        height={200}
      />
      <div className=" p-4">
        <p className="font-semibold text-lg">{actor.character}</p>
        <p className=" text-lg text-gray-500">{actor.name}</p>
      </div>
    </div>
  );
};

export default ActorImage;
