import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "@/lib/hooks/useClickOutside";

type ModalProps = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function Modal({ children, className, isOpen, setIsOpen }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: contentRef as React.RefObject<HTMLElement>,
    action: () => {
      if (isOpen) setIsOpen(false);
    },
  });

  // open/close modal based on prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        setIsOpen(false);
      }}
      className={`rounded-xl backdrop:bg-black/30 ${className ?? ""}`}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>,
    document.body
  );
}