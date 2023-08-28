import Image from "next/image";
import Link from "next/link";
import { PageType } from "@/types/global";

interface IHeader {
  setPageDisplayed: (newPage: PageType) => void;
  pageDisplayed: PageType;
  setPostcardLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({
  setPageDisplayed,
  pageDisplayed,
  setPostcardLoading,
}: IHeader) {
  const handleClick = () => {
    const newPage = pageDisplayed === "locations" ? "postcard" : "locations";
    setPageDisplayed(newPage);
    setTimeout(() => {
      setPostcardLoading(false);
    }, 3000);
  };

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

      <button
        onClick={handleClick}
        className={
          "w-36 md:w-44 group inline-flex justify-center items-center gap-1 bg-emerald-500 rounded-3xl py-2 md:py-2.5 text-white hover:bg-blue-500 transition-colors cursor-pointer duration-300 text-sm md:text-base"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-spin group-hover:animate-once group-hover:animate-ease-in-out group-hover:animate-duration-[1200ms]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <span className={"w-24 md:w-28 text-start -mr-1"}>
          {pageDisplayed === "locations" ? "New Postcard" : "New Location"}
        </span>
      </button>
    </div>
  );
}
