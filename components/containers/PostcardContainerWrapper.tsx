import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveButtons from "@/components/buttons/SaveButtons";

export const revalidate = 0;

interface IPostcardContainerWrapper {
  city: string;
  countryCode: string;
}
export default async function PostcardContainerWrapper({
  city,
  countryCode,
}: IPostcardContainerWrapper) {
  const fetchGeneratedPostcard = async () => {
    const apiUrl = `${
      process.env.NEXT_SERVER_URL
    }/api/generate?city=${encodeURIComponent(city!)}`;

    try {
      const response = await fetch(apiUrl);
      const output: string = await response.json();
      return output;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data.");
    }
  };

  const favoriteUrl = await fetchGeneratedPostcard();

  return (
    <PostcardContainer
      city={city!}
      countryCode={countryCode!}
      favoriteUrl={favoriteUrl}
    >
      <EmailLinkButton
        favoriteUrl={favoriteUrl}
        countryCode={countryCode!}
        size={38}
        city={city!}
      />

      <CopyLinkButton
        favoriteUrl={favoriteUrl}
        countryCode={countryCode!}
        city={city!}
        size={25}
      />
      <SaveButtons
        size={23}
        favoriteUrl={favoriteUrl}
        city={city!}
        countryCode={countryCode!}
      />
    </PostcardContainer>
  );
}
