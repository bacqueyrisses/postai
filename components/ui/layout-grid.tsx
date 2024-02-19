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
      className={`${favorites.length > 1 ? "max-w-7xl md:grid-cols-2" : "max-w-3xl"} mx-auto grid h-full w-full grid-cols-1 gap-4 p-10`}
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
                ? "fixed inset-0 z-50 m-auto flex h-[40%] w-[90%] flex-col flex-wrap items-center justify-center rounded-3xl md:h-[65%] md:w-[60%]"
                : lastSelected?.id === favorite.id
                  ? "z-40 h-full w-full bg-white"
                  : "h-full w-full bg-white",
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
          "fixed left-0 top-0 z-10 h-full w-full bg-black opacity-0",
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
          "absolute inset-0 aspect-[3/2] h-full w-full object-fill transition duration-200"
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
    <div className="relative z-50 flex h-full w-full flex-col">
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
        className="mt-4 flex h-full flex-col items-center justify-between md:h-auto md:flex-row"
      >
        <div className={"hidden md:block md:basis-1/3"} />
        <div
          className={
            "min-w-fit space-x-2 rounded-full bg-cyan-600 px-5 py-0.5 text-lg text-white md:space-x-3 md:px-10 md:py-2 md:text-2xl lg:text-3xl"
          }
        >
          <span>{selected.city}</span>
          <span>{getFlagEmoji(selected.countryCode)}</span>
        </div>
        <div
          className={
            "flex basis-1/3 -translate-x-0 items-end justify-center gap-2 md:-translate-x-6 md:items-center md:justify-end"
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
