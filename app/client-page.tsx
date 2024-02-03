"use client";
import Image from "next/image";
import RotatingGlobe from "@/components/locations/rotating-globe";
import LocationsContainer from "@/components/containers/locations-container";
import { useState } from "react";
import { SelectedCityType } from "@/types/global";

export default function ClientHomePage() {
  const [selectedCity, setSelectedCity] = useState<SelectedCityType>({
    city: "",
    countryCode: "",
    type: "default",
  });

  const [userCurrentLocation, setUserCurrentLocation] =
    useState<SelectedCityType>({
      city: "",
      countryCode: "",
      type: "currentLocation",
    });

  return (
    <>
      <div
        className={
          "text-3xl md:text-6xl lg:text-6xl font-normal lg:font-normal space-y-0.5 lg:space-y-0"
        }
      >
        <span className={"font-medium lg:font-normal"}>
          create your virtual{" "}
        </span>
        <div className={"block lg:inline"}>
          <Image
            src={"/robot.webp"}
            alt={"robot telemoji"}
            className={"-mt-2 inline w-10 h-10 md:w-16 md:h-16"}
            width="70"
            height="70"
            priority={true}
          />{" "}
          ai-generated <br className={"hidden lg:inline"} /> &
        </div>{" "}
        <div
          className={
            "h-8 w-8 md:h-14 md:w-14 lg:w-20 lg:h-20 scale-[0.2] md:scale-[0.26] lg:scale-[0.275] -translate-y-2 md:-translate-y-3 lg:translate-y-0.5 -translate-x-5 inline-block"
          }
        >
          <RotatingGlobe
            selectedCity={selectedCity}
            userCurrentLocation={userCurrentLocation}
          />
        </div>{" "}
        location-based{" "}
        <span className={"inline lg:hidden"}>
          <br />
        </span>
        <Image
          src={"/burningheart.webp"}
          alt={"burning heart telemoji"}
          width="67"
          height="67"
          priority={true}
          className={
            "-mt-2 -mx-1.5 lg:-mx-2.5 inline w-11 h-11 md:w-20 md:h-20"
          }
        />
        {"  "}
        <span className={"font-medium lg:font-normal"}>postcard</span>
      </div>

      <LocationsContainer
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        setUserCurrentLocation={setUserCurrentLocation}
        userCurrentLocation={userCurrentLocation}
      />
    </>
  );
}
