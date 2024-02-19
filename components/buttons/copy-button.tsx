"use client";
import { useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { Copy } from "lucide-react";
import { Postcard } from "@/types/definitions";
import { toast } from "sonner";
import { Favorite } from "@prisma/client";

export default function CopyButton({
  id,
}: {
  id: Postcard["id"] | Favorite["id"];
}) {
  const [copying, setCopying] = useState(false);

  return (
    <button
      onClick={() => {
        setCopying(true);
        void navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_URL}/generation/${id}`,
        );
        setCopying(false);
        toast.success("postcard share link copied");
      }}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 shadow-sm transition-all hover:scale-105 active:scale-95 md:h-9 md:w-9"
    >
      {copying ? (
        <LoadingCircle className={"h-3 w-3 text-white md:h-4 md:w-4"} />
      ) : (
        <Copy className="h-3 w-3 text-white md:h-4 md:w-4" />
      )}
    </button>
  );
}
