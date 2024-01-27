"use client";

import { Copy, Download, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { useParams, useRouter } from "next/navigation";
import SaveButtons from "./buttons/SaveButtons";
import SaveButton from "@/components/buttons/save-button";
import { useUser } from "@clerk/nextjs";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PostcardContainer({
  image,
  blur,
  city,
  countryCode,
}: {
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
}) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!blur) {
      interval = setInterval(() => {
        router.refresh();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [blur, router]);

  return (
    <div
      className="group relative mx-auto mt-6 aspect-[3/2] w-full h-full max-w-3xl animate-fade-up overflow-hidden rounded-2xl border border-gray-200"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      {id && image && (
        <div className="absolute right-5 top-5 z-10 flex space-x-2">
          <button
            onClick={() => {
              setCopying(true);
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  navigator.clipboard.write([
                    new ClipboardItem({
                      "image/png": blob,
                    }),
                  ]);
                  setCopying(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy className="h-4 w-4 text-white" />
            )}
          </button>
          <button
            onClick={() => {
              setDownloading(true);
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  forceDownload(blobUrl, `${id || "demo"}.png`);
                  setDownloading(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {downloading ? (
              <LoadingCircle />
            ) : (
              <Download className="h-4 w-4 text-white" />
            )}
          </button>
          {user?.id && (
            <SaveButton
              countryCode={countryCode}
              image={image}
              city={city}
              blur={blur}
              userId={user.id}
            />
          )}
        </div>
      )}
      {image && blur ? (
        <Image
          alt="output image"
          src={image}
          width={1024}
          height={768}
          placeholder={"blur"}
          blurDataURL={blur}
          className="h-full w-full object-cover"
          priority
        />
      ) : (
        <div className="z-10 w-full h-full bg-white">
          <div className={"h-[768px] pt-20 sm:pt-32 md:pt-36 xl:pt-40"}>
            <Image
              src={"/sparkles.webp"}
              alt={"sparkles telemoji"}
              width="30"
              height="30"
              className={"inline w-8 h-8 md:w-10 md:h-10"}
              priority
            />
            {id && (
              <div
                className="my-4 flex animate-fade-up flex-col items-center space-y-2"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-lg md:text-xl text-gray-500">
                  Generating your postcard
                </p>
                <p className="text-sm md:text-base text-gray-500">
                  It can take up to 30s
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
