"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard
      text={`${
        process.env.NEXT_PUBLIC_URL
      }/link?city=${city}&countryCode=${countryCode}&url=${favoriteUrl}&user=${
        user?.firstName ?? ""
      }`}
      onCopy={handleCopy}
    >
      <button>
        {isCopied ? (
          <Image
            width={size}
            height={size}
            src={
              "https://em-content.zobj.net/source/apple/354/clipboard_1f4cb.png"
            }
            alt={"clipboard emoji"}
            className={"hover:scale-105 transition-all"}
          />
        ) : (
          <Image
            width={size}
            height={size}
            src={"https://em-content.zobj.net/source/apple/354/link_1f517.png"}
            alt={"link emoji"}
            className={"hover:scale-105 transition-all"}
          />
        )}
      </button>
    </CopyToClipboard>
  );
}
