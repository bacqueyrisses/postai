import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AuthObject } from "@clerk/backend";
import { NEXT_URL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default authMiddleware({
  afterAuth(auth, request) {
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

    void createNewFavorite(newCookieValues, auth);

    revalidatePath("/favorites");

    const nextResponse = NextResponse.next();
    nextResponse.cookies.set("newFavorite", "");

    return nextResponse;
  },
});

async function createNewFavorite(
  newCookieValues: string,
  auth: AuthObject & { isPublicRoute: boolean; isApiRoute: boolean },
) {
  const splitValues: string[] = newCookieValues?.split("&");

  const response = await fetch(`${NEXT_URL}/api/user/favorite/create`, {
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
  });

  if (!response.ok) console.error("Error creating favorite:", response.status);
}

export const config = {
  matcher: ["/favorites"],
};
