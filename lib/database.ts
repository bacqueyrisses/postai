import { sql } from "@vercel/postgres";
import { User } from "@clerk/nextjs/api";
import { Favorite } from "@prisma/client";

export async function getFavorites(user: User) {
  try {
    const data =
      await sql<Favorite>`SELECT * FROM "Favorite" WHERE "userId" = ${user.id} ORDER BY "id" DESC;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}
