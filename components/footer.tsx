import Link from "next/link";

export default function Footer() {
  return (
    <div className={"group flex flex-col items-center gap-1 pb-4 text-sm"}>
      <Link href={"https://www.enzo.codes"} target={"_blank"}>
        ✦ made with love by
        <span className={"group-hover:font-medium"}> enzo</span> ✦
      </Link>
    </div>
  );
}
