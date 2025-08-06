import { useEffect } from "react";

interface UseClickOutsideParams {
  ref: React.RefObject<HTMLElement>;
  action: (event: Event) => void;
}

export default function useClickOutside({
  ref,
  action,
}: UseClickOutsideParams) {
  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    if (!ref.current) return; // Ensure the ref is valid

    const handleClick = (e: Event) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      action(e);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, action]);
}
