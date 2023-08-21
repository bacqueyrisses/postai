import Image from "next/image";
import { Raleway } from "next/font/google";

const alegreya = Raleway({ subsets: ["latin"], weight: ["500"] });

export default function Hero() {
  return (
    <div className={"flex flex-col text-6xl text-center pb-10 pt-32"}>
      <div
        className={`mb-28 mx-auto flex flex-col items-center ${alegreya.className}`}
      >
        <div>
          Create your virtual{" "}
          <Image
            src={"/robot.webp"}
            alt={""}
            width={65}
            height={65}
            className={"-mt-2 inline"}
          />{" "}
          ai-generated
        </div>
        <div>
          &{" "}
          <Image
            src={"/compass.webp"}
            alt={""}
            width={65}
            height={65}
            className={"-mt-2 inline"}
          />{" "}
          location-based{" "}
          <Image
            src={"/burningheart.webp"}
            alt={""}
            width={70}
            height={70}
            className={"-mt-1 -mx-2 inline"}
          />{" "}
          postcard
        </div>
      </div>
      {/*<div className={"flex flex-col group items-start mx-auto"}>*/}
      {/*  <div className={"inline-flex justify-center relative gap-2"}>*/}
      {/*    <div>Create your</div>*/}
      {/*    <div className="inline-flex items-baseline relative">*/}
      {/*      <div*/}
      {/*        className={*/}
      {/*          "absolute left-0 transition-transform transform translate-x-0 group-hover:translate-x-10 whitespace-nowrap"*/}
      {/*        }*/}
      {/*      >*/}
      {/*        virtual*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className={"inline-flex justify-start relative gap-2"}>*/}
      {/*    <div>ai-generated</div>*/}
      {/*  </div>*/}

      {/*  <div className={"inline-flex justify-start relative  gap-2"}>*/}
      {/*    <div>&</div>*/}
      {/*    <div className="inline-flex items-baseline relative">*/}
      {/*      <div*/}
      {/*        className={*/}
      {/*          "absolute left-0 transition-transform transform translate-x-0 group-hover:translate-x-10 whitespace-nowrap"*/}
      {/*        }*/}
      {/*      >*/}
      {/*        location-based*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className={"inline-flex justify-start relative  gap-1"}>*/}

      {/*    <div>postcard</div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={"flex flex-col gap-10 text-4xl"}>
        <div className={"self-start pl-4"}>🏝️ Popular locations</div>
        <div className={"grid grid-cols-10 gap-5"}>
          <div
            className={
              "col-span-4 border-3 border-pink-300 text-pink-300 rounded-full px-2.5 py-4 hover:bg-pink-300 hover:text-white transition-colors ease-in-out cursor-pointer duration-300 inline-flex items-baseline justify-center gap-2"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <div>current location</div>
          </div>
          <div
            className={
              "col-span-3 border-3 border-emerald-700 text-emerald-700 rounded-full px-2.5 py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            paris
          </div>
          <div
            className={
              "col-span-3 bg-orange-400 text-white rounded-full px-2.5 py-4 border-3 border-orange-400 hover:text-orange-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            tokyo
          </div>
          <div
            className={
              "col-span-5 bg-yellow-400 text-white rounded-full px-2.5 py-4 border-3 border-yellow-400 hover:text-yellow-400 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            johannesburg
          </div>
          <div
            className={
              "col-span-5 bg-red-500 text-white rounded-full px-2.5 py-4 border-3 border-red-500 hover:text-red-500 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            madrid
          </div>
          <div
            className={
              "col-span-3 bg-blue-600 text-white rounded-full px-2.5 py-4 border-3 border-blue-600 hover:text-blue-600 hover:bg-transparent transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            dublin
          </div>
          <div
            className={
              "col-span-5 border-green-600 text-green-600 border-3 rounded-full px-2.5 py-4 hover:bg-green-600 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            washington
          </div>
          <div
            className={
              "col-span-2 border-emerald-700 text-emerald-700 border-3 rounded-full px-2.5 py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out cursor-pointer duration-300"
            }
          >
            other
          </div>
        </div>
      </div>
    </div>
  );
}
