import { notFound } from "next/navigation";
import { Metadata } from "next";
import { kv } from "@vercel/kv";
import GeneratedContainer from "@/components/containers/generated-container";
import { WavyBackground } from "@/components/ui/wavy-background";
import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

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
  const { id } = params;
  const data = await kv.hgetall<{
    city: string;
    countryCode: string;
    image?: string;
    blur?: string;
  }>(id);

  if (!data || !id) notFound();

  const {
    rows: [{ count }],
  } = await sql`SELECT COUNT(*) as count FROM "Favorite" WHERE id = ${id};`;
  const saved = Boolean(+count);

  return (
    <GeneratedContainer
      id={id}
      image={data.image || null}
      blur={data.blur || null}
      city={data.city}
      countryCode={data.countryCode}
      saved={saved}
    />
  );
}
