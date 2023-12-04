import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AuthObject } from "@clerk/backend";
import { revalidatePath } from "next/cache";
import { createFavorite } from "@/lib/actions";

export default authMiddleware({
  afterAuth(auth, request) {
    // early return for authenticated users from homepage
    const previousUrl = request.headers.get("referer");
    if (previousUrl === process.env.NEXT_SERVER_URL) return;

    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // handle users who aren't authenticated & have created a postcard
    if (!auth.userId && url && city && countryCode) {
      const nextResponse = NextResponse.redirect(
        new URL(`/sign-in`, request.url),
      );
      const cookiesValues = `${url}&${city}&${countryCode}`;
      nextResponse.cookies.set({ name: "newFavorite", value: cookiesValues });

      return nextResponse;
    }

    // handle users who aren't authenticated
    if (!auth.userId)
      return NextResponse.redirect(new URL("/sign-in", request.url));

    // handle authenticated users
    const newCookieValues = request.cookies.get("newFavorite")?.value;
    if (!newCookieValues) return NextResponse.next();

    const splitValues: string[] = newCookieValues?.split("&");

    void createFavorite({
      favoriteUrl: splitValues[0],
      userId: auth.userId!,
      city: splitValues[1],
      countryCode: splitValues[2],
    });

    const nextResponse = NextResponse.next();
    nextResponse.cookies.set("newFavorite", "");

    return nextResponse;
  },
});

export const config = {
  matcher: ["/favorites"],
};
