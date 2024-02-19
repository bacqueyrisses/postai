import { Metadata } from "next";
import FavoritesContainer from "@/components/containers/favorites-container";
import { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { LoadingCircle } from "@/components/icons";

export const metadata: Metadata = {
  title: "favorites",
};

export default async function FavoritesPage() {
  const user: User | null = await currentUser();
  if (!user) return;

  return (
    <Suspense
      fallback={<LoadingCircle className={"h-8 w-8 md:h-10 md:w-10"} />}
    >
      <FavoritesContainer user={user} />
    </Suspense>
  );
}
