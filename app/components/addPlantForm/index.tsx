"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import { cardStyles } from "@/app/components/styles";
import cn from "@/lib/utils/addClassNames";
import { RiMenuAddLine } from "react-icons/ri";
import { useInteractionOutside } from "@/lib/hooks/useInteractionOutside";

export function AddPlantForm({
  plantCategory,
  onSubmit,
}: {
  plantCategory: string;
  onSubmit: (plant: string) => void;
  }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const lastSavedValueRef = useRef<string | null>(null);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);


  const getInputValue = () => {
    const value = inputRef.current?.value.trim();
    lastSavedValueRef.current = value || null;
    formRef.current?.reset();

    if (value && value.length > 0) {
      onSubmit(value);
    }  
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getInputValue();
  };

  useInteractionOutside({
    ref: formRef as React.RefObject<HTMLElement>,
    action: () => {
      if (open) {
        getInputValue();
        setOpen(false);
      }
    },
  });

  return (
    <div
      className={cn(
        styles.wrapper,
        open ? styles.open : styles.closed,
        lastSavedValueRef.current ? styles.saved : styles.empty,
      )}
    >
      <form
        ref={formRef}
        id="add-plant-form"
        name="add-plant"
        aria-labelledby="add-plant-toggle"
        onSubmit={handleSubmit}
        className={cn(cardStyles.card, cardStyles.focusable, styles.form)}
      >
        <label htmlFor="plant-input" className="visually-hidden">
          {`Lägg till ny växt i kategorin ${plantCategory}`}
        </label>
        <input
          disabled={!open}
          ref={inputRef}
          tabIndex={open ? 0 : -1}
          id="plant-input"
          type="text"
          name="plant"
          autoComplete="off"
          placeholder="Namn..."
          required
          pattern=".*\S.*" // something more than just whitespace is required
        />
      </form>
      <button
        type="button"
        id="add-plant-toggle"
        className={styles.openButton}
        onClick={handleOpen}
        aria-expanded={open}
        aria-controls="add-plant-form"
      >
        <span className="visually-hidden">{`Lägg till ${plantCategory}`}</span>
        <RiMenuAddLine aria-hidden="true" />
      </button>
    </div>
  );
}