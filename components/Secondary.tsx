"use client";
import Locations from "@/components/ui/Locations";
import RotatingGlobe from "@/components/RotatingGlobe";
import { useState } from "react";

export default function Secondary() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGlobeCountry, setSelectedGlobeCountry] = useState(null);
  const [userLocation, setUserLocation] = useState();
  return (
    <>
      <Locations
        userLocation={userLocation}
        selectedCountry={selectedCountry}
        selectedGlobeCountry={selectedGlobeCountry}
        setSelectedGlobeCountry={setSelectedGlobeCountry}
        setSelectedCountry={setSelectedCountry}
        setUserLocation={setUserLocation}
      />
    </>
  );
}
