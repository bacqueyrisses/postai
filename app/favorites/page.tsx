import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import FavoritePostcard from "@/components/containers/FavoritePostcard";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

export const revalidate = 0;

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

export default async function FavoritesPage() {
  const user: User | null = await currentUser();
  if (!user) return;

  const data = await fetchFavorites(user);

  return (
    <div className={"flex gap-14 flex-wrap justify-center items-center py-14"}>
      <Suspense fallback={"Loading..."}>
        {(!data || data.length === 0) && "No cards."}
        {data?.length > 0 &&
          data.map((favorite) => (
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
      </Suspense>
    </div>
  );
}
