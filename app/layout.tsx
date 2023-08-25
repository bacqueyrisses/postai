import "./globals.css";
import type { Metadata } from "next";

import { raleway } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Postai",
  description: "Generate a unique postcard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`px-4 md:px-24 flex flex-col justify-between h-screen bg-[#E9E7DF] ${raleway.className}`}
      >
        {children}
      </body>
    </html>
  );
}
