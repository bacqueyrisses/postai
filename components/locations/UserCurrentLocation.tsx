import { useEffect, useState } from "react";
import { SelectedCountryType } from "@/types/global";

interface IUserLocation {
  setSelectedCountry: React.Dispatch<React.SetStateAction<SelectedCountryType>>;
  userCurrentLocationRef: React.MutableRefObject<string | null>;
}

export default function UserCurrentLocation({
  setSelectedCountry,
  userCurrentLocationRef,
}: IUserLocation) {
  const [userCurrentLocation, setUserCurrentLocation] = useState("");

  const getUserCurrentLocation = (): void => {
    // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        localStorage.setItem("hasLocationPermission", "true");
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
        );
        const data = await res.json();

        const cityName: string = data?.results[0]?.address_components.find(
          (v: { short_name: string; long_name: string; types: string[] }) =>
            v.types.includes("locality"),
        ).long_name;
        const countryId: string = data?.results[0]?.address_components.find(
          (v: { short_name: string; long_name: string; types: string[] }) =>
            v.types.includes("country"),
        ).short_name;

        setUserCurrentLocation(cityName);
        setSelectedCountry({ city: cityName, countryCode: countryId });
        userCurrentLocationRef.current = countryId;
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    });
  };

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
    if ("geolocation" in navigator) getUserCurrentLocation();
  };

  return (
    <button
      onClick={handleClick}
      className={
        "col-span-6 md:col-span-4 border-2 md:border-3 border-pink-400 text-pink-400 rounded-full px-2.5 py-1 md:py-4 hover:bg-pink-400 hover:text-white transition-colors ease-in-out cursor-pointer duration-300 inline-flex items-center justify-center gap-1 md:gap-2"
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
      {userCurrentLocation?.toLowerCase() || "current location"}
    </button>
  );
}
