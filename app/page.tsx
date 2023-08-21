import Image from "next/image";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Locations from "@/components/ui/Locations";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <Hero />
      </main>
    </>
  );
}
