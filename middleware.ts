import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createFavorite } from "@/lib/actions";

export default authMiddleware({
  afterAuth(auth, request) {
    // early redirect to authenticated users coming from /generation and /home
    const fromHome =
      request.headers.get("referer") === process.env.NEXT_SERVER_URL;
    const fromGeneration = request.url.includes("generation");
    if (fromHome || fromGeneration) return NextResponse.next();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const url = searchParams.get("url");
    const blur = searchParams.get("blur");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // redirect users who aren't authenticated & have created a postcard
    if (!auth.userId && url && city && countryCode) {
      const nextResponse = NextResponse.redirect(
        new URL(`/sign-in`, request.url),
      );
      const cookiesValues = `${id}&${url}&${blur}&${city}&${countryCode}`;
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
    const formData = new FormData();
    formData.append("id", splitValues[0]);
    formData.append("image", splitValues[1]);
    formData.append("blur", splitValues[2]);
    formData.append("city", splitValues[3]);
    formData.append("countryCode", splitValues[4]);
    formData.append("userId", auth.userId!);

    void createFavorite(splitValues[0], formData);

    const nextResponse = NextResponse.next();
    nextResponse.cookies.set("newFavorite", "");

    return nextResponse;
  },
});

export const config = {
  matcher: ["/favorites", "/generation"],
};
