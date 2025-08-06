import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLElement>;
  onFocusOut: () => void;
};

export default function useFocusOutside({ ref, onFocusOut }: Props) {
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (!ref.current) return;

      const target = event.target as Node;
      const menu = ref.current;

      if (!menu.contains(target)) {
        onFocusOut();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [ref, onFocusOut]);
}