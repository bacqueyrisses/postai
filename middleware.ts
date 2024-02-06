import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createFavorite } from "@/lib/actions/favorites";

export default authMiddleware({
  afterAuth(auth, request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const image = searchParams.get("image");
    const blur = searchParams.get("blur");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // redirect users not signed in & that have saved a postcard
    if (!auth.userId && image && city && countryCode) {
      const nextResponse = NextResponse.redirect(
        new URL(`/sign-in`, request.url),
      );
      const cookiesValues = `${id}&${image}&${blur}&${city}&${countryCode}`;
      nextResponse.cookies.set({ name: "newFavorite", value: cookiesValues });

      return nextResponse;
    }

    // redirect users not signed in & that have not saved a postcard
    if (!auth.userId && !image && !city && !countryCode)
      return NextResponse.redirect(new URL(`/sign-in`, request.url));

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
