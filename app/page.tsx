import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Locations from "@/components/ui/Locations";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col grow justify-around text-6xl text-center">
        <Hero />
        <Locations />
      </main>

      <Footer />
    </>
  );
}
