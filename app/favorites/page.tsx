import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import FavoritePostcard from "@/components/favorites/FavoritePostcard";
import axios from "axios";

export const revalidate = 1;

type Favorites = {
  id: number;
  url: string;
  city: string;
  countryCode: string;
  userId: string;
};

interface IData {
  data: Favorites[];
}

export default async function FavoritesPage() {
  const user: User | null = await currentUser();
  const { data }: IData = await axios.get(
    `http://localhost:3000/api/user/favorite/select-all?userId=${user?.id}`,
  );

  return (
    <div className={"flex gap-4 flex-wrap"}>
      {data &&
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
