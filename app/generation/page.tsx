"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenerationPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const url = `/api/replicate?city=${encodeURIComponent(city!)}`;

  const [isLoading, setIsLoading] = useState(true);
  const error = false;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  // const { data, error, isLoading } = useSWR(url, fetcher);

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
        <>
          <span>Generating your postcard </span>
          <Image
            src={"/sparkles.webp"}
            alt={"sparkles telemoji"}
            width="67"
            height="67"
            className={
              "-mt-2 -mx-1.5 md:-mx-2.5 inline w-11 h-11 md:w-20 md:h-20"
            }
          />
        </>
      ) : (
        // <Image src={data} alt={"virtual postcard"} width={500} height={500} />
        <Image
          src={"/postcard.jpg"}
          alt={"virtual postcard"}
          width={800}
          height={800}
          className={"rounded-xl"}
        />
      )}
    </div>
  );
}
