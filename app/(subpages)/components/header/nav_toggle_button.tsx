"use client";

import styles from "@/app/(subpages)/subpages.module.css";
import { useState, useRef } from "react";


export const NavToggleButton = ({
  children,
}: {
  children: React.ReactNode;
    }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const btnOpenMenuRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = () => {
      setIsOpen(!isOpen);
      // Return focus on the hamburger button when the menu closes
      if (isOpen) btnOpenMenuRef.current?.focus();
    };

    return (
      <button
        className={`${styles.navToggleButton}`}
        aria-haspopup="menu"
        aria-controls="nav-toggle-menu"
        aria-expanded={isOpen}
        ref={btnOpenMenuRef}
        onClick={handleClick}
      >
        {children}
      </button>
    );
};
