import PostcardContainer from "@/components/containers/PostcardContainer";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Link",
};

interface ILinkPage {
  searchParams: {
    url?: string;
    city?: string;
    countryCode?: string;
    user?: string;
  };
}

export default function LinkPage({ searchParams }: ILinkPage) {
  const { url, city, countryCode, user } = searchParams;

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
