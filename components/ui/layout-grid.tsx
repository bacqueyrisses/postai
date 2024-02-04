"use client";
import React, { Dispatch, useState } from "react";
import { motion } from "framer-motion";
import { cn, getFlagEmoji } from "@/lib/utils";
import Image from "next/image";
import DownloadButton from "@/components/buttons/download-button";
import CopyButton from "@/components/buttons/copy-button";
import DeleteButton from "@/components/buttons/delete-button";
import { Favorite } from "@prisma/client";

export const LayoutGrid = ({ favorites }: { favorites: Favorite[] }) => {
  const [selected, setSelected] = useState<Favorite | null>(null);
  const [lastSelected, setLastSelected] = useState<Favorite | null>(null);

  const handleClick = (favorite: Favorite) => {
    setLastSelected(selected);
    setSelected(favorite);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div
      className={`${favorites.length > 1 ? "md:grid-cols-2 max-w-7xl" : "max-w-3xl"} w-full h-full p-10 grid grid-cols-1 mx-auto gap-4`}
    >
      {favorites.map((favorite, i) => (
        <div
          key={i}
          className={`aspect-[3/2] ${!selected?.id && "hover:cursor-pointer"}`}
        >
          <motion.div
            onClick={() => handleClick(favorite)}
            className={cn(
              "relative overflow-clip rounded-2xl",
              selected?.id === favorite.id
                ? "fixed inset-0 h-[40%] w-[90%] md:h-[65%] md:w-[60%] m-auto z-50 flex justify-center items-center flex-wrap flex-col rounded-3xl"
                : lastSelected?.id === favorite.id
                  ? "z-40 bg-white h-full w-full"
                  : "bg-white h-full w-full",
            )}
            layout
          >
            {selected?.id === favorite.id && (
              <SelectedPostCard selected={selected} setSelected={setSelected} />
            )}
            <BlurImage favorite={favorite} />
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

const BlurImage = ({ favorite }: { favorite: Favorite }) => {
  return (
    <>
      <Image
        src={favorite.image}
        width={1024}
        height={768}
        placeholder={"blur"}
        blurDataURL={favorite.blur}
        className={
          "aspect-[3/2] object-fill absolute inset-0 h-full w-full transition duration-200"
        }
        alt={`postcard of ${favorite.city}`}
      />
    </>
  );
};

const SelectedPostCard = ({
  selected,
  setSelected,
}: {
  selected: Favorite;
  setSelected: Dispatch<Favorite | null>;
}) => {
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
        className="flex flex-col md:flex-row h-full md:h-auto items-center justify-between mt-4"
      >
        <div className={"hidden md:block md:basis-1/3"} />
        <div
          className={
            "text-lg md:text-2xl lg:text-3xl md:space-x-3 space-x-2 bg-cyan-600 min-w-fit md:px-10 px-5 rounded-full py-0.5 md:py-2 text-white"
          }
        >
          <span>{selected.city}</span>
          <span>{getFlagEmoji(selected.countryCode)}</span>
        </div>
        <div
          className={
            "basis-1/3 gap-2 flex items-end md:items-center justify-center md:justify-end md:-translate-x-6 -translate-x-0"
          }
        >
          <CopyButton id={selected.id} />
          <DownloadButton id={selected.id} image={selected.image} />
          <DeleteButton
            setSelected={setSelected}
            id={selected.id}
            image={selected.image}
          />
        </div>
      </motion.div>
    </div>
  );
};
