"use client";
import Locations from "@/components/ui/Locations";
import RotatingGlobe from "@/components/RotatingGlobe";
import { useState } from "react";

export default function Secondary() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      <RotatingGlobe
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <Locations
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
}
