import { LoadingCircle } from "@/components/icons";
import { Check, Cross, Star } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createFavorite } from "@/actions/favorites";
import Link from "next/link";
import { Postcard } from "@/types/definitions";
import { toast } from "sonner";

export default function SaveButton({
  id,
  image,
  blur,
  city,
  countryCode,
  userId,
  saved,
}: Postcard & { userId: string | null; saved: boolean }) {
  const createFavoriteWithId = createFavorite.bind(null, id);
  const withUser = (saved: boolean, userId: string) => {
    return saved ? (
      <button
        className={
          "flex h-9 w-9 bg-yellow-500 items-center justify-center rounded-full shadow-sm"
        }
        onClick={() => toast.success("favorite already saved")}
      >
        <Check className="h-4 w-4 text-white" />
      </button>
    ) : (
      <form
        action={(data) => {
          createFavoriteWithId(data)
            .then(() => toast.success("favorite saved"))
            .catch((error) => {
              console.error(error);
              toast.error("error, please retry!");
            });
        }}
        className="flex h-9 w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
      >
        <input className="hidden" name="image" value={image} readOnly />
        <input className="hidden" name="blur" value={blur} readOnly />
        <input className="hidden" name="city" value={city} readOnly />
        <input
          className="hidden"
          name="countryCode"
          value={countryCode}
          readOnly
        />
        <input className="hidden" name="userId" value={userId} readOnly />
        <SubmitButton />
      </form>
    );
  };

  const withoutUser = () => {
    return (
      <Link
        className={
          "flex h-9 w-9 bg-yellow-500 transition-all delay-75 items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95"
        }
        href={`/favorites?id=${id}&image=${image}&blur=${blur}&city=${city}&countryCode=${countryCode}`}
      >
        <Star className="h-4 w-4 text-white" />
      </Link>
    );
  };
  return userId ? withUser(saved, userId) : withoutUser();
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? (
        <LoadingCircle className={"w-4 h-4 text-white"} />
      ) : (
        <Star className="h-4 w-4 text-white" />
      )}
    </button>
  );
}
