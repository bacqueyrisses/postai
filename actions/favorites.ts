"use server";

import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
import { CreateSchema } from "@/lib/schemas";
import { Postcard } from "@/types/definitions";
import { kv } from "@vercel/kv";
import { revalidateFavorites } from "@/lib/database";

export async function createFavorite(id: Postcard["id"], formData: FormData) {
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
    await sql`INSERT INTO "Favorite" (id, image, blur, city, "countryCode", "userId") VALUES (${id}, ${image}, ${blur}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create favorite.");
  } finally {
    revalidateFavorites();
  }
}

export async function deleteFavorite(
  id: Postcard["image"],
  image: Postcard["image"],
) {
  try {
    await del(image);
    await kv.del(id);
    await sql`DELETE FROM "Favorite" WHERE "id" = ${id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  } finally {
    revalidateFavorites();
  }
}
