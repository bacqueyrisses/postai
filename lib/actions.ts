"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

interface CreateFavorite {
  favoriteUrl: string;
  userId: string;
  city: string;
  countryCode: string;
}
export async function createFavorite({
  favoriteUrl,
  userId,
  city,
  countryCode,
}: CreateFavorite) {
  try {
    await sql`INSERT INTO "Favorite" (url, city, "countryCode", "userId") VALUES (${favoriteUrl}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create favorite.");
  } finally {
    revalidatePath("/favorites");
  }
}

export async function deleteFavorite(favoriteId: number) {
  try {
    await sql`DELETE FROM "Favorite" WHERE "id" = ${favoriteId};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  } finally {
    revalidatePath("/favorites");
  }
}
