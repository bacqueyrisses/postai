import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { favoriteUrl, userId } = await request.json();

  try {
    await kv.lpush(`${userId}_favorites`, favoriteUrl);
    return NextResponse.json({ created: "OK" });
  } catch (error) {
    return NextResponse.json({ created: "ERROR" });
  }
}
