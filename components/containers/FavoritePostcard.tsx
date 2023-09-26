"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteButton from "@/components/buttons/DeleteButton";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import { revalidatePath } from "next/cache";

interface IFavoritePostcard {
  favorite: {
    id: number;
    url: string;
    city: string;
    countryCode: string;
  };
}

export default function FavoritePostcard({
  favorite: { id, url, city, countryCode },
}: IFavoritePostcard) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);

  const handleDeleteButton = async (id: number) => {
    setIsActive(false);

    await axios
      .delete(`http://localhost:3000/api/user/favorite/delete?favoriteId=${id}`)
      .catch((error) => console.error(error));

    // revalidatePath("/favorites");

    // router.refresh();
  };

  return isActive ? (
    <PostcardContainer city={city} countryCode={countryCode} favoriteUrl={url}>
      <EmailLinkButton city={city} size={50} />
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
