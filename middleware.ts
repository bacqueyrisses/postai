import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createFavorite } from "@/actions/favorites";
import { sql } from "@vercel/postgres";

export default authMiddleware({
  afterAuth(auth, request) {
    // early redirect to authenticated users coming from /generation and /home
    const fromHome =
      request.headers.get("referer") === process.env.NEXT_SERVER_URL;
    const fromGeneration = request.url.includes("generation");
    if (fromHome || fromGeneration) return NextResponse.next();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const image = searchParams.get("image");
    const blur = searchParams.get("blur");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // redirect users who aren't authenticated & have created a postcard
    if (!auth.userId && image && city && countryCode) {
      const nextResponse = NextResponse.redirect(
        new URL(`/sign-in`, request.url),
      );
      const cookiesValues = `${id}&${image}&${blur}&${city}&${countryCode}`;
      nextResponse.cookies.set({ name: "newFavorite", value: cookiesValues });

      return nextResponse;
    }

    // redirect users who aren't authenticated
    if (!auth.userId)
      return NextResponse.redirect(new URL("/sign-in", request.url));

    // redirect authenticated users
    const newCookieValues = request.cookies.get("newFavorite")?.value;
    if (!newCookieValues) return NextResponse.next();

    const splitValues: string[] = newCookieValues?.split("&");
    // const formData = new FormData();
    // formData.append("id", splitValues[0]);
    // formData.append("image", splitValues[1]);
    // formData.append("blur", splitValues[2]);
    // formData.append("city", splitValues[3]);
    // formData.append("countryCode", splitValues[4]);
    // formData.append("userId", auth.userId!);

    void create({
      id: splitValues[0],
      image: splitValues[1],
      blur: splitValues[2],
      city: splitValues[3],
      countryCode: splitValues[4],
      userId: auth.userId!,
    });

    const nextResponse = NextResponse.next();
    nextResponse.cookies.set("newFavorite", "");

    return nextResponse;
  },
});

async function create({ id, image, blur, city, countryCode, userId }: any) {
  try {
    await sql`INSERT INTO "Favorite" (id, image, blur, city, "countryCode", "userId") VALUES (${id}, ${image}, ${blur}, ${city}, ${countryCode}, ${userId}) RETURNING "id";`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create favorite.");
  }
}

export const config = {
  matcher: ["/favorites"],
};
