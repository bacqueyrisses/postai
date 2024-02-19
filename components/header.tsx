import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className={"flex items-center justify-between pt-5"}>
      <Link
        href={"/"}
        className={
          "flex items-center text-2xl font-semibold italic md:text-3xl"
        }
      >
        <Image
          src={"/logo.webp"}
          alt={"logo postai"}
          width={50}
          height={50}
          className={"mt-1 inline"}
        />
        <div>postai</div>
      </Link>

      <div className={"flex items-center gap-2.5 sm:gap-4"}>
        <UserButton afterSignOutUrl="/" />
        <Link
          href={"/favorites"}
          className={
            "group inline-flex w-32 cursor-pointer items-center justify-center gap-1.5 rounded-3xl bg-emerald-500 py-2 text-sm text-white transition-colors duration-300 hover:bg-blue-500 md:w-44 md:py-2.5 md:text-base"
          }
        >
          <span className={"w-24 text-center md:w-32 md:text-lg"}>
            my postcards
          </span>
        </Link>
      </div>
    </div>
  );
}
