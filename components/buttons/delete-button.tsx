"use client";
import { LoadingCircle } from "@/components/icons";
import { XCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteFavorite } from "@/lib/actions";

export default function DeleteButton({ id }) {
  const deleteFavoriteWithId = deleteFavorite.bind(null, id);
  return (
    <form
      action={deleteFavoriteWithId}
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
      {pending ? <LoadingCircle /> : <XCircle className="h-5 w-5 text-white" />}
    </button>
  );
}
