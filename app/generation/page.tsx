"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenerationPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const urlExtras = process.env.NEXT_PUBLIC_ENV === "test" ? "&test=true" : "";
  const url = `/api/replicate?city=${encodeURIComponent(city!)}${urlExtras}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return (
    <div
      className={
        "text-3xl md:text-6xl font-normal md:font-normal inline-flex justify-center items-center gap-4"
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
        <Image src={data} alt={"virtual postcard"} width={500} height={500} />
        // <Image
        //   src={"/postcard.jpg"}
        //   alt={"virtual postcard"}
        //   width={800}
        //   height={800}
        //   className={"rounded-xl"}
        // />
      )}
    </div>
  );
}