"use client";
import { redirect, useSearchParams } from "next/navigation";
import PostcardContainer from "@/components/containers/PostcardContainer";

export default function LinkPage({}) {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");
  const user = searchParams.get("user");

  if (!url || !city || !countryCode) redirect("/");

  return (
    <div>
      <PostcardContainer
        city={city}
        countryCode={countryCode}
        favoriteUrl={url}
      >
        {user && (
          <div className={"italic font-light flex items-end"}>
            created and shared by {user.toLowerCase()}
          </div>
        )}
      </PostcardContainer>
    </div>
  );
}
