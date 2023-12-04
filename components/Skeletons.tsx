// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function FavoriteSkeleton() {
  return (
    <div className={"flex flex-col gap-4 justify-center items-center mb-72"}>
      <div className={"text-3xl space-x-3"}>
        <span>loading, postcards</span>
        <span>🏳️</span>
      </div>
      <ImageSkeleton />
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-2xl bg-gray-100 p-6 shadow-sm flex items-end w-[700px] h-[500px]`}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-2xl">
        <svg
          className="w-24 h-24 text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    </div>
  );
}

export function ImageErrorSkeleton() {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-100 p-6 shadow-sm flex items-end w-[700px] h-[500px]`}
    >
      <div className="flex items-center justify-center flex-col gap-6 w-full h-full bg-gray-200 rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <div className={"text-gray-700"}>Image failed to load 😢</div>
      </div>
    </div>
  );
}
