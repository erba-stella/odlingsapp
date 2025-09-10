"use client";
import { useSyncExternalStore } from "react";
import { isDeeplyEqual } from "@/lib/utils/isDeeplyEqual";

/*
a custom React hook for reactive localStorage state, that:
- synchronizes component state with localStorage
- supports selecting slices of stored data via a selector
- memoizes selector results to ensure stable references and avoid unnecessary re-renders
- syncs changes across tabs via storage events
- includes a setter hook `useSetLocalStorageCache` for updating values
*/

/* ============================================================
   GLOBAL STATE (singleton caches & bookkeeping)
*/

// Keeps values from localStorage in memory for faster access
const GLOBAL_LOCALSTORAGE_CACHE: Record<string, unknown> = {};

// Keep track of initialized localStorage keys
const GLOBAL_INITIALIZED_KEYS = new Set<string>();

// SLICE CACHE, Memoized slice result to reuse stable references:

// `lastRawValue` = latest selector result (may be a new object instance)
const GLOBAL_SLICE_CACHE_lastRawValue: Record<string, unknown> = {};
// `stableValue`  = reference that is reused if values are considered "equal"
const GLOBAL_SLICE_CACHE_stableValue = new Map<string, unknown>();

// Keep track of selectors, when used to create unique slice ids
const GLOBAL_SELECTOR_IDS = new WeakMap<(data: unknown) => unknown, string>();
let GLOBAL_SELECTOR_ID_COUNTER = 0;

/* ============================================================
   HELPER FUNCTIONS
*/

/** Get cached value (ensures init has run) */
function getCachedStorageValue<T>(key: string, initialValue: T): T {
  initStorageCache(key, initialValue);
  return GLOBAL_LOCALSTORAGE_CACHE[key] as T;
}

/**
 * Initialize cache once for a given localStorage key.
 * Reads from localStorage or falls back to initialValue.
 */
function initStorageCache<T>(key: string, initialValue: T) {
  if (GLOBAL_INITIALIZED_KEYS.has(key)) return;
  GLOBAL_INITIALIZED_KEYS.add(key);

  if (typeof window === "undefined") {
    GLOBAL_LOCALSTORAGE_CACHE[key] = initialValue;
    return;
  }

  const value = localStorage.getItem(key);
  if (!value) {
    GLOBAL_LOCALSTORAGE_CACHE[key] = initialValue;
    return;
  }

  try {
    GLOBAL_LOCALSTORAGE_CACHE[key] = JSON.parse(value) as T;
  } catch {
    console.warn(`Invalid JSON for localStorage key "${key}"`);
    GLOBAL_LOCALSTORAGE_CACHE[key] = initialValue;
  }
}

/**
 * Memoize selected slice result to reuse stable references.
 * This ensures consumers get stable references for equal data,
 * avoiding unnecessary re-renders in React.
 */
function memoizeSliceResult<S>(
  sliceId: string,
  newValue: S,
  compare: (a: S, b: S) => boolean
): S {
  // Equal values → reuse stable reference
  const prevValue = GLOBAL_SLICE_CACHE_stableValue.get(sliceId) as
    | S
    | undefined;
  if (prevValue !== undefined && compare(prevValue, newValue)) {
    return prevValue; // reuse stable reference
  }
  GLOBAL_SLICE_CACHE_stableValue.set(sliceId, newValue);
  return newValue;
}

/**
 * Dispatch a storage change event (for same-tab updates).
 */
function dispatchStorageChange(key: string) {
  window.dispatchEvent(new CustomEvent("storage-change", { detail: { key } }));
}

/**
 * Subscribe to changes of a specific localStorage key.
 * Handles both native "storage" events (cross-tab) and
 * custom "storage-change" events (same tab).
 */
function subscribeToStorageKey(key: string, handler: () => void) {
  const handleEvent = (event: Event) => {
    if (event instanceof StorageEvent) {
      // Native storage event → filter on key
      if (event.key !== key) return;
    } else if (event instanceof CustomEvent) {
      // Custom same-tab event → filter on detail.key
      if (event.detail?.key !== key) return;
    }
    handler();
  };

  window.addEventListener("storage", handleEvent);
  window.addEventListener("storage-change", handleEvent);

  return () => {
    window.removeEventListener("storage", handleEvent);
    window.removeEventListener("storage-change", handleEvent);
  };
}

