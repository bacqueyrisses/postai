"use client";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { ImageErrorSkeleton, ImageSkeleton } from "@/components/Skeletons";

import { v4 as uuidv4 } from "uuid";

export interface IPostcardContainer {
  city: string;
  countryCode: string;
  favoriteUrl: string;
  children?: ReactNode;
  deleting?: boolean;
}

export default function PostcardContainer({
  city,
  countryCode,
  favoriteUrl,
  children,
  deleting,
}: IPostcardContainer) {
  const [imageError, setImageError] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);

  const handleImageLoad = () => {
    setImageLoad(false);
  };
  const handleImageError = () => {
    setImageLoad(false);
    setImageError(true);
  };

  const handleDownloadImage = async () => {
    const randomUUID = uuidv4().split("-").join("").slice(0, 4);
    try {
      const response = await fetch(favoriteUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `postcard-${randomUUID}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

  return (
    <div
      className={`flex-col sm:gap-4 gap-2 justify-center items-center ${
        deleting ? "hidden" : "flex"
      }`}
    >
      <div className={"sm:text-3xl text-2xl sm:space-x-3 space-x-2"}>
        <span>{city}</span>
        <span>{countryCodeEmoji(countryCode)}</span>
      </div>

      <button
        className={`group ${
          deleting &&
          `${shimmer} relative overflow-hidden rounded-2xl opacity-80`
        }`}
        onClick={handleDownloadImage}
        disabled={imageLoad}
      >
        <div
          className={`w-[358px] sm:w-[768px] h-[256px] sm:h-[512px] flex items-end justify-evenly rounded-2xl group-hover:shadow-xl transition`}
          style={{
            backgroundImage: `url(${favoriteUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {imageLoad && <ImageSkeleton />}
          {imageError && <ImageErrorSkeleton />}
          <img
            src={favoriteUrl}
            alt="favorite postcard image postai"
            style={{ display: "none" }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            width={300}
            height={300}
          />
        </div>
      </button>
      <div
        className={"w-[358px] sm:w-[768px] flex items-center justify-between"}
      >
        <div className={"sm:basis-1/3 basis-1/4"} />
        <div
          className={
            "flex gap-10 sm:basis-1/3 basis-2/4 justify-center items-center h-8 mt-1.5"
          }
        >
          {children}
        </div>
        <div
          className={
            "flex sm:flex-row sm:items-baseline flex-col items-end justify-end gap-1.5 sm:basis-1/3 basis-1/4 h-8"
          }
        >
          <Image
            src={"/swing-arrow.png"}
            height={50}
            width={50}
            alt={"swing arrow image"}
            className={"hidden sm:block skew-y-6"}
          />

          <span className={"sm:text-sm text-xs hidden sm:block"}>
            click to download
          </span>
        </div>
      </div>
    </div>
  );
}
