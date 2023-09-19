// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import { ReactNode } from "react";

interface IPostcardContainer {
  city: string;
  countryCode: string;
  favoriteUrl: string;
  children: ReactNode;
}
export default function PostcardContainer({
  city,
  countryCode,
  favoriteUrl,
  children,
}: IPostcardContainer) {
  return (
    <div className={"flex flex-col gap-3 justify-center items-center"}>
      <div className={"text-3xl space-x-3"}>
        <span>{city}</span>
        <span>{countryCodeEmoji(countryCode)}</span>
      </div>
      <div
        className={
          "w-[700px] h-[500px] flex items-end justify-evenly rounded-2xl group"
        }
        style={{
          backgroundImage: `url(${favoriteUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={
            "mb-6 hidden group-hover:flex h-1/4 w-5/6 rounded-3xl justify-evenly items-center"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
