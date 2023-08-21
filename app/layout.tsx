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
        className={`px-24 flex flex-col justify-between h-screen bg-[#E9E7DF] ${raleway.className}`}
      >
        <link
          rel="icon"
          href="https://em-content.zobj.net/source/apple/354/world-map_1f5fa-fe0f.png"
          sizes="any"
        />
        {children}
      </body>
    </html>
  );
}
