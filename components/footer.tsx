import Link from "next/link";

export default function Footer() {
  return (
    <div className={"pb-4 flex flex-col items-center gap-1 text-sm group"}>
      <Link href={"https://www.bacqueyrisses.dev/"} target={"_blank"}>
        ✦ made with love by
        <span className={"group-hover:font-medium"}> enzo</span> ✦
      </Link>
    </div>
  );
}
