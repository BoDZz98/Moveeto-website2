import Image from "next/image";
import React, { useState } from "react";
import ManageCollection from "./collections/ManageCollection";

type EmptyPageProps = {
  pageTitle: string;
  contStyle?: string;
  collectionPage?: boolean;
};

const EmptyPage = ({
  pageTitle,
  contStyle,
  collectionPage,
}: EmptyPageProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const title = collectionPage ? "No collections yet" : pageTitle;
  
  return (
    <div
      className={`flex flex-col gap-y-5 items-center justify-center ${contStyle}`}
      data-testid="empty page div"
    >
      <Image
        src={`/imgs/sleeping.png`}
        alt="sleeping"
        className="w-32 h-32  "
        width={50}
        height={50}
      />
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      {collectionPage && (
        <button
          className="bg-white text-black text-xl font-semibold rounded py-4 xl:px-16 px-8 hover:bg-gray-400 transition ease-in-out delay-100"
          onClick={() => {
            setModalIsVisible(true);
          }}
        >
          Start a new collection
        </button>
      )}
      {modalIsVisible && (
        <ManageCollection
          onClose={() => setModalIsVisible(false)}
          title="Start a new collection"
        />
      )}
    </div>
  );
};

export default EmptyPage;
