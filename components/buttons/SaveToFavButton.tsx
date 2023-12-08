"use client";
import Image from "next/image";
import { useState } from "react";
import { createFavorite } from "@/lib/actions";
import { IPostcardContainer } from "@/components/containers/PostcardContainer";

interface ISaveToFavButton extends IPostcardContainer {
  size: number;
  userId: string;
}
export default function SaveToFavButton({
  favoriteUrl,
  size,
  city,
  countryCode,
  userId,
}: ISaveToFavButton) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveButton = async () => {
    if (isSaved || !userId) return;
    setIsSaved(true);

    void createFavorite({
      favoriteUrl,
      userId,
      city,
      countryCode,
    });
  };
  return (
    <button onClick={handleSaveButton}>
      {isSaved ? (
        <Image
          width={size}
          height={size}
          src={
            "https://em-content.zobj.net/source/apple/354/check-mark-button_2705.png"
          }
          alt={"link emoji"}
        />
      ) : (
        <Image
          width={size}
          height={size}
          src={
            "https://em-content.zobj.net/source/apple/354/floppy-disk_1f4be.png"
          }
          alt={"floppy disk emoji"}
          className={"hover:scale-105 transition-all"}
        />
      )}
    </button>
  );
}
