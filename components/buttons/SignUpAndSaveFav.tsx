"use client";
import Image from "next/image";
import Link from "next/link";
import { IPostcardContainer } from "@/components/containers/PostcardContainer";

interface ISignUpAndSaveToFav extends IPostcardContainer {
  size: number;
}
export default function SignUpAndSaveFav({
  favoriteUrl,
  size,
  city,
  countryCode,
}: ISignUpAndSaveToFav) {
  return (
    <Link
      href={`/favorites?url=${favoriteUrl}&city=${city}&countryCode=${countryCode}`}
      className={"my-auto"}
    >
      <Image
        width={size}
        height={size}
        src={
          "https://em-content.zobj.net/source/apple/354/floppy-disk_1f4be.png"
        }
        alt={"floppy disk emoji"}
        className={"hover:scale-105 transition-all"}
      />
    </Link>
  );
}
