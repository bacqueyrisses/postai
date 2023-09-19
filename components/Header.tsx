import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className={"flex items-center justify-between pt-5"}>
      <Link
        href={"/"}
        className={
          "text-2xl md:text-3xl flex items-center italic font-semibold"
        }
      >
        {" "}
        <Image
          src={"/logo.webp"}
          alt={"logo postai"}
          width={50}
          height={50}
          className={"inline mt-1"}
        />
        <div>postai</div>
      </Link>

      <div className={"flex items-center gap-4"}>
        <UserButton afterSignOutUrl="/" />

        <Link
          href={"/favorites"}
          className={
            "w-36 md:w-44 group inline-flex justify-center items-center gap-1.5 bg-emerald-500 rounded-3xl py-2 md:py-2.5 text-white hover:bg-blue-500 transition-colors cursor-pointer duration-300 text-sm md:text-base"
          }
        >
          <span className={"w-24 md:w-28 text-center"}>my postcards</span>
        </Link>
      </div>
    </div>
  );
}
