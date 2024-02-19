import UserCurrentLocation from "@/components/locations/user-current-location";
import City from "@/components/locations/city";
import CityAutocomplete from "@/components/locations/city-autocomplete";
import { SelectedCityType } from "@/types/global";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generate } from "@/lib/actions/generation";
import { useFormStatus } from "react-dom";
import { LoadingCircle } from "@/components/icons";

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
  const [pendingStarted, setPendingStarted] = useState(false);
  const router = useRouter();

  return (
    <div className={"flex flex-col gap-3 text-black md:gap-6"}>
      <div
        className={
          "z-10 grid grid-cols-10 gap-3 text-lg font-medium md:gap-5 md:text-3xl md:font-normal lg:text-4xl"
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
            "col-span-4 border-emerald-700 hover:bg-emerald-700 md:col-span-3"
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
          className={
            "col-span-4 border-orange-400 hover:text-orange-400 md:col-span-3"
          }
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
            "col-span-6 border-yellow-400 hover:text-yellow-400 md:col-span-5"
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
            "col-span-5 border-red-600 hover:text-red-600 md:col-span-5"
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
            "col-span-5 border-blue-600 hover:text-blue-600 md:col-span-3"
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
          className={`${selectedCity.city && "pulse-success"} ${
            error &&
            "bounce-error shadow-[0px_0px_3px_6px_rgba(239,68,68,0.25)]"
          } col-span-4 cursor-pointer rounded-full border-2 border-emerald-500 bg-emerald-500 text-center text-white transition-all duration-300 ease-in-out hover:bg-transparent hover:text-emerald-500 hover:placeholder:text-white md:col-span-3 md:border-3 lg:col-span-2`}
          action={(data) => {
            if (!selectedCity.city) {
              if (error) return;
              setTimeout(() => {
                setError((prev) => !prev);
              }, 900);
              setError((prev) => !prev);
              return;
            }
            setPendingStarted(true);
            generate(data)
              .then((id) => {
                router.replace(`/generation/${id}`);
              })
              .catch(() => setPendingStarted(false));
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
          <SubmitButton pendingStarted={pendingStarted} />
        </form>
      </div>
    </div>
  );
}

const SubmitButton = ({ pendingStarted }: { pendingStarted: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={"h-full w-full"}>
      {pending || pendingStarted ? (
        <div className={"flex h-6 items-center justify-center py-1"}>
          <LoadingCircle className={"h-4 w-4 md:h-7 md:w-7"} />
        </div>
      ) : (
        "generate!"
      )}
    </button>
  );
};
