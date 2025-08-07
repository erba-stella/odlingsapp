'use client'
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function closeModal() {
    router.back();
  }

  return (
      <dialog ref={dialogRef} className="modal" onClose={closeModal}>
        {children}
        <button onClick={closeModal} className="close-button">Stäng</button>
      </dialog>
  );

  // return createPortal(
  //     <dialog ref={dialogRef} className="modal" onClose={closeModal}>
  //       {children}
  //       <button onClick={closeModal} className="close-button">Stäng</button>
  //     </dialog>,
  //   document.querySelector(`[data-id="global-container"]`)!
  // );
}