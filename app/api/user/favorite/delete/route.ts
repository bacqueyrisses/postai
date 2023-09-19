import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const favoriteId = searchParams.get("favoriteId");

  try {
    const { rows } =
      await sql`DELETE FROM "Favorite" WHERE "id" = ${favoriteId};`;

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ deleted: "ERROR" });
  }
}
