"use client";
import Locations from "@/components/ui/Locations";
import RotatingGlobe from "@/components/RotatingGlobe";
import { useState } from "react";

export default function Secondary() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGlobeCountry, setSelectedGlobeCountry] = useState(null);
  return (
    <>
      <Locations
        selectedCountry={selectedCountry}
        selectedGlobeCountry={selectedGlobeCountry}
        setSelectedGlobeCountry={setSelectedGlobeCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
}
