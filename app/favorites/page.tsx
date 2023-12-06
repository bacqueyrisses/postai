import { Suspense } from "react";

import FavoritePostcardWrapper from "@/components/containers/FavoritePostcardsWrapper";
import { FavoriteSkeleton } from "@/components/Skeletons";

export const revalidate = 0;

export default async function FavoritesPage() {
  return (
    <div
      className={
        "flex sm:gap-20 gap-16 flex-wrap justify-center items-center py-14"
      }
    >
      <Suspense fallback={<FavoriteSkeleton />}>
        <FavoritePostcardWrapper />
      </Suspense>
    </div>
  );
}
