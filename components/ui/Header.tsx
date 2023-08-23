import Image from "next/image";

export default function Header() {
  return (
    <div className={"flex items-center justify-between pt-5"}>
      <div
        className={`text-3xl flex items-center gap-0.5 italic font-semibold`}
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
      </div>
      <div className={"flex gap-14 items-center"}>
        <div
          className={
            "group flex items-center gap-1 bg-emerald-500 rounded-3xl px-5 py-2.5 text-white hover:bg-blue-500 transition-colors cursor-pointer duration-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 group-hover:animate-spin group-hover:animate-once group-hover:animate-ease-in-out group-hover:animate-duration-[1200ms]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <span>New Postcard</span>
        </div>
      </div>
    </div>
  );
}
