import * as React from "react";
import { ChangeEvent, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isMobile } from "react-device-detect";

import { SelectedCityType } from "@/types/global";
import { LoadingCircle } from "@/components/icons";

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
  const [cityLoading, setCityLoading] = useState<string | null>(null);

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
      }, 100);
    };
  }, []);

  async function getCountryCode(placeId: string) {
    const response = await fetch(`/api/countrycode?placeId=${placeId}`);

    if (!response.ok) throw new Error("Failed to fetch data");

    return response.json();
  }

  const handleClick = async (city: City) => {
    setCityLoading(city.description.toLowerCase());
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
    setTimeout(() => {
      setCityLoading(null);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={
            "col-span-6 cursor-pointer rounded-full border-2 border-emerald-700 bg-transparent px-2.5 py-1 text-center text-emerald-700 transition-colors duration-300 ease-in-out placeholder:text-emerald-700 hover:bg-emerald-700 hover:text-white hover:placeholder:text-white focus:cursor-text focus:outline-none focus:placeholder:text-transparent md:col-span-4 md:border-3 md:py-4 lg:col-span-5"
          }
        >
          {(selectedCity.type === "userSelection" && (
            <div className={"relative mx-auto w-fit"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute -left-5 top-1/2 h-4 w-4 -translate-y-1/2 pt-0.5 md:-left-8  md:h-7 md:w-7 md:pt-1"
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
      <DialogContent className="top-[40%] flex h-[215px] max-w-4xl flex-col items-center justify-start space-y-1 border-3 border-none sm:h-[230px] sm:rounded-2xl">
        <div
          className={
            "flex basis-2/5 flex-col items-center justify-center gap-4"
          }
        >
          <DialogHeader className={"inline-flex items-center justify-center"}>
            <DialogTitle className={"text-center text-xl font-medium"}>
              choose your city
            </DialogTitle>
          </DialogHeader>
          <input
            type="text"
            onChange={debouncedHandleChange}
            aria-label="Cities"
            className={
              "inline-flex h-fit w-fit items-center justify-center rounded-full border-2 border-black text-center text-lg outline-none placeholder:text-center focus:border-emerald-700 focus:ring-0 "
            }
          />
        </div>
        <div className={"basis-3/5 text-xs sm:text-lg"}>
          {cities.length === 0 && (
            <div
              className={
                "flex h-full items-center justify-center gap-1 text-base"
              }
            >
              Search for any city in the world
              <Image
                width={17}
                height={17}
                src={
                  "https://em-content.zobj.net/source/apple/354/globe-showing-americas_1f30e.png"
                }
                alt={"clipboard emoji"}
                className={"transition-all hover:scale-105"}
              />
            </div>
          )}
          {cities && cities.length > 0 && (
            <div className={"flex items-center justify-center gap-4"}>
              {cities.slice(0, isMobile ? 2 : 3).map((city, index: number) => (
                <button
                  className={`${getAutocompleteClassNames(
                    index,
                  )} min-h-full rounded-full border-2 px-7 py-2 transition-colors duration-300 ease-in-out`}
                  key={city.place_id}
                  onClick={() => handleClick(city)}
                >
                  {cityLoading === city.description.toLowerCase() ? (
                    <div
                      className={
                        "relative flex w-full items-center justify-center"
                      }
                    >
                      <div className="invisible">
                        {city.description.toLowerCase()}
                      </div>
                      <LoadingCircle className="absolute h-4 w-4 text-inherit md:h-5 md:w-5" />
                    </div>
                  ) : (
                    city.description.toLowerCase()
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
