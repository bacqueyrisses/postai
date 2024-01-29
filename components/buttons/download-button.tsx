"use client";
import { useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { Download } from "lucide-react";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function DownloadButton({ id, image }) {
  const [downloading, setDownloading] = useState(false);

  return (
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
  );
}
