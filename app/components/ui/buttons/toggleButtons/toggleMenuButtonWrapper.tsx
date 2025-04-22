"use client";

import styles from "./toggleMenuButton.module.css";
import { useState, useRef } from "react";

export const ToggleMenuButtonWrapper = ({
  children,
  onClickAction,
  ...props
}: {
  children: React.ReactNode;
  onClickAction?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
    // Return focus on the button when the menu closes
    if (isOpen) btnRef.current?.focus();
    if (onClickAction) onClickAction();
  };

  return (
    <button
      ref={btnRef}
      className={`${styles.button}`}
      aria-expanded={isOpen}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};