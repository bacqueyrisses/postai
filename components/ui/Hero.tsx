import Image from "next/image";

export default function Hero() {
  return (
    <div className={"flex flex-col items-center text-2xl md:text-6xl"}>
      <div>
        Create your virtual{" "}
        <Image
          src={"/robot.webp"}
          alt={"robot telemoji"}
          className={"-mt-2 inline w-10 h-10 md:w-16 md:h-16"}
          width="0"
          height="0"
        />{" "}
        ai-generated
      </div>
      <div>
        &{" "}
        <Image
          src={"/compass.webp"}
          alt={"compass telemoji"}
          width="0"
          height="0"
          className={"-mt-2 -mx-1 inline w-10 h-10 md:w-16 md:h-16"}
        />{" "}
        location-based{" "}
        <Image
          src={"/burningheart.webp"}
          alt={"burning heart telemoji"}
          width="0"
          height="0"
          className={"-mt-1 -mx-2.5 inline w-10 h-10 md:w-20 md:h-20"}
        />{" "}
        postcard
      </div>
    </div>
  );
}
