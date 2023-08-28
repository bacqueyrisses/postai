import Image from "next/image";

interface IPostCard {
  postcardLoading: boolean;
}
export default function Postcard({ postcardLoading }: IPostCard) {
  return (
    <div className={"inline-flex items-center justify-center"}>
      {!postcardLoading && (
        <div className={"w-[700px] h-[459px] bg-emerald-300"}>
          <Image
            src={"/postcard.jpg"}
            alt={"postcard postai"}
            width={700}
            height={459}
            className={"rounded-xl"}
          />
        </div>
      )}
    </div>
  );
}
