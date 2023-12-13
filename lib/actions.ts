"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { del } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

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
    revalidatePath("/favorites");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create favorite.");
  } finally {
    const randomUUID = uuidv4().split("-").join("").slice(0, 4);
    const response = await fetch(favoriteUrl);
    const blob = await response.blob();

    const { url } = await put(`favorites/${userId}/${randomUUID}.png`, blob, {
      access: "public",
    });

    await sql`UPDATE "Favorite" 
          SET url = ${url} 
          WHERE "userId" = ${userId}`;
  }
}

export async function deleteFavorite(favoriteId: number, favoriteUrl: string) {
  try {
    await del(favoriteUrl);
    await sql`DELETE FROM "Favorite" WHERE "id" = ${favoriteId};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  } finally {
    revalidatePath("/favorites");
  }
}
