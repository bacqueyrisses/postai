import { NextRequest, NextResponse } from "next/server";
import { model, replicate } from "@/lib/replicate";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city");
  const prompt = `a great and unique postcard of ${city}, I want you to make a cliché postcard of that city.`;

  try {
    const output: any = await replicate.run(model, { input: { prompt } });

    revalidatePath("/favorites");

    return NextResponse.json(output[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ created: "ERROR" });
  }
}
