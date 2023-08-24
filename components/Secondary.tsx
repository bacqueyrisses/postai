"use client";
import Locations from "@/components/ui/Locations";
import RotatingGlobe from "@/components/RotatingGlobe";
import { useState } from "react";

export default function Secondary() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGlobeCountry, setSelectedGlobeCountry] = useState(null);
  return (
    <>
      <RotatingGlobe
        selectedCountry={selectedCountry}
        setSelectedGlobeCountry={setSelectedGlobeCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <Locations
        selectedCountry={selectedCountry}
        selectedGlobeCountry={selectedGlobeCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
}
