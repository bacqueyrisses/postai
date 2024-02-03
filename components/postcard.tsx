"use client";

import Image from "next/image";
import CopyButton from "@/components/buttons/copy-button";
import DownloadButton from "@/components/buttons/download-button";
import { ReactNode } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import SaveButton from "@/components/buttons/save-button";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";

interface IPostcard {
  id: string;
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
  userId?: string;
  saved: boolean;
}

export default function Postcard({
  id,
  image,
  blur,
  city,
  countryCode,
  userId,
  saved,
}: IPostcard) {
  return (
    <>
      {image && blur && (
        <div
          className={
            "absolute z-10 md:-translate-y-14 lg:-translate-y-16 -translate-y-12 text-lg md:text-2xl lg:text-3xl md:space-x-3 space-x-2 bg-cyan-600 w-fit md:px-10 px-6 rounded-full py-1 md:py-2 text-white"
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
        {id && image && blur && (
          <div className="absolute md:right-5 top-3 right-3 md:top-5 z-10 flex space-x-2">
            <CopyButton id={id} />
            <DownloadButton id={id} image={image} />
            <SaveButton
              id={id}
              countryCode={countryCode}
              image={image}
              city={city}
              blur={blur}
              userId={userId}
              saved={saved}
            />
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
            className="z-10 w-full flex gap-2 md:gap-4 justify-start mt-12 md:mt-16 lg:mt-32 items-center flex-col h-[768px]"
          >
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-medium text-center">
              generating your postcard
            </p>
            <p className="text-sm md:text-lg text-white font-normal text-center">
              it can take up to 30s to complete
            </p>
          </WavyBackground>
        )}
      </div>
    </>
  );
}
