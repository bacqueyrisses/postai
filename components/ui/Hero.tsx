export default function Hero() {
  return (
    <div
      className={
        "h-screen flex flex-col justify-between text-4xl text-center pb-10 pt-32"
      }
    >
      <div className={"flex flex-col text-5xl gap-1"}>
        <div>Create your virtual</div>
        <div>location-based ai-generated</div>
        <div>postcard</div>
      </div>
      <div className={"flex flex-col gap-16"}>
        <div className={"self-start text-4xl pl-4"}>Popular locations</div>
        <div className={"grid grid-cols-10 gap-5"}>
          <div
            className={
              "col-span-4 border-3 border-pink-300 text-pink-300 rounded-full px-2.5 py-5"
            }
          >
            current location
          </div>
          <div
            className={
              "col-span-3 border-3 border-emerald-700 text-emerald-700 rounded-full px-2.5 py-5"
            }
          >
            paris
          </div>
          <div
            className={
              "col-span-3 bg-orange-400 text-white rounded-full px-2.5 py-5"
            }
          >
            tokyo
          </div>
          <div
            className={
              "col-span-5 bg-yellow-400 text-white rounded-full px-2.5 py-5"
            }
          >
            johannesburg
          </div>
          <div
            className={
              "col-span-5 bg-red-500 text-white rounded-full px-2.5 py-5"
            }
          >
            madrid
          </div>
          <div
            className={
              "col-span-3 bg-blue-600  text-white rounded-full px-2.5 py-5"
            }
          >
            dublin
          </div>
          <div
            className={
              "col-span-5 border-green-600 text-green-600  border-3 rounded-full px-2.5 py-5"
            }
          >
            washington
          </div>
          <div
            className={
              "col-span-2 border-emerald-700 text-emerald-700 border-3 rounded-full px-2.5 py-5"
            }
          >
            toronto
          </div>
        </div>
      </div>
    </div>
  );
}