
"use client";
import {
  useLocalStorageCache,
  useSetLocalStorageCache,
} from "@/lib/hooks/useLocalStorageCache";
import { select } from "./stableSelectorUtil";

/* ============================================================
    Constants: localStorage key and initial value
*/
type StorageValue = Record<string, string[]>;

const KEY = "plant-lists-sorted";
const INITIAL: StorageValue = {};

/* ============================================================
   HOOK: Storing the sort order of sortable plant lists (in global cache and localStorage)

   listOrder: subscribe to saved list order for specific list-category
   setListOrder: save new list order for specific list-category
*/
export const useListOrder = (categoryId: string) => {

 const useGetListOrder = (): string[] | undefined => {
   return useLocalStorageCache<StorageValue, string[]>(KEY, INITIAL, {
     selector: select((storedObj) => storedObj[categoryId] || undefined),
     sliceId: `list-order:${categoryId}`,
   });
 };

 const useSetListOrder = (newListOrder: string[]) => {
  const setListOrder = useSetLocalStorageCache(KEY, INITIAL);
  setListOrder((prevListOrders) => ({
    ...prevListOrders,
    [categoryId]: newListOrder,
  }));
 };

 return { listOrder: useGetListOrder(), setListOrder: useSetListOrder };
};