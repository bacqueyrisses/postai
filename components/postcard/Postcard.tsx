import Image from "next/image";

interface IPostCard {
  postcardLoading: boolean;
  imgUrl: string | null;
}
export default function Postcard({ postcardLoading, imgUrl }: IPostCard) {
  return (
    <div className={"inline-flex items-center justify-center"}>
      {!postcardLoading && imgUrl && (
        <div className={"w-[700px] h-[459px]"}>
          <Image
            src={imgUrl}
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
