import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import SaveButtons from "@/components/buttons/SaveButtons";
import { auth } from "@clerk/nextjs";
import { getPrompt, height, model, replicate, width } from "@/lib/replicate";

interface IPostcardContainerWrapper {
  city: string;
  countryCode: string;
}

const generatedPostcard = async ({
  city,
}: Pick<IPostcardContainerWrapper, "city">) => {
  "use server";
  const prompt = getPrompt(city);

  try {
    const output: any = await replicate.run(model, {
      input: { prompt, height, width },
    });

    return output[0];
  } catch (error) {
    console.log(error);
  }
};
export default async function PostcardContainerWrapper({
  city,
  countryCode,
}: IPostcardContainerWrapper) {
  const favoriteUrl = await generatedPostcard({ city });
  const { userId } = auth();

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
        userId={userId}
      />
    </PostcardContainer>
  );
}
