import UserCurrentLocation from "@/components/locations/UserCurrentLocation";
import City from "@/components/locations/City";
import CityAutocomplete from "@/components/locations/CityAutocomplete";
import { SelectedCityType } from "@/types/global";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { generate } from "@/actions/generation";
import { useFormStatus } from "react-dom";

interface ILocations {
  selectedCity: SelectedCityType;
  setSelectedCity: React.Dispatch<SelectedCityType>;
  userCurrentLocation: SelectedCityType;
  setUserCurrentLocation: React.Dispatch<SelectedCityType>;
}
export default function LocationsContainer({
  selectedCity,
  setSelectedCity,
  userCurrentLocation,
  setUserCurrentLocation,
}: ILocations) {
  const [error, setError] = useState(false);
  const router = useRouter();

  return (
    <div className={"flex flex-col text-black gap-3 md:gap-6"}>
      <div
        className={
          "grid grid-cols-10 gap-3 md:gap-5 md:text-4xl text-lg font-medium md:font-normal z-10"
        }
      >
        <UserCurrentLocation
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          setUserCurrentLocation={setUserCurrentLocation}
          userCurrentLocation={userCurrentLocation}
        />

        <City
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          country={{ city: "paris, france", countryCode: "FR" }}
          inputCity={"paris"}
          className={
            "col-span-4 md:col-span-3 border-emerald-700 hover:bg-emerald-700"
          }
          selectedClassName={"bg-emerald-700"}
          unselectedClassName={"text-emerald-700"}
          variant={"outline"}
        />
        <City
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          country={{ city: "tokyo, japan", countryCode: "JP" }}
          inputCity={"tokyo"}
          className={"col-span-3  border-orange-400 hover:text-orange-400"}
          selectedClassName={"text-orange-400"}
          unselectedClassName={"bg-orange-400"}
          variant={"full"}
        />
        <City
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          country={{ city: "cape town, south africa", countryCode: "ZA" }}
          inputCity={"cape town"}
          className={
            "col-span-7 md:col-span-5 border-yellow-400 hover:text-yellow-400"
          }
          selectedClassName={"text-yellow-400"}
          unselectedClassName={"bg-yellow-400"}
          variant={"full"}
        />
        <City
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          country={{ city: "washington, usa", countryCode: "US" }}
          inputCity={"washington"}
          className={
            "col-span-5 md:col-span-5 border-red-600 hover:text-red-600"
          }
          selectedClassName={"text-red-600"}
          unselectedClassName={"bg-red-600"}
          variant={"full"}
        />
        <City
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          country={{ city: "dublin, ireland", countryCode: "IE" }}
          inputCity={"dublin"}
          className={
            "col-span-5 md:col-span-3 border-blue-600 hover:text-blue-600"
          }
          selectedClassName={"text-blue-600"}
          unselectedClassName={"bg-blue-600"}
          variant={"full"}
        />

        <CityAutocomplete
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
        />

        <form
          // prefetch={false}
          className={`${selectedCity.city && "pulse-success"} ${
            error &&
            "bounce-error shadow-[0px_0px_3px_6px_rgba(239,68,68,0.25)]"
          } col-span-4 md:col-span-2 border-emerald-500 bg-emerald-500 text-white border-2 md:border-3 rounded-full hover:bg-transparent hover:text-emerald-500 ease-in-out duration-300 text-center hover:placeholder:text-white cursor-pointer transition-all`}
          action={(data) => {
            if (!selectedCity.city) {
              if (error) return;
              setTimeout(() => {
                setError((prev) => !prev);
              }, 900);
              setError((prev) => !prev);
              return;
            }
            generate(data).then((id) => {
              router.push(`/generation/${id}`);
            });
          }}
        >
          <input
            className="hidden"
            name="city"
            value={selectedCity.city}
            readOnly
          />
          <input
            className="hidden"
            name="countryCode"
            value={selectedCity.countryCode}
            readOnly
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={"w-full h-full"}>
      {pending ? (
        <div className={"inline-flex items-center justify-center"}>
          <Image
            src={"/sparkles.webp"}
            alt={"sparkles telemoji"}
            width="10"
            height="10"
            priority={true}
            className={"w-4 h-4 md:w-8 md:h-8"}
          />
        </div>
      ) : (
        "generate!"
      )}
    </button>
  );
};
