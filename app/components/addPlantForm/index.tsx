"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import { cardStyles } from "@/app/components/styles";
import cn from "@/lib/utils/addClassNames";
import { RiMenuAddLine } from "react-icons/ri";
import useEventListener from "@/lib/hooks/useEventListener";
import useEventOutside from "@/lib/hooks/useEventOutside";

export function AddPlantForm({
  plantCategory,
  onSubmit,
}: {
  plantCategory: string;
  onSubmit: (plant: string, id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lastSavedValueRef = useRef<string | null>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const submit = () => {
    // Get form input value
    const value = inputRef.current?.value.trim();
    // Save value before reset (neded for closing animation)
    lastSavedValueRef.current = value || null;
    if (!value) return;

    const id = crypto.randomUUID();
    onSubmit(value, id);
    formRef.current?.reset();
  };

  // a submit event will trigger submit and reset but keeps the form open
  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  // focus outside the text-input or click outside the form-area of an open form will trigger submit and close the form
  const closeAndSubmit = () => {
    if (!open) return;
    submit();
    setOpen(false);
  };

  useEventOutside({
    eventType: "focusin",
    containerRef: inputRef as React.RefObject<HTMLElement>,
    action: closeAndSubmit,
  });

  useEventOutside({
    eventType: "click",
    containerRef: wrapperRef as React.RefObject<HTMLElement>,
    action: closeAndSubmit,
  });

  // when ending a drag event: let the opened form regain focus if empty, or close and submit if filled
  useEventListener({
    eventType: "dragend",
    action: () => {
      if (!open) return;

      const value = inputRef.current?.value.trim();
      if (value && value.length > 0) {
        submit();
        setOpen(false);
        return;
      }
      inputRef.current?.focus();
    },
  });

  return (
    <div
      ref={wrapperRef}
      className={cn(
        styles.wrapper,
        open ? styles.open : styles.closed,
        lastSavedValueRef.current ? styles.saved : styles.empty
      )}
      style={{
        viewTransitionName: `form-${plantCategory}`,
      }}
      data-animation="form-card"
    >
      <form
        ref={formRef}
        id="add-plant-form"
        name="add-plant"
        aria-labelledby="add-plant-toggle"
        onSubmit={handleSubmitEvent}
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
          style={{
            viewTransitionName: `input-${plantCategory}`,
          }}
          data-animation="form-card-input"
        />
      </form>
      <button
        type="button"
        id="add-plant-toggle"
        className={styles.openButton}
        onClick={() => {
          setOpen(true);
        }}
        onFocusCapture={closeAndSubmit}
        aria-expanded={open}
        aria-controls="add-plant-form"
        style={{ viewTransitionName: `button-add-plant-${plantCategory}` }}
        data-animation="form-card-button"
      >
        <span className="visually-hidden">{`Lägg till ${plantCategory}`}</span>
        <RiMenuAddLine aria-hidden="true" />
      </button>
    </div>
  );
}
