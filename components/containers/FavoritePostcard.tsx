"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
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

export default function FavoritePostcard({
  favorite: { id, url, city, countryCode },
}: IFavoritePostcard) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);

  const handleDeleteButton = async (id: number) => {
    setIsActive(false);
    await axios.delete(
      `http://localhost:3000/api/user/favorite/delete?favoriteId=${id}`,
    );
    router.prefetch("/containers");
  };

  return isActive ? (
    <PostcardContainer city={city} countryCode={countryCode} url={url}>
      <EmailLinkButton city={city} size={35} />
      <CopyLinkButton
        url={url}
        countryCode={countryCode}
        city={city}
        size={25}
      />
      <DeleteButton
        handleDeleteButton={() => handleDeleteButton(id)}
        size={22}
      />
    </PostcardContainer>
  ) : null;
}
