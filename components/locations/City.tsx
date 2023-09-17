import { SelectedCityType, SelectedCityPreType } from "@/types/global";
import { Dispatch } from "react";

type VariantType = "full" | "outline";

interface ICity {
  className: string;
  selectedClassName: string;
  unselectedClassName: string;
  setSelectedCity: Dispatch<SelectedCityType>;
  selectedCity: SelectedCityType;
  country: SelectedCityPreType;
  variant: VariantType;
}
export default function City({
  className,
  selectedClassName,
  unselectedClassName,
  setSelectedCity,
  country = {
    type: "default",
    city: "",
    countryCode: "",
  },
  selectedCity,
  variant,
}: ICity) {
  selectedClassName =
    variant === "full"
      ? `${className} ${selectedClassName} bg-transparent"`
      : `${className} ${selectedClassName} text-white`;

  unselectedClassName =
    variant === "full"
      ? `${className} ${unselectedClassName} text-white hover:bg-transparent`
      : `${className} ${unselectedClassName} hover:text-white`;

  return (
    <button
      onClick={() =>
        setSelectedCity({
          city: country.city,
          countryCode: country.countryCode,
          type: "default",
        })
      }
      className={`${
        selectedCity.city === country.city
          ? selectedClassName
          : unselectedClassName
      } border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 transition-colors ease-in-out duration-300`}
    >
      <div className={"relative w-fit mx-auto"}>
        {selectedCity.city === country.city &&
          selectedCity.type === "default" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 md:w-7 md:h-7 pt-0.5 md:pt-1 -left-8 -translate-y-1/2 top-1/2 absolute"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        {country.city}
      </div>
    </button>
  );
}
