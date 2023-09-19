import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    // handle users who aren't authenticated & created a postcard
    if (!auth.userId && url && city && countryCode) {
      const nextResponse = NextResponse.redirect(new URL(`/sign-in`, req.url));
      const cookiesValues = `${url}&${city}&${countryCode}`;
      nextResponse.cookies.set({ name: "newFavorite", value: cookiesValues });

      return nextResponse;
    }

    // handle users who aren't authenticated
    if (!auth.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // handle authenticated users
    if (auth.userId) {
      const newCookieValues = req.cookies.get("newFavorite")?.value!;
      if (!newCookieValues) return NextResponse.next();

      const splitValues: string[] = newCookieValues?.split("&");

      const createNewFavorite = async () => {
        const response = await fetch(
          "http://localhost:3000/api/user/favorite/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              favoriteUrl: splitValues[0],
              userId: auth.userId,
              city: splitValues[1],
              countryCode: splitValues[2],
            }),
          },
        );

        if (response.ok) {
          await response.json();
          const nextResponse = NextResponse.redirect(
            "http://localhost:3000/favorites",
          );
          nextResponse.cookies.set("newFavorite", "");
          nextResponse.cookies.delete("newFavorite");
          return nextResponse;
        } else {
          console.error("Error creating favorite:", response.status);
        }
      };

      void createNewFavorite();
    }
  },
});

export const config = {
  matcher: ["/favorites"],
};
