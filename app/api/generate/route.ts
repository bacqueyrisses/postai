import { NextRequest, NextResponse } from "next/server";
import { model, replicate } from "@/lib/replicate";

export const maxDuration = 60;
export const revalidate = 0;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city");
  const prompt = `In the style of HISGH. Create a single vibrant, picturesque postcard image that captures the essence of ${city}. Incorporate iconic landmarks, the cityscape, or elements that symbolize its culture, history, and unique atmosphere. Emphasize vivid colors, bustling streets, and a lively ambiance to evoke a sense of wonder and excitement for anyone receiving this postcard.`;
  const width = 1024;
  const height = 768;

  try {
    const output: any = await replicate.run(model, {
      input: { prompt, height, width },
    });

    return NextResponse.json(output[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ created: "ERROR" });
  }
}
