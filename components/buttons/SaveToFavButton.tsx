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
    <button onClick={handleSaveButton}>
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
