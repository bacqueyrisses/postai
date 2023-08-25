// @ts-nocheck
"use client";

import { useEffect } from "react";
import RotatingGlobe from "@/components/RotatingGlobe";
import UserLocation from "@/components/UserLocation";

export default function Locations({
  selectedCountry,
  setSelectedCountry,
  selectedGlobeCountry,
  setSelectedGlobeCountry,
  setUserLocation,
  userLocation,
}) {
  const handleChange = (e) => {
    const country = e.target.value;
    setSelectedGlobeCountry(country);

    // change city to country code and tu upperCase
  };

  return (
    <div className={"flex flex-col text-black gap-3 md:gap-6"}>
      <div
        className={
          "relative flex items-center self-start text-2xl md:text-4xl gap-6 md:gap-1"
        }
      >
        <div
          className={
            "h-8 w-8 md:w-20 md:h-20 scale-[0.35] md:scale-[0.4] mb-5 md:mb-1"
          }
        >
          <RotatingGlobe
            userLocation={userLocation}
            selectedCountry={selectedCountry}
            setSelectedGlobeCountry={setSelectedGlobeCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <div>popular locations</div>
      </div>
      <div
        className={
          "grid grid-cols-10 gap-3 md:gap-5 md:text-4xl text-lg font-medium md:font-normal"
        }
      >
        <UserLocation setSelectedCountry={setSelectedCountry} />
        <button
          onClick={() => setSelectedCountry("FR")}
          className={
            "col-span-4 md:col-span-3 border-2 md:border-3 border-emerald-700 text-emerald-700 rounded-full px-2.5 py-1 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          paris
        </button>
        <button
          onClick={() => setSelectedCountry("JP")}
          className={
            "col-span-3 bg-orange-400 text-white rounded-full px-2.5 py-1 md:py-4 border-2 md:border-3 border-orange-400 hover:text-orange-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          tokyo
        </button>
        <button
          onClick={() => setSelectedCountry("ZA")}
          className={
            "col-span-7 md:col-span-5 bg-yellow-400 text-white rounded-full px-2.5 py-1 md:py-4 border-2 md:border-3 border-yellow-400 hover:text-yellow-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          johannesburg
        </button>
        <button
          onClick={() => setSelectedCountry("US")}
          className={
            "col-span-6 md:col-span-5 bg-red-500 text-white rounded-full px-2.5 py-1 md:py-4 border-2 md:border-3 border-red-500 hover:text-red-500 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          washington
        </button>
        <button
          onClick={() => setSelectedCountry("IE")}
          className={
            "col-span-4 md:col-span-3 bg-blue-600 text-white rounded-full px-2.5 py-1 md:py-4 border-2 md:border-3 border-blue-600 hover:text-blue-600 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          dublin
        </button>
        <button
          onClick={() => setSelectedCountry("ES")}
          className={
            "col-span-4 md:col-span-3 border-green-600 text-green-600 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-green-600 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          madrid
        </button>
        <input
          placeholder={"other"}
          value={selectedGlobeCountry?.toLowerCase()}
          onChange={handleChange}
          className={
            "col-span-6 md:col-span-4 border-emerald-700 text-emerald-700 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 bg-transparent hover:placeholder:text-white focus:placeholder:text-transparent focus:outline-0 cursor-pointer focus:cursor-text"
          }
        ></input>
      </div>
    </div>
  );
}
