import { Metadata } from "next";
import FavoritesContainer from "@/components/containers/favorites-container";

export const metadata: Metadata = {
  title: "favorites",
};

export default async function FavoritesPage() {
  return <FavoritesContainer />;
}
