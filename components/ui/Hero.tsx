import Image from "next/image";

export default function Hero() {
  return (
    <div className={"text-3xl md:text-6xl"}>
      Create your virtual
      <div className={"block md:inline"}>
        {" "}
        <Image
          src={"/robot.webp"}
          alt={"robot telemoji"}
          className={"-mt-2 inline w-8 h-8 md:w-16 md:h-16"}
          width="0"
          height="0"
        />{" "}
        ai-generated <br className={"hidden md:inline"} /> &
      </div>{" "}
      <Image
        src={"/compass.webp"}
        alt={"compass telemoji"}
        width="0"
        height="0"
        className={"-mt-2 -mx-0.5 md:-mx-1 inline w-8 h-8 md:w-16 md:h-16"}
      />{" "}
      location-based{" "}
      <Image
        src={"/burningheart.webp"}
        alt={"burning heart telemoji"}
        width="0"
        height="0"
        className={"-mt-1 -mx-1.5 md:-mx-2.5 inline w-9 h-9 md:w-20 md:h-20"}
      />
      {"  "}
      postcard
    </div>
  );
}
