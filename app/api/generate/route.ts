import { NextResponse } from "next/server";
import { replicate, model } from "@/lib/replicate";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const test = searchParams.get("test");

  if (test === "true") {
    return NextResponse.json(
      "https://pbxt.replicate.delivery/PEM77u5hZh50PpJ55i8Dct5sepOIEnu2vLxg0b7qeD55XOkRA/out-0.png",
    );
  }

  const city = searchParams.get("city");
  const prompt = `a picture of ${city}`;

  const output: any = await replicate.run(model, { input: { prompt } });

  return NextResponse.json(output[0]);
}
