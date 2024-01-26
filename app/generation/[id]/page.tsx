import { notFound } from "next/navigation";
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

  return (
    <PostcardContainer image={data.image || null} blur={data.blur || null} />
  );
}
