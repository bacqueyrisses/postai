"use client";
import { useEffect, useState } from "react";
import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import EmailLinkButton from "@/components/buttons/EmailLinkButton";
import PostcardContainer from "@/components/containers/PostcardContainer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface INewFavorite {
  url: string;
  size: number;
  city: string;
  countryCode: string;
}
export default function NewFavoritePostcard() {
  const router = useRouter();
  const { userId } = useAuth();
  const [newFavorite, setNewFavorite] = useState<INewFavorite | null>(null);

  const createNewFavorite = async (favorite: INewFavorite) => {
    await axios.post("http://localhost:3000/api/user/favorite/create", {
      userId,
      favoriteUrl: favorite.url,
      city: favorite.city,
      countryCode: favorite.countryCode,
    });
  };

  useEffect(() => {
    let savedFavorite = localStorage.getItem("savedFavorite");
    if (!savedFavorite) return;

    const savedFavoriteParsed = JSON.parse(savedFavorite);
    savedFavorite && setNewFavorite(savedFavoriteParsed);
    void createNewFavorite(savedFavoriteParsed);

    localStorage.removeItem("savedFavorite");
    router.prefetch("/favorites");
  }, []);

  return newFavorite ? (
    <PostcardContainer
      city={newFavorite.city}
      countryCode={newFavorite.countryCode}
      favoriteUrl={newFavorite.url}
    >
      <EmailLinkButton city={"test"} size={50} />
      <CopyLinkButton
        city={newFavorite.city}
        countryCode={newFavorite.countryCode}
        favoriteUrl={newFavorite.url}
        size={35}
      />
      {/*<DeleteButton*/}
      {/*  handleDeleteButton={() => handleDeleteButton(id)}*/}
      {/*  size={27}*/}
      {/*/>*/}
    </PostcardContainer>
  ) : null;
}
