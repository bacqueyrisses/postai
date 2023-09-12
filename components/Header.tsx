import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // const handleClick = async () => {
  //   const newPage = pageDisplayed === "locations" ? "postcard" : "locations";
  //   setPageDisplayed(newPage);
  //   const { data } = await axios.get("/api/replicate");
  //   setImgUrl(data);
  //   setPostcardLoading(false);
  // };

  return (
    <div className={"flex items-center justify-between pt-5"}>
      <Link
        href={"/"}
        // onClick={() => setPageDisplayed("locations")}
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

      <Link
        href={"/"}
        className={
          "w-36 md:w-44 group inline-flex justify-center items-center gap-1.5 bg-emerald-500 rounded-3xl py-2 md:py-2.5 text-white hover:bg-blue-500 transition-colors cursor-pointer duration-300 text-sm md:text-base"
        }
      >
        {/*<svg*/}
        {/*  xmlns="http://www.w3.org/2000/svg"*/}
        {/*  fill="none"*/}
        {/*  viewBox="0 0 24 24"*/}
        {/*  strokeWidth="1.5"*/}
        {/*  stroke="currentColor"*/}
        {/*  className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-spin group-hover:animate-once group-hover:animate-ease-in-out group-hover:animate-duration-[1200ms]"*/}
        {/*>*/}
        {/*  <path*/}
        {/*    strokeLinecap="round"*/}
        {/*    strokeLinejoin="round"*/}
        {/*    d="M12 6v12m6-6H6"*/}
        {/*  />*/}
        {/*</svg>*/}

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
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>

        <span className={"w-24 md:w-28 -mr-3"}>My postcards</span>
        {/*<span className={"w-24 md:w-28 text-start -mr-1"}>*/}
        {/*  {pageDisplayed === "locations" ? "New Postcard" : "New Location"}*/}
        {/*</span>*/}
      </Link>
    </div>
  );
}
