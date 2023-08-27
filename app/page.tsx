"use client";
import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/Footer";
import Locations from "@/components/locations/Locations";
import { useState } from "react";
import Postcard from "@/components/postcard/Postcard";

type PageType = "locations" | "postcard";

export default function Home() {
  const [pageDisplayed, setPageDisplayed] = useState<PageType>("locations");
  const [postcardLoading, setPostcardLoading] = useState<boolean>(true);
  return (
    <>
      <main className="flex flex-col justify-between text-center md:gap-16 gap-20">
        <Header
          setPageDisplayed={setPageDisplayed}
          pageDisplayed={pageDisplayed}
        />
        <Hero pageDisplayed={pageDisplayed} postcardLoading={postcardLoading} />
        {pageDisplayed === "locations" && <Locations />}
        {pageDisplayed === "postcard" && <Postcard />}
      </main>

      <Footer />
    </>
  );
}
