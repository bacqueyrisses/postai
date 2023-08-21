export default function Header() {
  return (
    <div
      className={
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-24 pt-5"
      }
    >
      <div className={"text-2xl"}>postai</div>
      <div className={"flex gap-14 items-center"}>
        <div
          className={
            "bg-emerald-500 rounded-3xl px-5 py-2.5 text-white hover:bg-cyan-400 transition-colors ease-in-out cursor-pointer duration-300"
          }
        >
          CREATE POSTCARD
        </div>
        <div className={"flex gap-4 text-white"}>
          <div className={"bg-black rounded-3xl px-5 py-2.5"}>In</div>
          <div className={"bg-black rounded-3xl px-5 py-2.5"}>In</div>
          <div className={"bg-black rounded-3xl px-5 py-2.5"}>In</div>
        </div>
      </div>
    </div>
  );
}
