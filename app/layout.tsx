import "@/styles/globals.css";
import { raleway } from "@/lib/fonts";

import type { Metadata, Viewport } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | postai",
    default: "postai",
  },
  description: "create your virtual ai-generated location-based postcard.",
  metadataBase: new URL("https://www.postai.enzo.codes"),
};
export const viewport: Viewport = {
  themeColor: "E9E7DF",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={raleway.className}>
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
            card: "w-auto md:px-24 lg:px-32 px-14 shadow-none border-0",
            profileSectionPrimaryButton: "shadow-none",
            navbarButton: "shadow-none mb-2",
            avatarBox: "sm:w-8 sm:h-8 w-6 h-6",
          },
        }}
      >
        <Toaster
          offset={50}
          position={"bottom-center"}
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: `${raleway.className} w-full flex justify-center items-center gap-1.5 rounded-3xl py-2 md:py-2.5 px-8 text-white text-sm md:text-base bottom-52`,
              success: "bg-emerald-500",
              error: "bg-red-600",
            },
          }}
        />
        <body
          className={`flex h-screen flex-col justify-between bg-[#E9E7DF] px-4 md:px-10 lg:px-24`}
        >
          <Header />
          <main className="flex flex-col justify-between gap-20 text-center md:gap-28">
            {children}
          </main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
