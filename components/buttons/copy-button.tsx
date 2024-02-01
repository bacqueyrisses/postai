"use client";
import { useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { Copy } from "lucide-react";
import { Postcard } from "@/types/definitions";
import { toast } from "sonner";

export default function CopyButton({ id }: { id: Postcard["id"] }) {
  const [copying, setCopying] = useState(false);

  return (
    <button
      onClick={() => {
        setCopying(true);
        void navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_URL}/generation/${id}`,
        );
        setCopying(false);
        toast.success("url copied to clipboard");
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 shadow-sm transition-all hover:scale-105 active:scale-95"
    >
      {copying ? (
        <LoadingCircle className={"w-4 h-4 text-white"} />
      ) : (
        <Copy className="h-4 w-4 text-white" />
      )}
    </button>
  );
}
