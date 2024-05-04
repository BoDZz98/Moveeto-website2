import React, { ReactNode } from "react";

type AddButtonProps = {
  title: string;
  subTitle: string;
  icon: ReactNode;
  contStyle?: string;
  textStyle?: string;
  clickHandler: () => void;
};
const AddButton = ({
  title,
  subTitle,
  icon,
  contStyle,
  textStyle,
  clickHandler,
}: AddButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
    >
      <div className="absolute right-0 ">{icon}</div>
      <p className="text-sm text-gray-500">{subTitle}</p>
      <p className={`font-semibold ${textStyle}`}>{title}</p>
    </button>
  );
};

export default AddButton;
