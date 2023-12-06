import * as React from "react";
import { ChangeEvent, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isMobile } from "react-device-detect";

import { SelectedCityType } from "@/types/global";

type City = {
  place_id: string;
  structured_formatting: {
    main_text: string;
  };
  description: string;
};

const getAutocompleteClassNames = (index: number) => {
  switch (index) {
    case 0:
      return "bg-yellow-400 border-yellow-400 text-white hover:bg-transparent hover:text-yellow-400";
    case 1:
      return "bg-orange-400 border-orange-400 text-white hover:bg-transparent hover:text-orange-400";
    case 2:
      return "bg-emerald-500 border-emerald-500 text-white hover:bg-transparent hover:text-emerald-500";
    default:
      return "bg-blue-600";
  }
};

interface ICityAutocomplete {
  setSelectedCity: React.Dispatch<SelectedCityType>;
  selectedCity: SelectedCityType;
}
export default function CityAutocomplete({
  setSelectedCity,
  selectedCity,
}: ICityAutocomplete) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedInputCity, setSelectedInputCity] = useState<string | null>(
    null,
  );

  const [isOpen, setIsOpen] = useState(false);

  const { data: cities = [], isLoading: isCityLoading } = useSWR<
    City[] | undefined
  >(() => (searchTerm ? `/api/cities?city=${searchTerm}` : null), fetcher);

  const debouncedHandleChange = useMemo(() => {
    let debounceTimer: NodeJS.Timeout;
    return function (event: ChangeEvent<HTMLInputElement>) {
      clearTimeout(debounceTimer);
      const newSearchTerm = event.target.value;
      debounceTimer = setTimeout(() => {
        setSearchTerm(newSearchTerm);
      }, 300);
    };
  }, []);

  async function getCountryCode(placeId: string) {
    const response = await fetch(`/api/countrycode?placeId=${placeId}`);

    if (!response.ok) throw new Error("Failed to fetch data");

    return response.json();
  }

  const handleSubmit = async (city: City) => {
    const data = await getCountryCode(city.place_id);

    const currentInputCity = city.structured_formatting.main_text.toLowerCase();
    const currentCity = city.description.toLowerCase();

    const currentCountryCode = data?.results[0]?.address_components.find(
      (v: { short_name: string; long_name: string; types: string[] }) =>
        v.types.includes("country"),
    )?.short_name;

    setSelectedInputCity(currentInputCity);
    setSelectedCity({
      city: currentCity,
      countryCode: currentCountryCode,
      type: "userSelection",
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={
            "col-span-6 md:col-span-5 border-emerald-700 text-emerald-700 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 bg-transparent hover:placeholder:text-white focus:placeholder:text-transparent focus:outline-none cursor-pointer focus:cursor-text"
          }
        >
          {(selectedCity.type === "userSelection" && (
            <div className={"relative w-fit mx-auto"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-7 md:h-7 pt-0.5 md:pt-1 md:-left-8 -left-5  -translate-y-1/2 top-1/2 absolute"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              {selectedInputCity}
            </div>
          )) ||
            "select a city"}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:rounded-2xl max-w-4xl top-[40%] border-3 border-none flex flex-col items-center justify-start h-[215px] sm:h-[230px] space-y-1">
        <div
          className={
            "flex justify-center items-center flex-col gap-4 basis-2/5"
          }
        >
          <DialogHeader className={"inline-flex justify-center items-center"}>
            <DialogTitle className={"text-center text-xl font-medium"}>
              choose your city
            </DialogTitle>
          </DialogHeader>
          <input
            type="text"
            onChange={debouncedHandleChange}
            aria-label="Cities"
            className={
              "text-lg placeholder:text-center text-center w-fit h-fit inline-flex justify-center items-center rounded-full border-2 border-black focus:ring-0 outline-none focus:border-emerald-700 "
            }
          />
        </div>
        <div className={"sm:text-lg text-xs basis-3/5"}>
          {cities.length === 0 && (
            <div
              className={"text-base flex justify-center items-center h-full"}
            >
              Search for any city in the world 🌎
            </div>
          )}
          {cities && cities.length > 0 && (
            <div className={"flex gap-4 justify-center items-center "}>
              {cities.slice(0, isMobile ? 2 : 3).map((city, index: number) => (
                <button
                  className={`${getAutocompleteClassNames(
                    index,
                  )} rounded-full px-7 py-2 border-2 transition-colors ease-in-out duration-300 min-h-full`}
                  key={city.place_id}
                  onClick={() => handleSubmit(city)}
                >
                  {city.description.toLowerCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
