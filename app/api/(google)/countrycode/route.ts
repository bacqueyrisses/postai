import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
  );

  const data = await response.json();

  return NextResponse.json(data);
}
