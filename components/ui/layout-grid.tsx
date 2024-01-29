"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
// @ts-expect-error — out-of-date library types - see https://github.com/thekelvinliu/country-code-emoji/issues/22
import countryCodeEmoji from "country-code-emoji";
import DownloadButton from "@/components/buttons/download-button";

type Card = {
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
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`aspect-[3/2] ${!selected?.id && "hover:cursor-pointer"}`}
        >
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-clip",
              selected?.id === card.id
                ? "rounded-2xl absolute inset-0 h-[40%] w-[90%] md:h-[65%] md:w-[60%] m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-2xl h-full w-full"
                  : "bg-white rounded-2xl h-full w-full",
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <BlurImage card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  return (
    <Image
      src={card.url}
      width={1024}
      height={768}
      placeholder={"blur"}
      blurDataURL={card.blur}
      className={cn(
        "aspect-[3/2] object-fill absolute inset-0 h-full w-full transition duration-200",
      )}
      alt={`postcard of ${card.city}`}
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="h-full w-full flex flex-col rounded-2xl relative z-[20]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: -40,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div
          className={
            "inline-flex sm:text-3xl text-2xl sm:space-x-3 space-x-2 bg-cyan-600 w-fit px-10 rounded-full py-2 text-white"
          }
        >
          <span>{selected?.city}</span>
          <span>{countryCodeEmoji(selected?.countryCode)}</span>
        </div>
      </motion.div>
    </div>
  );
};
