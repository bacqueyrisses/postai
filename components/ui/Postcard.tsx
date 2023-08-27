import Image from "next/image";

export default function Postcard() {
  return (
    <div className={"inline-flex items-center justify-center"}>
      <Image
        src={"/postcard.jpg"}
        alt={"postcard postai"}
        width={700}
        height={700}
        className={"rounded-xl"}
      />
    </div>
  );
}
