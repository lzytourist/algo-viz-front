import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (Math.abs(max - min))) + Math.min(min, max);
}

export enum SortingState {
  NOT_SORTED,
  STARTED,
  SORTED
}