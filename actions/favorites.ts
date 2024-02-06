"use server";

import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
import { CreateSchema, DeleteSchema } from "@/lib/schemas";
import { kv } from "@vercel/kv";
import { Favorite } from "@prisma/client";
import { revalidateTag } from "next/cache";

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
    revalidateTag("favorites");
  }
}

export async function deleteFavorite(
  id: Favorite["id"],
  image: Favorite["image"],
) {
  const validatedFields = DeleteSchema.safeParse({
    id,
    image,
  });

  if (!validatedFields.success)
    throw new Error("Couldn't validate Delete Favorite data.");

  try {
    await del(image);
    await kv.del(id);
    await sql`DELETE FROM "Favorite" WHERE "id" = ${id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  } finally {
    revalidateTag("favorites");
  }
}
