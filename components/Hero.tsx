"use client";
import Image from "next/image";
import RotatingGlobe from "@/components/locations/RotatingGlobe";
import LocationsContainer from "@/components/locations/LocationsContainer";
import { useState } from "react";
import { SelectedCountryType } from "@/types/global";

export default function Hero() {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountryType>({
    city: "",
    countryCode: "",
  });

  const [userCurrentLocation, setUserCurrentLocation] =
    useState<SelectedCountryType>({
      city: "",
      countryCode: "",
    });
  return (
    <>
      <div className={"text-3xl md:text-6xl font-normal md:font-normal"}>
        <span className={"font-medium md:font-normal"}>
          Create your virtual
        </span>
        <div className={"block md:inline"}>
          {" "}
          <Image
            src={"/robot.webp"}
            alt={"robot telemoji"}
            className={"-mt-2 inline w-10 h-10 md:w-16 md:h-16"}
            width="70"
            height="70"
          />{" "}
          ai-generated <br className={"hidden md:inline"} /> &
        </div>{" "}
        <div
          className={
            "h-8 w-8 md:w-20 md:h-20 scale-[0.2] md:scale-[0.275] -translate-y-2 md:translate-y-0.5 -translate-x-5 inline-block"
          }
        >
          <RotatingGlobe
            selectedCountry={selectedCountry}
            userCurrentLocation={userCurrentLocation}
          />
        </div>{" "}
        location-based{" "}
        <span className={"inline md:hidden"}>
          <br />
        </span>
        <Image
          src={"/burningheart.webp"}
          alt={"burning heart telemoji"}
          width="67"
          height="67"
          className={
            "-mt-2 -mx-1.5 md:-mx-2.5 inline w-11 h-11 md:w-20 md:h-20"
          }
        />
        {"  "}
        <span className={"font-medium md:font-normal"}>postcard</span>
      </div>
      <LocationsContainer
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        setUserCurrentLocation={setUserCurrentLocation}
        userCurrentLocation={userCurrentLocation}
      />
    </>
  );
}
