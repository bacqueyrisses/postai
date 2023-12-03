import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import FavoritePostcard from "@/components/containers/FavoritePostcard";

import { unstable_noStore as noStore } from "next/cache";

type Favorites = {
  id: number;
  url: string;
  city: string;
  countryCode: string;
  userId: string;
};

async function fetchFavorites(user: User) {
  noStore();
  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/api/user/favorite/select-all?userId=${user?.id}`,
      { next: { revalidate: 0 } },
    );
    const data: Favorites[] = await response.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data.");
  }
}

export default async function FavoritesPage() {
  const user: User | null = await currentUser();
  if (!user) return;

  const data = await fetchFavorites(user);

  return (
    <div className={"flex gap-8 flex-wrap justify-center items-center"}>
      {(!data || data.length === 0) && "No cards."}
      {data?.length > 0 &&
        data.map((favorite) => (
          <FavoritePostcard
            key={favorite.id}
            favorite={{
              id: favorite.id,
              url: favorite.url,
              city: favorite.city,
              countryCode: favorite.countryCode,
            }}
          />
        ))}
    </div>
  );
}
