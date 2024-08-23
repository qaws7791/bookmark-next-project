import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGoogleFaviconUrl(domain: string, size: number = 32) {
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`;
}

export function getStorageFullUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}
