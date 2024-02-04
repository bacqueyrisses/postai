import Link from "next/link";
import Image from "next/image";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { Favorite } from "@prisma/client";

export default async function FavoritesContainer({
  favorites,
}: {
  favorites: Favorite[];
}) {
  return (
    <>
      {(!favorites || favorites.length === 0) && (
        <div className={"flex gap-2 md:gap-4 flex-col"}>
          <div
            className={
              "md:text-xl text-lg flex items-center justify-center gap-1"
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
              "md:text-4xl text-3xl hover:text-green-600 transition-all"
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
