import * as React from "react";
import { useState } from "react";
import { fetchData } from "@/utils/actions";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
interface ICityAutocomplete {
  selectedInputCountry: string;
  setSelectedInputCountry: React.Dispatch<string>;
}
export default function CityAutocomplete({
  selectedInputCountry,
  setSelectedInputCountry,
}: ICityAutocomplete) {
  const [inputText, setInputText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setSelectedInputCountry(city);
    setInputText(city);
    const response = await fetchData(city);
    setPredictions(response.predictions);
  };

  return (
    <div
      className={
        "col-span-6 md:col-span-5 border-emerald-700 text-emerald-700 border-2 md:border-3 rounded-full px-2.5 py-1 md:py-4 hover:bg-emerald-700 hover:text-white transition-colors ease-in-out duration-300 text-center placeholder:text-emerald-700 bg-transparent hover:placeholder:text-white focus:placeholder:text-transparent focus:outline-none cursor-pointer focus:cursor-text"
      }
    >
      select a city
      {/*<Popover open={open} onOpenChange={setOpen}>*/}
      {/*  <PopoverTrigger asChild>*/}
      {/*    /!*<button*!/*/}
      {/*    /!*  role="combobox"*!/*/}
      {/*    /!*  aria-expanded={open}*!/*/}
      {/*    /!*  className="w-[200px] justify-between"*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  {value*!/*/}
      {/*    /!*    ? frameworks.find((framework) => framework.value === value)?.label*!/*/}
      {/*    /!*    : "Select framework..."}*!/*/}
      {/*    /!*  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*!/*/}
      {/*    /!*</button>*!/*/}
      {/*    <button*/}
      {/*      placeholder={"other"}*/}
      {/*      // value={selectedInputCountry?.toLowerCase()}*/}
      {/*      // onChange={handleChange}*/}
      {/*      className={""}*/}
      {/*    >*/}
      {/*      Other*/}
      {/*    </button>*/}
      {/*  </PopoverTrigger>*/}
      {/*  <PopoverContent className="w-[200px] p-0">*/}
      {/*<Command onChange={handleChange}>*/}
      {/*  <CommandInput placeholder="Other" />*/}
      {/*  <CommandGroup>*/}
      {/*    {predictions.map((prediction: any) => (*/}
      {/*      <CommandItem*/}
      {/*        key={prediction.place_id}*/}
      {/*        onSelect={(currentValue) => {*/}
      {/*          setValue(currentValue === value ? "" : currentValue);*/}
      {/*          setOpen(false);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*<Check*/}
      {/*    className={cn(*/}
      {/*        "mr-2 h-4 w-4",*/}
      {/*        value === framework.value ? "opacity-100" : "opacity-0",*/}
      {/*    )}*/}
      {/*/>*/}
      {/*        {prediction.description}*/}
      {/*      </CommandItem>*/}
      {/*    ))}*/}
      {/*  </CommandGroup>*/}
      {/*</Command>*/}
      {/*  </PopoverContent>*/}
      {/*</Popover>*/}
      {/*<ul>*/}
      {/*<li>{prediction.description}</li>*/}
      {/*</ul>*/}
    </div>
  );
}
