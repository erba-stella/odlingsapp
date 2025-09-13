"use client";

import { useEffect, useRef, useState } from "react";
import { NavList } from "./NavList";
import { ToggleOpenCloseIcon } from "@/app/components/toggleMenuButton";
import { MobileMenuStoreProvider } from "./mobileMenuStore";
import useClickOutside from "@/lib/hooks/useClickOutside";
import useFocusOutside from "@/lib/hooks/useFocusOutside";
import styles from "./pageHeader.module.css";
import cn from "@/lib/utils/classNames";

export const MobileNavToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("page-header");
      if (el) headerRef.current = el;
    }
  }, []);

  useClickOutside({
    ref: headerRef as React.RefObject<HTMLElement>,
    action: () => {
      if (isOpen) setIsOpen(false);
    },
  });

  useFocusOutside({
    ref: headerRef as React.RefObject<HTMLElement>,
    onFocusOut: () => {
      if (isOpen) setIsOpen(false);
    },
  });

  return (
    <>
      <button
        className={styles.toggleMenuButton}
        aria-expanded={isOpen}
        aria-controls="navToggleMenu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ToggleOpenCloseIcon iconStyle="hamburger" />
      </button>

      <MobileMenuStoreProvider closeMenu={() => setIsOpen(false)}>
        <div
          id="navToggleMenu"
          className={cn(styles.navToggleMenu, 
            isOpen && styles.menuOpen,
            !isOpen && styles.menuClose)}
        >
          <nav className={cn(styles.navmenu, styles.mobile)} aria-label="Main">
            <NavList />
          </nav>
        </div>
      </MobileMenuStoreProvider>
    </>
  );
};