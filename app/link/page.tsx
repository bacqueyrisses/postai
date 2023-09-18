"use client";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import Image from "next/image";
import { useSearchParams, redirect } from "next/navigation";

export default function LinkPage({}) {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  if (!url) redirect("/");

  return (
    <div className={"flex flex-col gap-4 justify-center items-center"}>
      <div className={"text-3xl space-x-3"}>
        <span>{city}</span>
        <span>{countryCodeEmoji(countryCode)}</span>
      </div>
      <Image
        className={"rounded-xl"}
        width={500}
        height={500}
        src={url}
        alt={"user postcard"}
      />
    </div>
  );
}
