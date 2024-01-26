import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import PostcardContainerWrapper from "@/components/containers/PostcardContainerWrapper";
import { Metadata } from "next";
import { kv } from "@vercel/kv";
import PostcardContainer from "@/components/postcard-container";

// Known next.js issue: https://github.com/vercel/next.js/issues/59753
export const maxDuration = 300;
export const revalidate = 0;
export const metadata: Metadata = {
  title: "generate",
};

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
    blur?: string;
  }>(params.id);

  if (!data) notFound();

  console.log(data);

  return (
    <PostcardContainer image={data.image || null} blur={data.blur || null} />
  );
}
