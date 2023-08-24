import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Secondary from "@/components/Secondary";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col grow justify-around text-center">
        <Hero />

        <Secondary />
      </main>

      <Footer />
    </>
  );
}
