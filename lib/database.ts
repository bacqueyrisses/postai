import { sql } from "@vercel/postgres";
import { User } from "@clerk/nextjs/api";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";
import { Favorite } from "@prisma/client";

async function getFavorites(user: User) {
  try {
    const data =
      await sql<Favorite>`SELECT * FROM "Favorite" WHERE "userId" = ${user.id} ORDER BY "createdAt" DESC;`;

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
