// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { ImageErrorSkeleton } from "@/components/Skeletons";

import { v4 as uuidv4 } from "uuid";
interface IPostcardContainer {
  city: string;
  countryCode: string;
  favoriteUrl: string;
  children?: ReactNode;
}

export default function PostcardContainer({
  city,
  countryCode,
  favoriteUrl,
  children,
}: IPostcardContainer) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
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
      link.setAttribute("download", `postcard-${randomUUID}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className={"flex flex-col gap-4 justify-center items-center"}>
      <div className={"text-3xl space-x-3"}>
        <span>{city}</span>
        <span>{countryCodeEmoji(countryCode)}</span>
      </div>
      <div className={"relative"}>
        <button className={"group"} onClick={handleDownloadImage}>
          <div
            className={
              "w-[700px] h-[500px] flex items-end justify-evenly rounded-2xl group-hover:shadow-xl transition"
            }
            style={{
              backgroundImage: `url(${favoriteUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {imageError && <ImageErrorSkeleton />}
            <img
              src={favoriteUrl}
              alt="favorite postcard image postai"
              style={{ display: "none" }}
              onError={handleImageError}
              width={300}
              height={300}
            />
          </div>
        </button>
        <div
          className={
            "absolute top-full right-0 flex items-baseline justify-end gap-1.5 mt-4"
          }
        >
          <Image
            src={"/swing-arrow.png"}
            height={50}
            width={50}
            alt={"swing arrow image"}
          />

          <span className={"text-sm"}>Click to download</span>
        </div>
      </div>
      <div className={"flex gap-10"}>{children}</div>
    </div>
  );
}
