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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
            />
          </svg>

          <span className={"w-24 md:w-28 -mr-3"}>My postcards</span>
        </Link>
      </div>
    </div>
  );
}
