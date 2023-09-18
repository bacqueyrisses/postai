"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { SignIn, useAuth } from "@clerk/nextjs";
import axios from "axios";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import { useState } from "react";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveToFavButton from "@/components/buttons/SaveToFavButton";

export default function GenerationPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  const urlExtras = process.env.NEXT_PUBLIC_ENV === "test" ? "&test=true" : "";
  const url = `/api/generate?city=${encodeURIComponent(city!)}${urlExtras}`;

  const { data: favoriteUrl, error, isLoading } = useSWRImmutable(url, fetcher);

  const handleSaveButton = async () => {
    if (isSaved) return;
    setIsSaved(true);

    await axios.post("http://localhost:3000/api/user/favorite/create", {
      favoriteUrl,
      userId,
      city,
      countryCode,
    });
    router.prefetch("/containers");
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
      ) : !isLoaded || !userId ? (
        <div>
          <SignIn />
        </div>
      ) : (
        <PostcardContainer city={city!} countryCode={countryCode!} url={url}>
          <EmailLinkButton size={50} city={city!} />

          <CopyLinkButton
            url={favoriteUrl}
            countryCode={countryCode!}
            city={city!}
            size={37}
          />

          <SaveToFavButton
            handleSaveButton={handleSaveButton}
            isSaved={isSaved}
          />
        </PostcardContainer>
      )}
    </div>
  );
}
