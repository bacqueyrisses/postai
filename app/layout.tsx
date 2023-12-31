import "@/styles/globals.css";
import type { Metadata } from "next";

import { raleway } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export const metadata: Metadata = {
  title: {
    template: "%s | postai",
    default: "postai",
  },
  description: "create your virtual ai-generated location-based postcard.",
  metadataBase: new URL("https://mypostai.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: neobrutalism,
          elements: {
            formButtonPrimary:
              "rounded-full shadow-none bg-emerald-500 border-emerald-500 text-white hover:bg-transparent hover:text-emerald-500 py-3",
            footerActionLink:
              "text-blue-600 hover:text-blue-700 hover:no-underline",
            formFieldInput:
              "rounded-full shadow-none focus:shadow-none focus:scale-100 focus:border-emerald-700 outline-none",
            socialButtonsIconButton: "rounded-full",
            socialButtonsIconButton__apple:
              "border-yellow-400 bg-yellow-400 shadow-none hover:bg-white",
            socialButtonsIconButton__google:
              "bg-emerald-400 border-emerald-400 shadow-none hover:bg-white",
            socialButtonsIconButton__github:
              "bg-pink-400 border-pink-400 shadow-none hover:bg-white",
            card: "w-auto sm:px-10 px-14 shadow-none border-0",
            userButtonPopoverCard: "sm:pl-0 sm:pr-20 pl-0 pr-10",
            profileSectionPrimaryButton: "shadow-none",
            navbarButton: "shadow-none mb-2",
            avatarBox: "sm:w-8 sm:h-8 w-6 h-6",
          },
        }}
      >
        <body
          className={`${raleway.className} px-4 md:px-24 flex flex-col justify-between h-screen bg-[#E9E7DF]`}
        >
          <Header />
          <main className="flex flex-col justify-between text-center md:gap-28 gap-20">
            {children}
          </main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
