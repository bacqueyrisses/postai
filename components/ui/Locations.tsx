"use client";

import { useEffect } from "react";

export default function Locations({
  selectedCountry,
  setSelectedCountry,
  selectedGlobeCountry,
}) {
  const handleChange = (e) => {
    const country = e.target.value;
    selectedGlobeCountry(country);

    // change city to country code and tu upperCase
  };

  return (
    <div className={"flex flex-col gap-8 md:gap-10 text-black"}>
      <div className={"self-start pl-2 md:pl-4 text-2xl md:text-4xl"}>
        🏝️ Popular locations
      </div>
      <div
        className={
          "grid grid-cols-10 gap-3 md:gap-5 md:text-4xl text-lg font-medium md:font-normal"
        }
      >
        <div
          className={
            "col-span-6 md:col-span-4 border-2 md:border-3 border-pink-400 text-pink-400 rounded-full px-2.5 py-2 md:py-4 hover:bg-pink-400 hover:text-white transition-colors ease-in-out cursor-pointer duration-300 inline-flex items-center justify-center gap-1 md:gap-2"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 md:w-7 md:h-7 pt-0.5 md:pt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <div>current location</div>
        </div>
        <button
          onClick={() => setSelectedCountry("FR")}
          className={
            "col-span-4 md:col-span-3 border-2 md:border-3 border-emerald-700 text-emerald-700 rounded-full px-2.5 py-2 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          paris
        </button>
        <button
          onClick={() => setSelectedCountry("JP")}
          className={
            "col-span-3 bg-orange-400 text-white rounded-full px-2.5 py-2 md:py-4 border-2 md:border-3 border-orange-400 hover:text-orange-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          tokyo
        </button>
        <button
          onClick={() => setSelectedCountry("ZA")}
          className={
            "col-span-7 md:col-span-5 bg-yellow-400 text-white rounded-full px-2.5 py-2 md:py-4 border-2 md:border-3 border-yellow-400 hover:text-yellow-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          johannesburg
        </button>
        <button
          onClick={() => setSelectedCountry("ES")}
          className={
            "col-span-6 md:col-span-5 bg-red-500 text-white rounded-full px-2.5 py-2 md:py-4 border-2 md:border-3 border-red-500 hover:text-red-500 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          washington
        </button>
        <button
          onClick={() => setSelectedCountry("IE")}
          className={
            "col-span-4 md:col-span-3 bg-blue-600 text-white rounded-full px-2.5 py-2 md:py-4 border-2 md:border-3 border-blue-600 hover:text-blue-600 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          dublin
        </button>
        <button
          onClick={() => setSelectedCountry("US")}
          className={
            "col-span-4 md:col-span-3 border-green-600 text-green-600 border-2 md:border-3 rounded-full px-2.5 py-2 md:py-4 hover:bg-green-600 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          madrid
        </button>
        <input
          placeholder={"other"}
          value={selectedGlobeCountry?.toLowerCase()}
          onChange={handleChange}
          className={
            "col-span-6 md:col-span-4 border-emerald-700 text-emerald-700 border-2 md:border-3 rounded-full px-2.5 py-2 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 bg-transparent hover:placeholder:text-white"
          }
        ></input>
      </div>
    </div>
  );
}
