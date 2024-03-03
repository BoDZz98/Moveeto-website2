import React, { useState } from "react";

const optionsData = ["Release date", "Popularity", "Average rating"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("Relevence");
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300  bg-gray-800 hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-400 font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center "
      >
        Order by: <p className="font-bold text-white ml-2">{option}</p>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className=" z-10 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {optionsData.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setOption(item);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
