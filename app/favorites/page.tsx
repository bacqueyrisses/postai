import { Metadata } from "next";
import FavoritesContainer from "@/components/favorites-container";

export const metadata: Metadata = {
  title: "favorites",
};

export default async function FavoritesPage() {
  return <FavoritesContainer />;
}
