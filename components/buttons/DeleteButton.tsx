import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface IFavoritePostcardAlert {
  handleDeleteButton: () => void;
  size: number;
}

export default function DeleteButton({
  handleDeleteButton,
  size,
}: IFavoritePostcardAlert) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={"animate-pulse"}>
          <Image
            width={size}
            height={size}
            src={
              "https://em-content.zobj.net/source/apple/354/cross-mark_274c.png"
            }
            alt={"red cross emoji"}
            className={"hover:scale-105 transition-all"}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className={"rounded-2xl border-none"}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"font-normal"}>
            delete this postcard?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              "bg-red-600 text-white hover:bg-transparent hover:text-red-600 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 transition-colors ease-in-out duration-300 border-red-600 focus-visible:ring-0 focus-visible:ring-transparent"
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={
              "bg-green-600 text-white hover:bg-transparent hover:text-green-600 border-2 rounded-full px-2.5 py-1 md:py-4 transition-colors ease-in-out duration-300 border-green-600 outline-none"
            }
            onClick={handleDeleteButton}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
