import { flushSync } from "react-dom";

// helper for view transitions
export const startViewTransition = (func: () => void) => {
  if (!document.startViewTransition) {
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