import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <div
      className={"h-screen flex flex-col justify-evenly text-4xl text-center"}
    >
      <div>Create your virtual location-based ai-generated postcard</div>
      <div className={"grid grid-cols-10 gap-5"}>
        <div className={"col-span-4 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div className={"col-span-3 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div className={"col-span-3 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div className={"col-span-5 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div className={"col-span-5 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div className={"col-span-3 bg-amber-200 rounded-full px-2.5 py-5"}>
          Tokyo
        </div>
        <div
          className={
            "col-span-5 border-green-600 text-green-600  border-4 rounded-full px-2.5 py-5"
          }
        >
          Tokyo
        </div>
        <div
          className={
            "col-span-2 border-pink-400 text-pink-400 border-[3px] rounded-full px-2.5 py-5"
          }
        >
          Tokyo
        </div>
      </div>
    </div>
  );
}
