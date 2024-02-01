"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Postcard from "@/components/postcard";
import { User } from "@clerk/nextjs/api";

interface IGeneratedContainer {
  id: string;
  image: string | null;
  blur: string | null;
  city: string;
  countryCode: string;
  saved: boolean;
}
export default function GeneratedContainer({
  id,
  image,
  blur,
  city,
  countryCode,
  saved,
}: IGeneratedContainer) {
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
      saved={saved}
    />
  );
}
