import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveButtons from "@/components/buttons/SaveButtons";
import { model, replicate } from "@/lib/replicate";

export const revalidate = 0;
export const maxDuration = 60;

interface IPostcardContainerWrapper {
  city: string;
  countryCode: string;
}
export default async function PostcardContainerWrapper({
  city,
  countryCode,
}: IPostcardContainerWrapper) {
  const fetchGeneratedPostcard = async () => {
    const prompt = `In the style of HISGH. Create a single vibrant, picturesque postcard image that captures the essence of ${city}. Incorporate iconic landmarks, the cityscape, or elements that symbolize its culture, history, and unique atmosphere. Emphasize vivid colors, bustling streets, and a lively ambiance to evoke a sense of wonder and excitement for anyone receiving this postcard.`;
    const width = 1024;
    const height = 768;

    try {
      const output: any = await replicate.run(model, {
        input: { prompt, height, width },
      });

      return output[0];
    } catch (error) {
      console.log(error);
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
