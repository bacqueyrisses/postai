// @ts-nocheck
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserLocation({ setSelectedCountry }) {
  const [userLocation, setUserLocation] = useState(null);
  const handleClick = async () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            coords.latitude + "," + coords.longitude
          }&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
        );
        const data = await res.json();
        setUserLocation(data?.results[0]?.address_components[2]?.long_name);
        setSelectedCountry(data?.results[0]?.address_components[5]?.short_name);
      });
    }
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

      <button onClick={handleClick}>
        {userLocation?.toLowerCase() ?? "current location"}
      </button>
    </button>
  );
}
