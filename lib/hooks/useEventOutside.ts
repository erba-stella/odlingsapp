import useEventListener from "./useEventListener";

interface Options {
  eventType: string;
  containerRef: React.RefObject<HTMLElement>;
  action: () => void;
}

export default function useEventOutside({
  eventType,
  containerRef,
  action,
}: Options) {
  useEventListener({
    eventType,
    action: (event) => {
      if (
        containerRef.current == null ||
        containerRef.current.contains(event.target as Node)
      )
        return;
      action();
    },
  });
}