/**
 * Factory for a stable change handler
 * - Runs selector on new data
 * - Memoizes selected slice with stable references
 * - Only triggers re-render when the stable slice value has actually changed
 */
function createChangeHandler<T, S>(
  key: string,
  initialValue: T,
  selector: ((data: T) => S) | undefined,
  sliceId: string,
  compare: (a: S, b: S) => boolean,
  onChange: () => void
) {
  return () => {
    const fullData = getCachedStorageValue<T>(key, initialValue);
    const newSlice = selectSlice(selector, fullData);
    const memoized = memoizeSliceResult(sliceId, newSlice, compare);

    if (!Object.is(GLOBAL_SLICE_CACHE_lastRawValue[sliceId], memoized)) {
      GLOBAL_SLICE_CACHE_lastRawValue[sliceId] = memoized;
      onChange();
    }
  };
}

/**
 * Generate a unique sliceId based om key/selector/id.
 * sliceId is used to differentiate between different "parts" (slices) of the same localStorage key.
 */
function generateSliceId<T, S>(
  key: string,
  selector: ((data: T) => S) | undefined,
  sliceId?: string
): string {
  if (sliceId) return `${key}::${sliceId}`;
  if (!selector) return `${key}`;
  const selectorKey = selector as (data: unknown) => unknown;
  if (!GLOBAL_SELECTOR_IDS.has(selectorKey)) {
    GLOBAL_SELECTOR_IDS.set(
      selectorKey,
      `selector-${++GLOBAL_SELECTOR_ID_COUNTER}`
    );
  }
  return `${key}::${GLOBAL_SELECTOR_IDS.get(selectorKey)}`;
}

// Slice selection with support for undefined storage value and full data subscription without selector
function selectSlice<T, S>(
  selector: ((data: T) => S) | undefined,
  storageValue: T
): S {
  // TODO: accept undefined selector, test and improve!
  if (storageValue === undefined || selector === undefined)
    return storageValue as unknown as S;
  return selector(storageValue) as S;
}

/* ============================================================
   HOOKS
   ============================================================ 
*/

type SliceOptions<T, S> = {
  selector?: (data: T) => S; // default = identity
  //initialValue?: T; // default = undefined
  compare?: (a: S, b: S) => boolean; // default = Object.is
  sliceId?: string; // manuellt id för cache-label
};

/**
 * Subscribe to a slice of a localStorage value.
 * - Returns stable references when data is equal (avoids unnecessary renders)
 * - Supports custom selectors and comparison functions
 * - Works across tabs (sync events dispatched)
 */

export function useLocalStorageCache<T, S = T>(
  key: string,
  initialValue: T = undefined as unknown as T, // default = undefined
  options: SliceOptions<T, S> = {}
): S {
  const {
    selector, // identity default
    compare = isDeeplyEqual,
    sliceId,
  } = options;

  const generatedSliceId = generateSliceId(key, selector, sliceId);

  // Initialize slice-cache once
  if (!(generatedSliceId in GLOBAL_SLICE_CACHE_lastRawValue)) {
    const storageValue =
      typeof window === "undefined"
        ? initialValue
        : getCachedStorageValue<T>(key, initialValue);

    const initialSlice = selectSlice(selector, storageValue);

    GLOBAL_SLICE_CACHE_lastRawValue[generatedSliceId] = memoizeSliceResult(
      generatedSliceId,
      initialSlice,
      compare
    );
  }

  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    return subscribeToStorageKey(
      key,
      createChangeHandler(
        key,
        initialValue,
        selector,
        generatedSliceId,
        compare,
        onChange
      )
    );
  };

  // Snapshot functions
  const getSnapshot = () =>
    GLOBAL_SLICE_CACHE_lastRawValue[generatedSliceId] as S;
  const getServerSnapshot = () => undefined as S;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Write to the localStorage cache (with sync events dispatched).
 */
export function useSetLocalStorageCache<T>(key: string, initialValue: T) {
  return (valueOrUpdater: T | ((prev: T) => T)) => {
    const prevValue = getCachedStorageValue<T>(key, initialValue);
    const newValue =
      typeof valueOrUpdater === "function"
        ? (valueOrUpdater as (prev: T) => T)(prevValue)
        : valueOrUpdater;

    /** Update cache and notify subscribers (also across tabs) */
    GLOBAL_LOCALSTORAGE_CACHE[key] = newValue;
    localStorage.setItem(key, JSON.stringify(newValue));
    dispatchStorageChange(key);
  };
}