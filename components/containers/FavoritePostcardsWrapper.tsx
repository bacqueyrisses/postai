import FavoritePostcard from "@/components/containers/FavoritePostcard";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { getCachedFavorites } from "@/app/lib/database";

export default async function FavoritePostcardWrapper() {
  const user: User | null = await currentUser();
  if (!user) return;

  const favorites = await getCachedFavorites(user);

  return (
    <>
      {(!favorites || favorites.length === 0) && (
        <div className={"flex gap-4 sm:gap-8 flex-col"}>
          <div
            className={
              "sm:text-xl text-lg flex items-center justify-center gap-1"
            }
          >
            <span>you got no postcards </span>
            <Image
              width={27}
              height={27}
              src={
                "https://em-content.zobj.net/source/apple/354/broken-heart_1f494.png"
              }
              alt={"broken heart emoji"}
              priority={true}
              className={"transition-colors"}
            />
          </div>
          <Link
            href={"/"}
            className={
              "sm:text-5xl text-4xl hover:text-green-600 transition-all"
            }
          >
            go create one
          </Link>
        </div>
      )}
      {favorites?.length > 0 &&
        favorites.map((favorite) => (
          <div
            key={favorite.url}
            className="group relative mx-auto mt-6 aspect-[3/2] w-full h-full max-w-3xl animate-fade-up overflow-hidden rounded-2xl border border-gray-200"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Image
              alt="output image"
              src={favorite.url}
              width={1024}
              height={768}
              placeholder={"blur"}
              blurDataURL={favorite.blur}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ))}
    </>
  );
}
