import { db, sessionDb } from "@/datastore";
import { type ClassValue, clsx } from "clsx";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sliceText(text: string, length: number) {
  if (text.length < length) return text;
  return text.slice(0, length) + "...";
}
