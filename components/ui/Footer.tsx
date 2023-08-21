import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={"pb-4 flex flex-col items-center gap-1 pt-6 text-sm"}>
      <Link href={"https://www.bacqueyrisses.dev/"} target={"_blank"}>
        ✦ Made with love by Enzo ✦
      </Link>
      <Link
        href={"https://www.buymeacoffee.com/bacqueyrisses"}
        target={"_blank"}
      >
        <Image
          src={"/buymeacoffee.png"}
          width={80}
          height={10}
          alt={"Enzo Bacqueyrisses' Buy Me a Coffee logo"}
        />
      </Link>
    </div>
  );
}
