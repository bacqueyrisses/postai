import Image from "next/image";

type PageType = "locations" | "postcard";
interface IHero {
  pageDisplayed: PageType;
  postcardLoading: boolean;
}
export default function Hero({ pageDisplayed, postcardLoading }: IHero) {
  return pageDisplayed === "locations" ? (
    <div className={"text-3xl md:text-6xl font-normal md:font-normal"}>
      <span className={"font-medium md:font-normal"}>Create your virtual</span>
      <div className={"block md:inline"}>
        {" "}
        <Image
          src={"/robot.webp"}
          alt={"robot telemoji"}
          className={"-mt-2 inline w-10 h-10 md:w-16 md:h-16"}
          width="70"
          height="70"
        />{" "}
        ai-generated <br className={"hidden md:inline"} /> &
      </div>{" "}
      <Image
        src={"/compass.webp"}
        alt={"compass telemoji"}
        width="70"
        height="70"
        className={"-mt-2 -mx-0.5 md:-mx-1 inline w-10 h-10 md:w-16 md:h-16"}
      />{" "}
      location-based{" "}
      <span className={"inline md:hidden"}>
        <br />
      </span>
      <Image
        src={"/burningheart.webp"}
        alt={"burning heart telemoji"}
        width="70"
        height="70"
        className={"-mt-1 -mx-1.5 md:-mx-2.5 inline w-11 h-11 md:w-20 md:h-20"}
      />
      {"  "}
      <span className={"font-medium md:font-normal"}>postcard</span>
    </div>
  ) : (
    <div className={"text-3xl md:text-6xl font-normal md:font-normal"}>
      <span>
        {postcardLoading
          ? "Generating your virtual postcard"
          : "Your postcard is ready ✨"}
      </span>{" "}
      <Image
        src={"/sparkles.webp"}
        alt={"sparkles telemoji"}
        className={`-mt-2 w-10 h-10 md:w-16 md:h-16 ${
          postcardLoading ? "inline" : "hidden"
        }`}
        width="70"
        height="70"
      />
    </div>
  );
}
