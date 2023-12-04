// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function FavoriteSkeleton() {
  return (
    <div className={"flex flex-col gap-4 justify-center items-center mb-20"}>
      <div className={"text-3xl space-x-3"}>
        <span>loading, postcards</span>
        <span>🏳️</span>
      </div>
      <div
        className={`${shimmer} relative overflow-hidden rounded-2xl bg-gray-100 p-4 shadow-sm flex items-end w-[700px] h-[500px]`}
      >
        <div className="w-full flex items-center justify-center truncate rounded-xl bg-white px-4 py-8 gap-10">
          <div className="h-10 w-20 rounded-2xl bg-gray-200" />
          <div className="h-10 w-20 rounded-2xl bg-gray-200" />
          <div className="h-10 w-20 rounded-2xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
