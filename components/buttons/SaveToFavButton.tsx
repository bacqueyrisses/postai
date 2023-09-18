import Image from "next/image";

interface ISaveToFavButton {
  handleSaveButton: () => void;
  isSaved: boolean;
  size: number;
}
export default function SaveToFavButton({
  handleSaveButton,
  isSaved,
  size,
}: ISaveToFavButton) {
  return (
    <button
      onClick={handleSaveButton}
      className={
        "bg-slate-300/80 transition hover:bg-slate-300/90 w-1/5 h-3/4 rounded-3xl inline-flex justify-center items-center"
      }
    >
      {isSaved ? (
        <Image
          width={size}
          height={size}
          src={
            "https://em-content.zobj.net/source/apple/354/check-mark-button_2705.png"
          }
          alt={"link emoji"}
        />
      ) : (
        <Image
          width={size}
          height={size}
          src={
            "https://em-content.zobj.net/source/apple/354/floppy-disk_1f4be.png"
          }
          alt={"floppy disk emoji"}
        />
      )}
    </button>
  );
}
