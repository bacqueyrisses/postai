// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { ImageErrorSkeleton, ImageSkeleton } from "@/components/Skeletons";

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

  return (
    <div className={"flex flex-col gap-4 justify-center items-center"}>
      <div className={"text-3xl space-x-3"}>
        <span>{city}</span>
        <span>{countryCodeEmoji(countryCode)}</span>
      </div>
      <div
        className={
          "w-[700px] h-[500px] flex items-end justify-evenly rounded-2xl"
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
      <div className={"flex gap-10"}>{children}</div>
    </div>
  );
}
