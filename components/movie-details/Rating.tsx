import Image from "next/image";
import React from "react";

const data = [
  { title: "Exceptional", subTitle: "46 Rating" },
  { title: "# 190" },
  { title: "# 1" },
];
const Rating = () => {
  return (
    <div className="flex flex-col  gap-y-8">
      <div className="flex ">
        {data.map((item, index) => (
          <>
            <div className={`flex flex-col `} id={item.title}>
              <p className="font-bold text-3xl">{item.title}</p>
              <p className="underline text-gray-500">{item?.subTitle}</p>
            </div>
            {index + 1 !== data.length && <div className="border mx-16"></div>}
          </>
        ))}
      </div>
      <div className="flex">
        <div className="group rating1">
          <Image
            src={"/imgs/rating/1.png"}
            alt="Racing"
            className="w-20 h-20 hover:-translate-y-2 hover:scale-125 transition ease-in-out duration-300 "
            width={100}
            height={100}
          />
          <p className="group-hover:group-[.rating1]:text-red-500">Bad</p>
        </div>
       
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default Rating;

/* <input  name="{{$name}}" id="{{$id}}" value="{{$value}}" className="hidden" >
    <label for="{{$id}}" class=" group transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
    @click="{{$isActive}} = true" >
        <img src="/imgs/{{$img}}.png" class="w-10 h-10" :class="{{$isActive}} ? 'opacity-100 -translate-y-1 scale-110 transition ease-in-out duration-300' : ' opacity-50 hover:opacity-100' " >
        <p class="opacity-0 group-hover:opacity-100 text-white text-xs">{{$text}}</p>
    </label> */
