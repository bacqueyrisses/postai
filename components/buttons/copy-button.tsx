"use client";
import { useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { Copy } from "lucide-react";

export default function CopyButton({ id }: { id: string }) {
  const [copying, setCopying] = useState(false);

  return (
    <button
      onClick={() => {
        setCopying(true);
        void navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_URL}/generation/${id}`,
        );
        setCopying(false);
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 shadow-sm transition-all hover:scale-105 active:scale-95"
    >
      {copying ? <LoadingCircle /> : <Copy className="h-4 w-4 text-white" />}
    </button>
  );
}
