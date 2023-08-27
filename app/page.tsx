"use client";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Locations from "@/components/ui/Locations";
import { useState } from "react";
import Postcard from "@/components/ui/Postcard";

type PageType = "locations" | "postcard";

export default function Home() {
  const [pageDisplayed, setPageDisplayed] = useState<PageType>("locations");
  return (
    <>
      <main className="flex flex-col justify-between text-center md:gap-14 gap-20">
        <Header
          setPageDisplayed={setPageDisplayed}
          pageDisplayed={pageDisplayed}
        />
        <Hero pageDisplayed={pageDisplayed} />
        {pageDisplayed === "locations" && <Locations />}
        {pageDisplayed === "postcard" && <Postcard />}
      </main>

      <Footer />
    </>
  );
}
