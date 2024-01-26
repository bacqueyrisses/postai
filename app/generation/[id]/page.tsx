import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import PostcardContainerWrapper from "@/components/containers/PostcardContainerWrapper";
import { Metadata } from "next";
import { kv } from "@vercel/kv";
import PhotoBooth from "@/components/photo-booth";

// Known next.js issue: https://github.com/vercel/next.js/issues/59753
export const maxDuration = 300;
export const metadata: Metadata = {
  title: "generate",
};

interface IGenerationPage {
  searchParams: {
    city?: string;
    countryCode?: string;
  };
}

export default async function GenerationPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await kv.hgetall<{
    city: string;
    countryCode?: string;
    image?: string;
  }>(params.id);

  if (!data) {
    notFound();
  }

  return <PhotoBooth image={data.image || null} />;
  // <Suspense
  //   fallback={
  //     <div className={"space-x-4"}>
  //       <span>
  //         generating <br className={"inline sm:hidden"} /> your postcard
  //       </span>
  //       <br className={"inline sm:hidden"} />
  //       <Image
  //         src={"/sparkles.webp"}
  //         alt={"sparkles telemoji"}
  //         width="67"
  //         height="67"
  //         className={"inline w-11 h-11 md:w-20 md:h-20"}
  //         priority={true}
  //       />
  //     </div>
  //   }
  // >
  // <PostcardContainerWrapper countryCode={countryCode} city={city} />;
  // </Suspense>
}
