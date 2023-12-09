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
    const randomUUID = uuidv4().split("-").join("").slice(0, 4);
    const response = await fetch(favoriteUrl);
    const blob = await response.blob();

    const { url, pathname, contentType, contentDisposition } = await put(
      `favorites/${userId}/${randomUUID}.png`,
      blob,
      {
        access: "public",
      },
    );

    await sql`INSERT INTO "Favorite" (url, city, "countryCode", "userId") VALUES (${url}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;
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
