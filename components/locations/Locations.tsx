"use client";

import UserCurrentLocation from "@/components/locations/UserCurrentLocation";
import City from "@/components/locations/City";
import CityAutocomplete from "@/components/locations/CityAutocomplete";
import { SelectedCountryType } from "@/types/global";
import Link from "next/link";

interface ILocations {
  selectedCountry: SelectedCountryType;
  setSelectedCountry: React.Dispatch<SelectedCountryType>;
  selectedInputCountry: string;
  setSelectedInputCountry: React.Dispatch<string>;
  userCurrentLocation: SelectedCountryType;
  setUserCurrentLocation: React.Dispatch<SelectedCountryType>;
}
export default function Locations({
  selectedCountry,
  setSelectedCountry,
  selectedInputCountry,
  setSelectedInputCountry,
  userCurrentLocation,
  setUserCurrentLocation,
}: ILocations) {
  return (
    <div className={"flex flex-col text-black gap-3 md:gap-6"}>
      <div
        className={
          "grid grid-cols-10 gap-3 md:gap-5 md:text-4xl text-lg font-medium md:font-normal z-10"
        }
      >
        <UserCurrentLocation
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          setUserCurrentLocation={setUserCurrentLocation}
          userCurrentLocation={userCurrentLocation}
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
            "col-span-5 md:col-span-5 border-red-500 hover:text-red-500"
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
            "col-span-5 md:col-span-3 border-blue-600 hover:text-blue-600"
          }
          selectedClassName={"text-blue-600"}
          unselectedClassName={"bg-blue-600"}
          variant={"full"}
        />
        <CityAutocomplete
          selectedInputCountry={selectedInputCountry}
          setSelectedInputCountry={setSelectedInputCountry}
        />
        <Link
          href={{
            pathname: "/generation",
            query: { city: selectedCountry.city },
          }}
          className={`${
            selectedCountry.city && "animate-pulse pulse-slow"
          } col-span-4 md:col-span-2 border-emerald-500 bg-emerald-500 text-white border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-transparent hover:text-emerald-500 transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 hover:placeholder:text-white focus:placeholder:text-transparent focus:outline-none cursor-pointer focus:cursor-text shadow-[0px_4px_19px_6px_rgba(18,185,129,0.45)]`}
        >
          generate!
        </Link>
      </div>
    </div>
  );
}
