import { NextRequest, NextResponse } from "next/server";
import { replicate, model } from "@/lib/replicate";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const test = searchParams.get("test");

  if (test === "true") {
    return NextResponse.json("./postcard.jpg");
  }

  const city = searchParams.get("city");
  const prompt = `a postcard of ${city}`;

  try {
    const output: any = await replicate.run(model, { input: { prompt } });

    revalidatePath("/favorites");

    return NextResponse.json(output[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ created: "ERROR" });
  }
}
