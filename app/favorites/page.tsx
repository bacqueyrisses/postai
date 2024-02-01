import { Metadata } from "next";
import FavoritesContainer from "@/components/containers/favorites-container";
import { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";
import { getCachedFavorites } from "@/lib/database";

export const metadata: Metadata = {
  title: "favorites",
};

export default async function FavoritesPage() {
  const user: User | null = await currentUser();
  if (!user) return;

  const favorites = await getCachedFavorites(user);

  return <FavoritesContainer favorites={favorites} />;
}
