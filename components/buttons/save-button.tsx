"use client";
import { LoadingCircle } from "@/components/icons";
import { Star } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createFavorite } from "@/lib/actions";
import Link from "next/link";
import { Favorite } from "@prisma/client";

export default function SaveButton({
  id,
  image,
  blur,
  city,
  countryCode,
  userId,
}: Favorite) {
  const createFavoriteWithId = createFavorite.bind(null, id);

  return userId ? (
    <form
      action={createFavoriteWithId}
      className="flex h-9 w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
    >
      <input className="hidden" name="image" value={image} readOnly />
      <input className="hidden" name="blur" value={blur} readOnly />
      <input className="hidden" name="city" value={city} readOnly />
      <input
        className="hidden"
        name="countryCode"
        value={countryCode}
        readOnly
      />
      <input className="hidden" name="userId" value={userId} readOnly />
      <SubmitButton />
    </form>
  ) : (
    <Link
      className={
        "flex h-9 w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
      }
      href={`/favorites?id=${id}&image=${image}&blur=${blur}&city=${city}&countryCode=${countryCode}`}
    >
      <Star className="h-4 w-4 text-white" />
    </Link>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? (
        <LoadingCircle className={"w-4 h-4 text-white"} />
      ) : (
        <Star className="h-4 w-4 text-white" />
      )}
    </button>
  );
}
