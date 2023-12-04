"use client";
import { useState } from "react";
import DeleteButton from "@/components/buttons/DeleteButton";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { deleteFavorite } from "@/lib/actions";

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
  const handleDeleteButton = async (id: number) => {
    void deleteFavorite(id);
  };

  return (
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
  );
}
