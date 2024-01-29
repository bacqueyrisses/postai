import { sql } from "@vercel/postgres";
import { User } from "@clerk/nextjs/api";
import { unstable_cache as nextCache } from "next/cache";

type Favorites = {
  id: string;
  url: string;
  city: string;
  blur: string;
  countryCode: string;
  userId: string;
};
async function getFavorites(user: User) {
  try {
    const data =
      await sql<Favorites>`SELECT * FROM "Favorite" WHERE "userId" = ${user.id} ORDER BY "id" DESC;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}

export const getCachedFavorites = nextCache(
  async (user) => getFavorites(user),
  ["favorites"],
  { tags: ["favorites"] },
);
