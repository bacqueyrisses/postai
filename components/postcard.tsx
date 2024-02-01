"use client";

import Image from "next/image";
import CopyButton from "@/components/buttons/copy-button";
import DownloadButton from "@/components/buttons/download-button";
import { ReactNode } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import SaveButton from "@/components/buttons/save-button";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";

export default function Postcard({
  id,
  image,
  blur,
  city,
  countryCode,
  children,
  userId,
}: {
  id: string;
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
  children?: ReactNode;
  userId: string | null;
}) {
  return (
    <>
      {image && blur && (
        <div
          className={
            "absolute z-10 -translate-y-16 sm:text-3xl text-xl sm:space-x-3 space-x-2 bg-cyan-600 w-fit px-10 rounded-full py-2 text-white"
          }
        >
          <span>{city}</span>
          <span>{countryCodeEmoji(countryCode)}</span>
        </div>
      )}
      <div
        className="group relative mx-auto aspect-[3/2] w-full h-full max-w-3xl animate-fade-up rounded-xl border border-gray-200 overflow-hidden"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        {id && image && (
          <div className="absolute right-5 top-5 z-10 flex space-x-2">
            <CopyButton id={id} />
            <DownloadButton id={id} image={image} />{" "}
            <SaveButton
              id={id}
              countryCode={countryCode}
              image={image}
              city={city}
              blur={blur}
              userId={userId}
            />
            {children}
          </div>
        )}
        {image && blur ? (
          <>
            <Image
              alt="output image"
              src={image}
              width={1024}
              height={768}
              placeholder={"blur"}
              blurDataURL={blur}
              className="h-full w-full object-fill"
              priority
            />
          </>
        ) : (
          <WavyBackground
            backgroundFill={"#12B981"}
            speed={"slow"}
            className="z-10 w-full flex justify-start mt-32 items-center flex-col h-[768px]"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium text-center">
              generating your postcard
            </p>
            <p className="text-base md:text-lg mt-4 text-white font-normal text-center">
              it can take up to 30s to complete
            </p>
          </WavyBackground>
        )}
      </div>
    </>
  );
}
