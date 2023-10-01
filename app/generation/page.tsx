"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import { useState } from "react";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveToFavButton from "@/components/buttons/SaveToFavButton";
import SignUpAndSaveFav from "@/components/buttons/SignUpAndSaveFav";
import useSWR from "swr";

export default function GenerationPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  const urlExtras = process.env.NEXT_PUBLIC_ENV === "test" ? "&test=true" : "";
  const apiUrl = `/api/generate?city=${encodeURIComponent(city!)}${urlExtras}`;

  const {
    data: favoriteUrl,
    error,
    isLoading,
  } = useSWR(apiUrl, fetcher, { revalidateOnReconnect: true });

  const handleSaveButton = async () => {
    if (isSaved) return;
    setIsSaved(true);

    await axios
      .post(`/api/user/favorite/create`, {
        favoriteUrl,
        userId,
        city,
        countryCode,
      })
      .catch((error) => console.error(error));
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
          <span>Generating your postcard</span>
          <Image
            src={"/sparkles.webp"}
            alt={"sparkles telemoji"}
            width="67"
            height="67"
            className={"inline w-11 h-11 md:w-20 md:h-20"}
          />
        </div>
      ) : (
        <PostcardContainer
          city={city!}
          countryCode={countryCode!}
          favoriteUrl={favoriteUrl}
        >
          <EmailLinkButton size={50} city={city!} />

          <CopyLinkButton
            favoriteUrl={favoriteUrl}
            countryCode={countryCode!}
            city={city!}
            size={37}
          />

          {userId ? (
            <SaveToFavButton
              handleSaveButton={handleSaveButton}
              isSaved={isSaved}
              size={33}
            />
          ) : (
            <SignUpAndSaveFav
              size={30}
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
