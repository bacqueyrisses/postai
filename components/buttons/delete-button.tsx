import { LoadingCircle } from "@/components/icons";
import { XCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteFavorite } from "@/lib/actions/favorites";
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
      className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 shadow-sm transition-all delay-75 hover:scale-105 active:scale-95 md:h-9 md:w-9"
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
        <LoadingCircle className={"h-3 w-3 text-white md:h-4 md:w-4"} />
      ) : (
        <XCircle className="h-4 w-4 text-white md:h-5 md:w-5" />
      )}
    </button>
  );
}
