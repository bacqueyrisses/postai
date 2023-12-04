import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
        <button>
          <Image
            width={size}
            height={size}
            src={
              "https://em-content.zobj.net/source/apple/354/cross-mark_274c.png"
            }
            alt={"red cross emoji"}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteButton}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
