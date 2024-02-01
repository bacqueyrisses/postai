"use client";

import { useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import SaveButton from "@/components/buttons/save-button";
import { useUser } from "@clerk/nextjs";
import Postcard from "@/components/postcard";

export default function GeneratedContainer({
  id,
  image,
  blur,
  city,
  countryCode,
}: {
  id: string;
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
}) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!blur) {
      interval = setInterval(() => {
        router.refresh();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [blur, router]);

  return (
    <Postcard
      id={id}
      image={image}
      blur={blur}
      city={city}
      countryCode={countryCode}
      userId={user?.id || null}
    />
  );
}
