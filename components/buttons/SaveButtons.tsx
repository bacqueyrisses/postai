"use client";
import SaveToFavButton from "@/components/buttons/SaveToFavButton";
import SignUpAndSaveFav from "@/components/buttons/SignUpAndSaveFav";
import { IPostcardContainer } from "@/components/containers/PostcardContainer";

interface ISaveButtons extends IPostcardContainer {
  size: number;
  userId: string | null;
}
export default function SaveButtons({
  size,
  favoriteUrl,
  city,
  countryCode,
  userId,
}: ISaveButtons) {
  return userId ? (
    <SaveToFavButton
      size={size}
      favoriteUrl={favoriteUrl}
      city={city!}
      countryCode={countryCode!}
      userId={userId}
    />
  ) : (
    <SignUpAndSaveFav
      size={size}
      favoriteUrl={favoriteUrl}
      city={city!}
      countryCode={countryCode!}
    />
  );
}
