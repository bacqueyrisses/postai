import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import FavoritePostcard from "@/components/containers/FavoritePostcard";
import axios from "axios";
import { NEXT_URL } from "@/lib/utils";

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
    `${NEXT_URL}/api/user/favorite/select-all?userId=${user?.id}`,
  );

  return (
    <div className={"flex gap-8 flex-wrap justify-center items-center"}>
      {data.length === 0 && "bite"}
      {data.length > 0 &&
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
