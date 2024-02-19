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
          "space-y-0.5 text-3xl font-normal md:text-6xl lg:space-y-0 lg:text-6xl lg:font-normal"
        }
      >
        <span className={"font-medium lg:font-normal"}>
          create your virtual{" "}
        </span>
        <div className={"block lg:inline"}>
          <Image
            src={"/robot.webp"}
            alt={"robot telemoji"}
            className={"-mt-2 inline h-10 w-10 md:h-16 md:w-16"}
            width="70"
            height="70"
            priority={true}
          />{" "}
          ai-generated <br className={"hidden lg:inline"} /> &
        </div>{" "}
        <div
          className={
            "inline-block h-8 w-8 -translate-x-4 -translate-y-2 scale-[0.2] md:h-14 md:w-14 md:-translate-x-5 md:-translate-y-3 md:scale-[0.26] lg:h-20 lg:w-20 lg:translate-y-0.5 lg:scale-[0.275]"
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
            "-mx-1.5 -mt-2 inline h-11 w-11 md:h-20 md:w-20 lg:-mx-2.5"
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
