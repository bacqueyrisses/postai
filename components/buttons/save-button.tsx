import { LoadingCircle } from "@/components/icons";
import { Check, Star } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createFavorite } from "@/lib/actions/favorites";
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
          "flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 shadow-sm md:h-9 md:w-9"
        }
        onClick={() => toast.success("favorite already saved")}
      >
        <Check className="h-3 w-3 text-white md:h-4 md:w-4" />
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
        className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 shadow-sm transition-all delay-75 hover:scale-105 active:scale-95 md:h-9 md:w-9"
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
          "flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 shadow-sm transition-all delay-75 hover:scale-105 active:scale-95 md:h-9 md:w-9"
        }
        href={`/favorites?id=${id}&image=${image}&blur=${blur}&city=${city}&countryCode=${countryCode}`}
      >
        {loading ? (
          <LoadingCircle className={"h-3 w-3 text-white md:h-4 md:w-4"} />
        ) : (
          <Star className="h-3 w-3 text-white md:h-4 md:w-4" />
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
        <LoadingCircle className={"h-3 w-3 text-white md:h-4 md:w-4"} />
      ) : (
        <Star className="h-3 w-3 text-white md:h-4 md:w-4" />
      )}
    </button>
  );
}
