import FavoritePostcard from "@/components/containers/FavoritePostcard";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

type Favorites = {
  id: number;
  url: string;
  city: string;
  countryCode: string;
  userId: string;
};

async function fetchFavorites(user: User) {
  noStore();
  try {
    const data =
      await sql<Favorites>`SELECT * FROM "Favorite" WHERE "userId" = ${user.id} ORDER BY "id" DESC;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}

export default async function FavoritePostcardWrapper() {
  const user: User | null = await currentUser();
  if (!user) return;

  const favorites = await fetchFavorites(user);

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
          <FavoritePostcard
            key={favorite.id}
            favorite={{
              id: favorite.id,
              url: favorite.url,
              city: favorite.city,
              countryCode: favorite.countryCode,
              user: user.firstName ?? "",
            }}
          />
        ))}
    </>
  );
}
