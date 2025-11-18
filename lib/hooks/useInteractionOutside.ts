/*
- catches click, touch, drag and focus movements outside the ref-element (including keyboard navigation)
*/
"use client";
import useEventOutside from "@/lib/hooks/useEventOutside";

type UseInteractOutsideProps = {
  ref: React.RefObject<HTMLElement>;
  action: () => void;
};

export function useInteractionOutside({
  ref,
  action,
}: UseInteractOutsideProps) {
  useEventOutside({
    eventType: "focusin",
    containerRef: ref as React.RefObject<HTMLElement>,
    action,
  });

  useEventOutside({
    eventType: "mousedown",
    containerRef: ref as React.RefObject<HTMLElement>,
    action,
  });

  useEventOutside({
    eventType: "touchstart",
    containerRef: ref as React.RefObject<HTMLElement>,
    action,
  });
}
