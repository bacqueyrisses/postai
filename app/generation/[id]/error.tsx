"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"flex flex-col gap-8"}>
      <div className={"flex flex-col gap-4 sm:gap-8"}>
        <div
          className={
            "flex items-center justify-center gap-1 text-lg sm:text-xl"
          }
        >
          <span>something went wrong</span>
          <Image
            width={27}
            height={27}
            src={
              "https://em-content.zobj.net/source/apple/354/loudly-crying-face_1f62d.png"
            }
            alt={"loudly crying emoji"}
            priority={true}
            className={"transition-colors"}
          />
        </div>
        <button
          className={"text-4xl transition-all hover:text-green-600 sm:text-5xl"}
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
