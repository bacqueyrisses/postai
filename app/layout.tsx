import "./globals.css";
import type { Metadata } from "next";

import { raleway } from "@/utils/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Postai",
  description: "Generate a unique postcard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: replace custom bg with bg primary
  return (
    <html lang="en">
      <body
        className={`${raleway.className} px-4 md:px-24 flex flex-col justify-between h-screen bg-[#E9E7DF]`}
      >
        <Header />
        <main className="flex flex-col justify-between text-center md:gap-28 gap-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
