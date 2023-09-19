import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { favoriteUrl, userId, city, countryCode } = await request.json();

  try {
    const { rows } =
      await sql`INSERT INTO "Favorite" (url, city, "countryCode", "userId") VALUES (${favoriteUrl}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;

    return NextResponse.json(rows[0].id);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ created: "ERROR" });
  }
}
