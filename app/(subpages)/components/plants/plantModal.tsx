"use client";

import React, { useRef } from "react";
import styles from "./plantModal.module.css";
import { CustomPlant } from "@/lib/interfaces";
import { useRouter, useSearchParams } from "next/navigation";

interface PlantModalProps {
  plant: CustomPlant | null;
  onClose: () => void;
}

export const PlantModal = ({ plant, onClose }: PlantModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  modalRef.current?.showModal();

  const handleClose = () => {
    modalRef.current?.close();
    onClose();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("plant");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!plant) return null;

  return (
    <dialog ref={modalRef} className={styles.modal} onClose={handleClose}>
      <form className={styles.modalContent}>
        <h2>{plant.customName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo labore perspiciatis fugit numquam sint minus veritatis harum laborum explicabo, accusantium impedit, consequatur ab quam delectus ipsa nesciunt voluptas modi.</p>
        <p>Mer information om plantan kan visas här.</p>
        <button type="submit">Stäng</button>
      </form>
    </dialog>
  );
};