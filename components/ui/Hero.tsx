import Image from "next/image";

export default function Hero() {
  return (
    <div className={"flex flex-col items-center"}>
      <div>
        Create your virtual{" "}
        <Image
          src={"/robot.webp"}
          alt={""}
          width={65}
          height={65}
          className={"-mt-2 inline"}
        />{" "}
        ai-generated
      </div>
      <div>
        &{" "}
        <Image
          src={"/compass.webp"}
          alt={""}
          width={65}
          height={65}
          className={"-mt-2 -mx-1 inline"}
        />{" "}
        location-based{" "}
        <Image
          src={"/burningheart.webp"}
          alt={""}
          width={70}
          height={70}
          className={"-mt-1 -mx-2.5 inline"}
        />{" "}
        postcard
      </div>
    </div>
  );
}
