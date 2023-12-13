"use client";
import DeleteButton from "@/components/buttons/DeleteButton";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import { deleteFavorite } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface IFavoritePostcard {
  favorite: {
    id: number;
    url: string;
    city: string;
    countryCode: string;
    user: string;
  };
}

export default function FavoritePostcard({
  favorite: { id, url, city, countryCode },
}: IFavoritePostcard) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteButton = async (id: number) => {
    setDeleting(true);
    router.refresh();
    void deleteFavorite(id, url);
  };

  return (
    <PostcardContainer
      city={city}
      countryCode={countryCode}
      favoriteUrl={url}
      deleting={deleting}
    >
      <EmailLinkButton
        city={city}
        countryCode={countryCode}
        favoriteUrl={url}
        size={38}
      />
      <CopyLinkButton
        favoriteUrl={url}
        countryCode={countryCode}
        city={city}
        size={25}
      />
      <DeleteButton
        handleDeleteButton={() => handleDeleteButton(id)}
        size={23}
      />
    </PostcardContainer>
  );
}
