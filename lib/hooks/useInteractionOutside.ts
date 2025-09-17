/*
- catches click, touch, drag and focus movements outside the ref-element (including keyboard navigation)
*/

import { useEffect } from "react";

type UseInteractOutsideProps = {
  ref: React.RefObject<HTMLElement>;
  action: () => void;
};

export function useInteractionOutside({
  ref,
  action,
}: UseInteractOutsideProps) {
  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser

    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [ref, action]);
}
