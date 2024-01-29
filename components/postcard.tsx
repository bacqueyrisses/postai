"use client";

import Image from "next/image";
import CopyButton from "@/components/buttons/copy-button";
import DownloadButton from "@/components/buttons/download-button";
import countryCodeEmoji from "country-code-emoji";

export default function Postcard({
  id,
  image,
  blur,
  city,
  countryCode,
  children,
}: {
  id: string;
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {image && blur && (
        <div
          className={
            "absolute z-10 -translate-y-16 sm:text-3xl text-2xl sm:space-x-3 space-x-2 bg-cyan-600 w-fit px-10 rounded-full py-2 text-white"
          }
        >
          <span>{city}</span>
          <span>{countryCodeEmoji(countryCode)}</span>
        </div>
      )}
      <div
        className="group relative mx-auto aspect-[3/2] w-full h-full max-w-3xl animate-fade-up rounded-2xl border border-gray-200 overflow-hidden"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        {id && image && (
          <div className="absolute right-5 top-5 z-10 flex space-x-2">
            <CopyButton id={id} />
            <DownloadButton id={id} image={image} />
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
          <div className="z-10 w-full h-full bg-white">
            <div className={"h-[768px] pt-20 sm:pt-32 md:pt-36 xl:pt-40"}>
              <Image
                src={"/sparkles.webp"}
                alt={"sparkles telemoji"}
                width="30"
                height="30"
                className={"inline w-8 h-8 md:w-10 md:h-10"}
                priority
              />
              {id && (
                <div
                  className="my-4 flex animate-fade-up flex-col items-center space-y-2"
                  style={{
                    animationDelay: "0.5s",
                    animationFillMode: "forwards",
                  }}
                >
                  <p className="text-lg md:text-xl text-gray-500">
                    Generating your postcard
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    It can take up to 30s
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
