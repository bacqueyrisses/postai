import { LoadingCircle } from "@/components/icons";
import { Check, Star } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createFavorite } from "@/actions/favorites";
import { toast } from "sonner";
import { Dispatch, useState } from "react";
import Link from "next/link";

import { Postcard } from "@/types/definitions";
import { Favorite } from "@prisma/client";

export default function SaveButton({
  id,
  image,
  blur,
  city,
  countryCode,
  userId,
  saved,
}: (Favorite | Postcard) & { userId: string | undefined; saved: boolean }) {
  const [loading, setLoading] = useState(false);

  const withUser = (saved: boolean, userId: string) => {
    return saved ? (
      <button
        className={
          "flex h-7 w-7 md:h-9 md:w-9 bg-yellow-500 items-center justify-center rounded-full shadow-sm"
        }
        onClick={() => toast.success("favorite already saved")}
      >
        <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
      </button>
    ) : (
      <form
        action={() => {
          createFavorite({ id, image, blur, city, countryCode, userId })
            .then(() => toast.success("favorite saved"))
            .catch((error) => {
              console.error(error);
              toast.error("error, please retry!");
            });
        }}
        className="flex h-7 w-7 md:h-9 md:w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
      >
        <SubmitButton />
      </form>
    );
  };

  const withoutUser = (loading: boolean, setLoading: Dispatch<boolean>) => {
    return (
      <Link
        onClick={() => setLoading(true)}
        className={
          "flex h-7 w-7 md:h-9 md:w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
        }
        href={`/favorites?id=${id}&image=${image}&blur=${blur}&city=${city}&countryCode=${countryCode}`}
      >
        {loading ? (
          <LoadingCircle className={"h-2 w-2 md:h-4 md:w-4 text-white"} />
        ) : (
          <Star className="h-4 w-4 text-white" />
        )}
      </Link>
    );
  };

  return userId ? withUser(saved, userId) : withoutUser(loading, setLoading);
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? (
        <LoadingCircle className={"h-2 w-2 md:h-4 md:w-4 text-white"} />
      ) : (
        <Star className="h-3 w-3 md:h-4 md:w-4 text-white" />
      )}
    </button>
  );
}
