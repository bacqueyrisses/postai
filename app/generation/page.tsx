"use client";
export const revalidate = 0;
import { notFound, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import { useState } from "react";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveToFavButton from "@/components/buttons/SaveToFavButton";
import SignUpAndSaveFav from "@/components/buttons/SignUpAndSaveFav";
import useSWRImmutable from "swr/immutable";
import { createFavorite } from "@/lib/actions";

export default function GenerationPage() {
  const { userId } = useAuth();

  const [isSaved, setIsSaved] = useState(false);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  const apiUrl = `/api/generate?city=${encodeURIComponent(city!)}`;

  const {
    data: favoriteUrl,
    error,
    isLoading,
  } = useSWRImmutable(apiUrl, fetcher, { revalidateOnMount: true });

  if (!city || !countryCode) return notFound();

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
    <div
      className={
        "text-3xl md:text-6xl font-normal md:font-normal inline-flex justify-center items-center"
      }
    >
      {error ? (
        <div className={"flex gap-8 flex-col"}>
          <span>Something went wrong 😭</span>
          <Link
            href={"/"}
            className={"text-3xl italic hover:text-green-600 transition-colors"}
          >
            Go back home
          </Link>
        </div>
      ) : isLoading ? (
        <div className={"space-x-4"}>
          <span>generating your postcard</span>
          <Image
            src={"/sparkles.webp"}
            alt={"sparkles telemoji"}
            width="67"
            height="67"
            className={"inline w-11 h-11 md:w-20 md:h-20"}
            priority={true}
          />
        </div>
      ) : (
        <PostcardContainer
          city={city!}
          countryCode={countryCode!}
          favoriteUrl={favoriteUrl}
        >
          <EmailLinkButton
            favoriteUrl={favoriteUrl}
            countryCode={countryCode!}
            size={38}
            city={city!}
          />

          <CopyLinkButton
            favoriteUrl={favoriteUrl}
            countryCode={countryCode!}
            city={city!}
            size={25}
          />

          {userId ? (
            <SaveToFavButton
              handleSaveButton={handleSaveButton}
              isSaved={isSaved}
              size={23}
            />
          ) : (
            <SignUpAndSaveFav
              size={23}
              favoriteUrl={favoriteUrl}
              city={city!}
              countryCode={countryCode!}
            />
          )}
        </PostcardContainer>
      )}
    </div>
  );
}
