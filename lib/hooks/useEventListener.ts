/*
    custom hook (modified) from
    https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/13-useEventListener/useEventListener.js

*/
'use client'
import { useEffect, useRef } from "react";

interface Options {
  eventType: string;
  action: (e: Event) => void;
  element?: EventTarget | undefined;
}

export default function useEventListener({
  eventType,
  action,
  element,
}: Options): void {
  const callbackRef = useRef<Options["action"]>(action);

  useEffect(() => {
    callbackRef.current = action;
  }, [action]);

  useEffect(() => {
    const elem = element || window;
    const handler = (e: Event) => callbackRef.current(e);
    elem.addEventListener(eventType, handler);

    return () => elem.removeEventListener(eventType, handler);
  }, [eventType, element]);
}