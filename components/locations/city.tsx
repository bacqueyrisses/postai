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
  inputCity: string;
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
  inputCity,
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
      } rounded-full border-2 px-2.5 py-1 transition-colors duration-300 ease-in-out md:border-3 md:py-4`}
    >
      <div className={"relative mx-auto w-fit"}>
        {selectedCity.city === country.city &&
          selectedCity.type === "default" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute -left-5 top-1/2 h-4 w-4 -translate-y-1/2 pt-0.5 md:-left-8 md:h-7 md:w-7 md:pt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        {inputCity}
      </div>
    </button>
  );
}
