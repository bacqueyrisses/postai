import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createFavorite } from "@/actions/favorites";
import { getCachedFavorites } from "@/lib/database";

export default authMiddleware({
  afterAuth(auth, request) {
    // early redirect to sign in users coming from /generation and /home
    const fromHome =
      request.headers.get("referer") === process.env.NEXT_SERVER_URL;
    const fromGeneration = request.url.includes("generation");
    if (auth.userId && (fromHome || fromGeneration))
      return NextResponse.redirect(new URL("/favorites", request.url));

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const image = searchParams.get("image");
    const blur = searchParams.get("blur");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // redirect users not signed in & that have created a postcard
    if (!auth.userId && image && city && countryCode) {
      const nextResponse = NextResponse.redirect(
        new URL(`/sign-in`, request.url),
      );
      const cookiesValues = `${id}&${image}&${blur}&${city}&${countryCode}`;
      nextResponse.cookies.set({ name: "newFavorite", value: cookiesValues });

      return nextResponse;
    }

    // redirect user not signed in
    if (!auth.userId)
      return NextResponse.redirect(new URL("/sign-in", request.url));

    // redirect new signed in/signed-up users & create favorite
    const newCookieValues = request.cookies.get("newFavorite")?.value;
    if (!newCookieValues) return NextResponse.next();

    const splitValues: string[] = newCookieValues?.split("&");

    void createFavorite({
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

export const config = {
  matcher: ["/favorites"],
};
