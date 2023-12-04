"use client";
import { redirect, useSearchParams } from "next/navigation";
import PostcardContainer from "@/components/containers/PostcardContainer";

export default function LinkPage({}) {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  if (!url || !city || !countryCode) redirect("/");

  return (
    <PostcardContainer
      city={city}
      countryCode={countryCode}
      favoriteUrl={url}
    />
  );
}
