import { NextResponse } from "next/server";
import { replicate, model } from "@/utils/replicate";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const prompt = `a picture of ${city}`;

  const output: any = await replicate.run(model, { input: { prompt } });

  return NextResponse.json(output[0]);
}
