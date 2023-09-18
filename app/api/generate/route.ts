import { NextRequest, NextResponse } from "next/server";
import { replicate, model } from "@/lib/replicate";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const test = searchParams.get("test");

  if (test === "true") {
    return NextResponse.json("./postcard.jpg");
  }

  const city = searchParams.get("city");
  const prompt = `a picture of ${city}`;

  const output: any = await replicate.run(model, { input: { prompt } });

  return NextResponse.json(output[0]);
}
