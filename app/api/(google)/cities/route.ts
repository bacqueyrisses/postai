import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
  );

  const data = await response.json();

  return NextResponse.json(data.predictions.slice(0, 3));
}
