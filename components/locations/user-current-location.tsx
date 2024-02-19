import { Dispatch, useEffect } from "react";
import { SelectedCityType } from "@/types/global";

interface IUserLocation {
  setSelectedCity: Dispatch<SelectedCityType>;
  selectedCity: SelectedCityType;
  setUserCurrentLocation: Dispatch<SelectedCityType>;
  userCurrentLocation: SelectedCityType;
}

export default function UserCurrentLocation({
  userCurrentLocation,
  setUserCurrentLocation,
  setSelectedCity,
  selectedCity,
}: IUserLocation) {
  useEffect(() => {
    if (
      !("geolocation" in navigator) ||
      localStorage.getItem("hasLocationPermission") === "false" ||
      !localStorage.getItem("hasLocationPermission")
    )
      return localStorage.setItem("hasLocationPermission", "false");

    getUserCurrentLocation();
  }, []);

  const handleClick = async () => {
    if ("geolocation" in navigator && !userCurrentLocation.city)
      getUserCurrentLocation();
    setSelectedCity({
      city: userCurrentLocation.city.toLowerCase(),
      countryCode: userCurrentLocation.countryCode,
      type: "currentLocation",
    });
  };

  function getUserCurrentLocation() {
    // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          localStorage.setItem("hasLocationPermission", "true");
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
          );
          const data = await res.json();

          const cityName: string = data?.results[0]?.address_components.find(
            (v: { short_name: string; long_name: string; types: string[] }) =>
              v.types.includes("locality"),
          )?.long_name;
          const countryId: string = data?.results[0]?.address_components.find(
            (v: { short_name: string; long_name: string; types: string[] }) =>
              v.types.includes("country"),
          )?.short_name;

          if (cityName && countryId) {
            setUserCurrentLocation({
              city: cityName.toLowerCase(),
              countryCode: countryId,
              type: "currentLocation",
            });
          } else {
            console.error(
              "Error: City name or countrycode code not found in location data.",
            );
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        localStorage.setItem("hasLocationPermission", "false");
      },
    );
  }

  return (
    <button
      onClick={handleClick}
      className={
        "col-span-6 inline-flex cursor-pointer items-center justify-center gap-1 rounded-full border-2 border-pink-400 px-2.5 py-1 text-pink-400 transition-colors duration-300 ease-in-out hover:bg-pink-400 hover:text-white md:col-span-4 md:gap-2 md:border-3 md:py-4"
      }
    >
      <div className={"relative mx-auto w-fit"}>
        {selectedCity.countryCode &&
        selectedCity.city === userCurrentLocation.city ? (
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute -left-5 top-1/2 h-4 w-4 -translate-y-1/2  md:-left-8 md:h-7 md:w-7"
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
        )}

        {userCurrentLocation.city?.toLowerCase() || "my location"}
      </div>
    </button>
  );
}
