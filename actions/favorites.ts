"use server";

import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
import { CreateSchema } from "@/lib/schemas";
import { kv } from "@vercel/kv";
import { revalidateFavorites } from "@/lib/database";
import { Favorite } from "@prisma/client";

export async function createFavorite({
  id,
  image,
  blur,
  city,
  countryCode,
  userId,
}: Omit<Favorite, "createdAt">) {
  const validatedFields = CreateSchema.safeParse({
    id,
    image,
    blur,
    city,
    countryCode,
    userId,
  });

  if (!validatedFields.success)
    throw new Error("Couldn't validate Create Favorite data.");

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
  id: Favorite["id"],
  image: Favorite["image"],
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
