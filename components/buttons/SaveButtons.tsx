"use client";
import { useAuth } from "@clerk/nextjs";
import SaveToFavButton from "@/components/buttons/SaveToFavButton";
import SignUpAndSaveFav from "@/components/buttons/SignUpAndSaveFav";
import { IPostcardContainer } from "@/components/containers/PostcardContainer";

interface ISaveButtons extends IPostcardContainer {
  size: number;
}
export default function SaveButtons({
  size,
  favoriteUrl,
  city,
  countryCode,
}: ISaveButtons) {
  const { userId } = useAuth();

  return userId ? (
    <SaveToFavButton
      size={23}
      favoriteUrl={favoriteUrl}
      city={city!}
      countryCode={countryCode!}
      userId={userId}
    />
  ) : (
    <SignUpAndSaveFav
      size={23}
      favoriteUrl={favoriteUrl}
      city={city!}
      countryCode={countryCode!}
    />
  );
}
