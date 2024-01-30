"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import DownloadButton from "@/components/buttons/download-button";
import Postcard from "@/components/postcard";
import CopyButton from "@/components/buttons/copy-button";
import DeleteButton from "@/components/buttons/delete-button";

export type Card = {
  id: string;
  countryCode: string;
  city: string;
  url: string;
  blur: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div
      className={`${cards.length > 1 ? "md:grid-cols-2 max-w-7xl" : "max-w-3xl"} w-full h-full p-10 grid grid-cols-1 mx-auto gap-4`}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className={`aspect-[3/2] ${!selected?.id && "hover:cursor-pointer"}`}
        >
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-clip rounded-2xl",
              selected?.id === card.id
                ? "fixed inset-0 h-[40%] w-[90%] md:h-[65%] md:w-[60%] m-auto z-50 flex justify-center items-center flex-wrap flex-col rounded-3xl"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white h-full w-full"
                  : "bg-white h-full w-full",
            )}
            layout
          >
            {selected?.id === card.id && (
              <SelectedCard selected={selected} setSelected={setSelected} />
            )}
            <BlurImage card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  return (
    <>
      <Image
        src={card.url}
        width={1024}
        height={768}
        placeholder={"blur"}
        blurDataURL={card.blur}
        className={
          "aspect-[3/2] object-fill absolute inset-0 h-full w-full transition duration-200"
        }
        alt={`postcard of ${card.city}`}
      />
    </>
  );
};

const SelectedCard = ({ selected, setSelected }: { selected: Card }) => {
  return (
    <div className="h-full w-full flex flex-col relative z-50">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: -5,
        }}
        animate={{
          opacity: 1,
          y: -10,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="flex items-center justify-between mt-4"
      >
        <div className={"basis-1/3"} />
        <div
          className={
            "basis-1/3 sm:text-3xl text-2xl sm:space-x-3 space-x-2 bg-cyan-600 min-w-fit px-10 rounded-full py-2 text-white"
          }
        >
          <span>{selected.city}</span>
          <span>{countryCodeEmoji(selected.countryCode)}</span>
        </div>
        <div
          className={
            "basis-1/3 gap-2 flex items-center justify-end -translate-x-6"
          }
        >
          <CopyButton id={selected.id} />
          <DownloadButton id={selected.id} image={selected.url} />
          <DeleteButton setSelected={setSelected} id={selected.id} />
        </div>
      </motion.div>
    </div>
  );
};
