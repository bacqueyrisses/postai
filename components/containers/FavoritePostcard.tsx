"use client";
import axios from "axios";
import { useState } from "react";
import DeleteButton from "@/components/buttons/DeleteButton";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";

interface IFavoritePostcard {
  favorite: {
    id: number;
    url: string;
    city: string;
    countryCode: string;
  };
}
async function deleteFavorite(favoriteId: number) {
  try {
    await fetch(`/api/user/favorite/delete?favoriteId=${favoriteId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}

export default function FavoritePostcard({
  favorite: { id, url, city, countryCode },
}: IFavoritePostcard) {
  // const router = useRouter();
  const [isActive, setIsActive] = useState(true);

  const handleDeleteButton = async (id: number) => {
    setIsActive(false);

    await deleteFavorite(id);

    // router.refresh();
  };

  return isActive ? (
    <PostcardContainer city={city} countryCode={countryCode} favoriteUrl={url}>
      <EmailLinkButton
        city={city}
        countryCode={countryCode}
        favoriteUrl={url}
        size={50}
      />
      <CopyLinkButton
        favoriteUrl={url}
        countryCode={countryCode}
        city={city}
        size={35}
      />
      <DeleteButton
        handleDeleteButton={() => handleDeleteButton(id)}
        size={27}
      />
    </PostcardContainer>
  ) : null;
}
