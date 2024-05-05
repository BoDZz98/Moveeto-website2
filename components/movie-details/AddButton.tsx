import { Dropdown } from "flowbite-react";
import React, { ReactNode } from "react";

type AddButtonProps = {
  title: string;
  subTitle: string;
  icon: ReactNode;
  contStyle?: string;
  textStyle?: string;
  userCollections: Array<{ name: string }>;
  clickHandler: () => void;
};
const AddButton = ({
  title,
  subTitle,
  icon,
  contStyle,
  textStyle,
  userCollections,
  clickHandler,
}: AddButtonProps) => {
  // console.log('user collections', userCollections);

  return (
    <>
      {title !== "Collection" ? (
        <button
          onClick={clickHandler}
          className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
        >
          <div className="absolute right-0 ">{icon}</div>
          <p className="text-sm text-gray-500">{subTitle}</p>
          <p className={`font-semibold ${textStyle}`}>{title}</p>
        </button>
      ) : (
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <button
              className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
            >
              <div className="absolute right-0 ">{icon}</div>
              <p className="text-sm text-gray-500">{subTitle}</p>
              <p className={`font-semibold ${textStyle}`}>{title}</p>
            </button>
          )}
        >
          {userCollections.length !== 0 ? (
            userCollections.map((collection) => (
              <Dropdown.Item>{collection.name}</Dropdown.Item>
            ))
          ) : (
            <p>No collections</p>
          )}
        </Dropdown>
      )}
    </>
  );
};

export default AddButton;

// <button
//         onClick={() => {
//           title === "Collection" && setIsOpen(!isOpen);
//           clickHandler();
//         }}
//         className={`relative flex flex-col justify-center rounded w-40 px-4 py-2  ${contStyle}`}
//       >
//         <div className="absolute right-0 ">{icon}</div>
//         <p className="text-sm text-gray-500">{subTitle}</p>
//         <p className={`font-semibold ${textStyle}`}>{title}</p>
//         {isOpen && (
//           <div className=" z-10 absolute top-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//               {optionsData.map((item) => (
//                 <li
//                   key={item}
//                   onClick={() => {
//                     setIsOpen(false);
//                   }}
//                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </button>
