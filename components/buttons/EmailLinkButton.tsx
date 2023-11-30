import Image from "next/image";

interface ISendLinkByMail {
  city: string;
  countryCode: string;
  favoriteUrl: string;
  size: number;
}
export default function EmailLinkButton({
  city,
  countryCode,
  favoriteUrl,
  size,
}: ISendLinkByMail) {
  const encodedCity = encodeURIComponent(city);
  const encodedCountryCode = encodeURIComponent(countryCode);
  const encodedFavoriteUrl = encodeURIComponent(favoriteUrl);

  const link = `${process.env.NEXT_PUBLIC_URL}/link?city=${encodedCity}&countryCode=${encodedCountryCode}&url=${encodedFavoriteUrl}`;

  const mailtoBody = `hey! I generated a postcard just for you: ${link}`;

  const mailtoLink = `mailto:?subject=Check out my postcard from ${encodedCity}!&body=${encodeURIComponent(
    mailtoBody,
  )}`;

  return (
    <a
      className={
        "bg-slate-300/80 transition hover:bg-slate-300/90 w-1/5 h-3/4 rounded-3xl inline-flex justify-center items-center"
      }
      href={mailtoLink}
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
