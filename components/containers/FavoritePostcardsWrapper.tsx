import FavoritePostcard from "@/components/containers/FavoritePostcard";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import { FavoriteSkeleton } from "@/components/skeletons/FavoriteSkeleton";
import { Suspense } from "react";

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
      await sql<Favorites>`SELECT * FROM "Favorite" WHERE "userId" = ${user.id} ORDER BY "id" DESC LIMIT 2;`;

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
      {(!favorites || favorites.length === 0) && "No cards."}
      {favorites?.length > 0 &&
        favorites.map((favorite) => (
          <FavoritePostcard
            key={favorite.id}
            favorite={{
              id: favorite.id,
              url: favorite.url,
              city: favorite.city,
              countryCode: favorite.countryCode,
            }}
          />
        ))}
    </>
  );
}
