import { customAlphabet } from "nanoid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export function getFlagEmoji(countryCode: string) {
  return [...countryCode.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .reduce((a, b) => `${a}${b}`);
}
