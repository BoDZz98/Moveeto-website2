import React from "react";

type MyModalCardProps = {
  modalTitle: string;
  closeHandler: () => void;
  children: React.ReactNode;
};
const MyModalCard = ({
  modalTitle,
  closeHandler,
  children,
}: MyModalCardProps) => {
  return (
    <div
      // onClick={closeHandler}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className=" z-50 fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
    >
      <div className="container mx-auto lg:px-56   overflow-y-auto">
        <div className=" px-8 py-8 overflow-hidden relative bg-gray-800 rounded-2xl  ">
          <div className="flex justify-end pr-4 pt-2 ">
            <button
              className="text-5xl font-bold leading-none text-white hover:text-gray-400"
              onClick={closeHandler}
            >
              &times;
            </button>
          </div>

          <p className="font-bold text-6xl p-7  text-white flex justify-center self-center">
            {modalTitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyModalCard;
