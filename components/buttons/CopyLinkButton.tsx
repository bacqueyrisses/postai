"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Image from "next/image";

interface ICopyLinkToClipboard {
  city: string;
  countryCode: string;
  favoriteUrl: string;
  size: number;
}
export default function CopyLinkButton({
  city,
  countryCode,
  favoriteUrl,
  size,
}: ICopyLinkToClipboard) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard
      text={`${process.env.NEXT_SERVER_URL}/link?city=${city}&countryCode=${countryCode}&url=${favoriteUrl}`}
      onCopy={handleCopy}
    >
      <button
        className={
          "bg-slate-300/80 transition hover:bg-slate-300/90 w-1/5 h-3/4 rounded-3xl inline-flex justify-center items-center"
        }
      >
        {isCopied ? (
          <Image
            width={size}
            height={size}
            src={
              "https://em-content.zobj.net/source/apple/354/clipboard_1f4cb.png"
            }
            alt={"link emoji"}
          />
        ) : (
          <Image
            width={size}
            height={size}
            src={"https://em-content.zobj.net/source/apple/354/link_1f517.png"}
            alt={"link emoji"}
          />
        )}
      </button>
    </CopyToClipboard>
  );
}
