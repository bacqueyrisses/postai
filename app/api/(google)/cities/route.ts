import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
    );

    const data = await response.json();

    return NextResponse.json(data.predictions);
  } catch (error) {
    console.log(error);
    return NextResponse.json("ERROR");
  }
}
