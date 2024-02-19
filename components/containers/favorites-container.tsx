import Link from "next/link";
import Image from "next/image";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { getCachedFavorites } from "@/lib/database";
import { User } from "@clerk/nextjs/api";

export default async function FavoritesContainer({ user }: { user: User }) {
  const favorites = await getCachedFavorites(user);

  return (
    <>
      {(!favorites || favorites.length === 0) && (
        <div className={"flex flex-col gap-2 md:gap-4"}>
          <div
            className={
              "flex items-center justify-center gap-1 text-lg md:text-xl"
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
              "text-3xl transition-all hover:text-green-600 md:text-4xl"
            }
          >
            go create a new one
          </Link>
        </div>
      )}
      {favorites?.length > 0 && <LayoutGrid favorites={favorites} />}
    </>
  );
}
