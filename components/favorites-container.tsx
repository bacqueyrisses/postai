import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { getCachedFavorites } from "@/app/lib/database";
import Postcard from "@/components/postcard";
import DeleteButton from "@/components/buttons/delete-button";
import { LayoutGrid } from "@/components/ui/layout-grid";

export default async function FavoritesContainer() {
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
      {favorites?.length > 0 && <LayoutGrid cards={favorites} />}
    </>
  );
}
