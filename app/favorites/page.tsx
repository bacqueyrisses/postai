import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import FavoritePostcard from "@/components/containers/FavoritePostcard";
import axios from "axios";

export const dynamic = "force-dynamic";

type Favorites = {
  id: number;
  url: string;
  city: string;
  countryCode: string;
  userId: string;
};

async function getFavorites(userId: string) {}
export default async function FavoritesPage() {
  const user: User | null = await currentUser();

  const data: Favorites[] = await axios
    .get(
      `${process.env.NEXT_SERVER_URL}/api/user/favorite/select-all?userId=${user?.id}`,
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

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
