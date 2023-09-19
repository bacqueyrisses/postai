import Image from "next/image";
import Link from "next/link";

interface ISignUpAndSaveToFav {
  favoriteUrl: string;
  size: number;
  city: string;
  countryCode: string;
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
      className={
        "bg-slate-300/80 transition hover:bg-slate-300/90 w-1/5 h-3/4 rounded-3xl inline-flex justify-center items-center"
      }
    >
      <Image
        width={size}
        height={size}
        src={
          "https://em-content.zobj.net/source/apple/354/floppy-disk_1f4be.png"
        }
        alt={"floppy disk emoji"}
      />
    </Link>
  );
}
