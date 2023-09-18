import Image from "next/image";

interface ISendLinkByMail {
  city: string;
  size: number;
}
export default function EmailLinkButton({ city, size }: ISendLinkByMail) {
  return (
    <a
      className={
        "bg-slate-300/80 transition hover:bg-slate-300/90 w-1/5 h-3/4 rounded-3xl inline-flex justify-center items-center"
      }
      href={`mailto:x@y.com?subject=check out my postcard from ${city}!&body=hey! I generated a postcard just for you: https://pbxt.replicate.delivery/zbZHbwtsMf0RXiHmVZa6D9ey3DB7FUzffZcIISvaTy5ErIWGB/out-0.png`}
    >
      <Image
        width={size}
        height={size}
        src={
          "https://em-content.zobj.net/source/apple/354/love-letter_1f48c.png"
        }
        alt={"love letter emoji"}
      />
    </a>
  );
}
