"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostcardDeleteAlert from "@/components/favorites/PostcardDeleteAlert";
import countryCodeEmoji from "country-code-emoji";
import CopyLinkToClipboard from "@/components/general/CopyLinkToClipboard";
import { Link2 } from "lucide-react";

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
    router.prefetch("/favorites");
  };

  return isActive ? (
    <div className={"flex flex-col gap-3 justify-center items-center"}>
      <div className={"text-xl"}>{`${city} ${countryCodeEmoji(
        countryCode,
      )}`}</div>
      <Image
        src={url}
        alt={"virtual postcard"}
        width={320}
        height={320}
        className={"rounded-xl cursor-pointer"}
      />
      <div className={"flex gap-4"}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-neutral-600 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
        <CopyLinkToClipboard
          url={url}
          countryCode={countryCode}
          city={city}
          className={"w-6 h-6"}
        />
        <PostcardDeleteAlert
          handleDeleteButton={() => handleDeleteButton(id)}
        />
      </div>
    </div>
  ) : null;
}
