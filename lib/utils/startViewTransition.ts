import { flushSync } from "react-dom";

// helper for view transitions
export const startViewTransition = (func: () => void) => {
  const reduceMotion = window.matchMedia(
    `(prefers-reduced-motion: reduce)`
  ).matches;
  if (!document.startViewTransition || reduceMotion) {
    func();
    return;
  }
  document.startViewTransition(() => {
    // use flushSync to make sure DOM updates are done before view transition
    flushSync(() => {
      func();
    });
  });
};
