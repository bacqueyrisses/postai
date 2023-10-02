import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NEXT_URL =
  process.env.NEXT_SERVER_URL ?? process.env.NEXT_PUBLIC_URL;
