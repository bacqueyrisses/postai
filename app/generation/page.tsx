"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { SignIn, useAuth } from "@clerk/nextjs";
import axios from "axios";
import CopyLinkToClipboard from "@/components/general/CopyLinkToClipboard";
import countryCodeEmoji from "country-code-emoji";

export default function GenerationPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");

  const urlExtras = process.env.NEXT_PUBLIC_ENV === "test" ? "&test=true" : "";
  const url = `/api/generate?city=${encodeURIComponent(city!)}${urlExtras}`;

  const { data: favoriteUrl, error, isLoading } = useSWRImmutable(url, fetcher);

  const handleSaveButton = async () => {
    await axios.post("http://localhost:3000/api/user/favorite/create", {
      favoriteUrl,
      userId,
      city,
      countryCode,
    });
    router.prefetch("/favorites");
  };

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
      ) : !isLoaded || !userId ? (
        <div>
          <SignIn />
        </div>
      ) : (
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <div className={"text-3xl space-x-3"}>
            <span>{city}</span>
            <span>{countryCodeEmoji(countryCode)}</span>
          </div>
          <div
            className={
              "w-[700px] h-[500px] flex items-center justify-evenly cursor-pointer rounded-2xl group"
            }
            style={{
              backgroundImage: `url(${favoriteUrl})`,
              backgroundSize: "cover",
            }}
          >
            <div
              className={
                "hidden group-hover:flex group-hover:bg-slate-300 opacity-50 h-1/3 w-5/6 rounded-full justify-evenly items-center"
              }
            >
              <div
                className={"bg-slate-300 opacity-90 w-1/5 h-2/3 rounded-3xl"}
              >
                <a
                  href={`mailto:x@y.com?subject=check out my postcard from ${city}!&body=hey! I generated a postcard just for you: https://pbxt.replicate.delivery/zbZHbwtsMf0RXiHmVZa6D9ey3DB7FUzffZcIISvaTy5ErIWGB/out-0.png`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 z-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </a>
              </div>
              <div className={"bg-neutral-800 w-1/5 h-2/3"}>
                <CopyLinkToClipboard
                  url={favoriteUrl}
                  countryCode={countryCode}
                  city={city}
                  className={"w-9 h-9"}
                />
              </div>
              <div className={"bg-neutral-800 w-1/5 h-2/3"}>
                <button onClick={handleSaveButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
