"use client";

import Image from "next/image";
import CopyButton from "@/components/buttons/copy-button";
import DownloadButton from "@/components/buttons/download-button";
import { WavyBackground } from "@/components/ui/wavy-background";
import SaveButton from "@/components/buttons/save-button";
import { getFlagEmoji } from "@/lib/utils";

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
            "absolute z-10 w-fit -translate-y-12 space-x-2 rounded-full bg-cyan-600 px-6 py-1 text-lg text-white md:-translate-y-14 md:space-x-3 md:px-10 md:py-2 md:text-2xl lg:-translate-y-16 lg:text-3xl"
          }
        >
          <span>{city}</span>
          <span>{getFlagEmoji(countryCode)}</span>
        </div>
      )}
      <div
        className="animate-fade-up group relative mx-auto aspect-[3/2] h-full w-full max-w-3xl overflow-hidden rounded-xl border border-gray-200"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        {id && image && blur && (
          <div className="absolute right-3 top-3 z-10 flex space-x-2 md:right-5 md:top-5">
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
            className="z-10 mt-12 flex h-[768px] w-full flex-col items-center justify-start gap-2 md:mt-16 md:gap-4 lg:mt-32"
          >
            <p className="text-center text-xl font-medium text-white md:text-3xl lg:text-4xl">
              generating your postcard
            </p>
            <p className="text-center text-sm font-normal text-white md:text-lg">
              it can take up to 30s to complete
            </p>
          </WavyBackground>
        )}
      </div>
    </>
  );
}
