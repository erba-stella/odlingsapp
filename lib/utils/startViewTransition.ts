import { flushSync } from "react-dom";

export const startViewTransition = (func: () => void) => {
  if (!document.startViewTransition) {
    func(); // fallback without transition
    return;
  }
  document.startViewTransition(() => {
    try {
      // use flushSync to force React to render the DOM update immediately and synchronously.
      flushSync(func);
    } catch (err) {
      console.error("Transition update failed:", err);
      func(); // fallback without transition
    }
  });
    
};