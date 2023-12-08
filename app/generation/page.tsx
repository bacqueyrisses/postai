import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import PostcardContainerWrapper from "@/components/containers/PostcardContainerWrapper";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Generate",
};

interface IGenerationPage {
  searchParams: {
    city?: string;
    countryCode?: string;
  };
}
export default async function GenerationPage({
  searchParams,
}: IGenerationPage) {
  const { city, countryCode } = searchParams;
  if (!city || !countryCode) return notFound();

  return (
    <Suspense
      fallback={
        <div className={"space-x-4"}>
          <span>
            generating <br className={"inline sm:hidden"} /> your postcard
          </span>
          <br className={"inline sm:hidden"} />
          <Image
            src={"/sparkles.webp"}
            alt={"sparkles telemoji"}
            width="67"
            height="67"
            className={"inline w-11 h-11 md:w-20 md:h-20"}
            priority={true}
          />
        </div>
      }
    >
      <PostcardContainerWrapper countryCode={countryCode} city={city} />
    </Suspense>
  );
}
