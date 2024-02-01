import { LoadingCircle } from "@/components/icons";
import { XCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteFavorite } from "@/lib/actions";
import { Dispatch } from "react";
import { Postcard } from "@/types/definitions";

export default function DeleteButton({
  id,
  setSelected,
}: {
  id: Postcard["id"];
  setSelected: Dispatch<Postcard | null>;
}) {
  return (
    <form
      action={() => {
        deleteFavorite(id).then((id) => {
          setSelected(null);
        });
      }}
      className="flex h-9 w-9 bg-red-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
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
        <LoadingCircle className={"w-4 h-4 text-white"} />
      ) : (
        <XCircle className="h-5 w-5 text-white" />
      )}
    </button>
  );
}
