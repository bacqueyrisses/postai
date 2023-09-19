import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { rows } =
      await sql`SELECT * FROM "Favorite" WHERE "userId" = ${userId} ORDER BY "id" DESC;`;

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ selected: "ERROR" });
  }
}
