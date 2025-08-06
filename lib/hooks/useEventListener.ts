/*
    custom hook from
    https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/13-useEventListener/useEventListener.js

*/
import { useEffect, useRef } from "react"

interface Options {
  eventType: string;
  callback: (event: Event) => void;
  element?: EventTarget | null;
}

export default function useEventListener(
  eventType: Options["eventType"],
  callback: Options["callback"],
  element: Options["element"] = window
): void {
  const callbackRef = useRef<Options["callback"]>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}