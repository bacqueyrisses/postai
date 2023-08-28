"use client";

import { useRef, useState } from "react";
import RotatingGlobe from "@/components/locations/RotatingGlobe";
import UserCurrentLocation from "@/components/locations/UserCurrentLocation";
import City from "@/components/locations/City";
import { SelectedCountryType } from "@/types/global";

export default function Locations({}) {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountryType>({
    city: "",
    countryCode: "",
  });
  const [selectedInputCountry, setSelectedInputCountry] = useState("");
  const userCurrentLocationRef = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const country = e.target.value;
    setSelectedInputCountry(country);
  };

  return (
    <div className={"flex flex-col text-black gap-3 md:gap-6"}>
      <div
        className={
          "relative justify-center md:justify-start flex items-center text-xl md:text-4xl gap-5 md:gap-3 z-0"
        }
      >
        <div
          className={"h-8 w-8 md:w-20 md:h-20 scale-[0.2] md:scale-[0.25] mb-5"}
        >
          <RotatingGlobe
            selectedCountry={selectedCountry}
            userCurrentLocationRef={userCurrentLocationRef}
          />
        </div>

        <div>popular locations</div>
      </div>
      <div
        className={
          "grid grid-cols-10 gap-3 md:gap-5 md:text-4xl text-lg font-medium md:font-normal z-10"
        }
      >
        <UserCurrentLocation
          setSelectedCountry={setSelectedCountry}
          userCurrentLocationRef={userCurrentLocationRef}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "paris", countryCode: "FR" }}
          className={
            "col-span-4 md:col-span-3 border-emerald-700 hover:bg-emerald-700"
          }
          selectedClassName={"bg-emerald-700"}
          unselectedClassName={"text-emerald-700"}
          variant={"outline"}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "tokyo", countryCode: "JP" }}
          className={"col-span-3  border-orange-400 hover:text-orange-400"}
          selectedClassName={"text-orange-400"}
          unselectedClassName={"bg-orange-400"}
          variant={"full"}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "cape town", countryCode: "ZA" }}
          className={
            "col-span-7 md:col-span-5 border-yellow-400 hover:text-yellow-400"
          }
          selectedClassName={"text-yellow-400"}
          unselectedClassName={"bg-yellow-400"}
          variant={"full"}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "washington", countryCode: "US" }}
          className={
            "col-span-6 md:col-span-5 border-red-500 hover:text-red-500"
          }
          selectedClassName={"text-red-500"}
          unselectedClassName={"bg-red-500"}
          variant={"full"}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "dublin", countryCode: "IE" }}
          className={
            "col-span-4 md:col-span-3 border-blue-600 hover:text-blue-600"
          }
          selectedClassName={"text-blue-600"}
          unselectedClassName={"bg-blue-600"}
          variant={"full"}
        />
        <City
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          country={{ city: "seoul", countryCode: "KR" }}
          className={
            "col-span-4 md:col-span-3 border-green-600 hover:bg-green-600"
          }
          selectedClassName={"bg-green-600"}
          unselectedClassName={"text-green-600"}
          variant={"outline"}
        />
        <input
          placeholder={"other"}
          type={"text"}
          value={selectedInputCountry?.toLowerCase()}
          onChange={handleChange}
          className={
            "col-span-6 md:col-span-4 border-emerald-700 text-emerald-700 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 bg-transparent hover:placeholder:text-white focus:placeholder:text-transparent focus:outline-none cursor-pointer focus:cursor-text"
          }
        ></input>
      </div>
    </div>
  );
}
