import { LoadingCircle } from "@/components/icons";
import { XCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteFavorite } from "@/actions/favorites";
import { Dispatch } from "react";
import { toast } from "sonner";
import { Favorite } from "@prisma/client";

export default function DeleteButton({
  id,
  image,
  setSelected,
}: {
  id: Favorite["id"];
  image: Favorite["image"];
  setSelected: Dispatch<Favorite | null>;
}) {
  return (
    <form
      action={() => {
        deleteFavorite(id, image).then((id) => {
          setSelected(null);
          toast.success("favorite deleted");
        });
      }}
      className="flex h-7 w-7 md:h-9 md:w-9 bg-red-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
    >
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? (
        <LoadingCircle className={"h-3 w-3 md:h-4 md:w-4 text-white"} />
      ) : (
        <XCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
      )}
    </button>
  );
}
