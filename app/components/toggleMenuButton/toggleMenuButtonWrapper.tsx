"use client";

import cn from "@/lib/utils/classNames";
import styles from "./toggleMenuButton.module.css";
import { useState, useRef } from "react";

export const ToggleMenuButtonWrapper = ({
  children,
  onClickAction,
  className,
  ...props
}: {
  children: React.ReactNode;
    onClickAction?: () => void;
    className?: string;
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
      className={cn(styles.button, className)}
      aria-expanded={isOpen}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};