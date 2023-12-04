import { Suspense } from "react";
import { FavoriteSkeleton } from "@/components/skeletons/FavoriteSkeleton";
import FavoritePostcardWrapper from "@/components/containers/FavoritePostcardsWrapper";

export const revalidate = 0;

export default async function FavoritesPage() {
  return (
    <div className={"flex gap-20 flex-wrap justify-center items-center py-14"}>
      <Suspense fallback={<FavoriteSkeleton />}>
        <FavoritePostcardWrapper />
      </Suspense>
    </div>
  );
}
