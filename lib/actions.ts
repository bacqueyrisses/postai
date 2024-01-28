"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from "next/cache";
import { put } from "@vercel/blob";
import { del } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const CreateSchema = z.object({
  image: z.string(),
  blur: z.string(),
  city: z.string(),
  countryCode: z.string(),
  userId: z.string(),
});

export async function createFavorite(formData: FormData) {
  const validatedFields = CreateSchema.safeParse({
    image: formData.get("image"),
    blur: formData.get("blur"),
    city: formData.get("city"),
    countryCode: formData.get("countryCode"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success)
    throw new Error("Couldn't validate Create Favorite data.");

  const { image, blur, city, countryCode, userId } = validatedFields.data;

  try {
    await sql`INSERT INTO "Favorite" (url, blur, city, "countryCode", "userId") VALUES (${image}, ${blur}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create favorite.");
  } finally {
    revalidateTag("favorites");
  }
}
export async function deleteFavorite(favoriteId: number, favoriteUrl: string) {
  try {
    // await del(favoriteUrl);
    await sql`DELETE FROM "Favorite" WHERE "id" = ${favoriteId};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  } finally {
    revalidateTag("favorites");
  }
}
