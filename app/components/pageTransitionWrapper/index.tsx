"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { animate } from "motion";

type Props = {
  children: React.ReactNode;
};

export const PageTransitionWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate opacity from 0 → 1
    animate(containerRef.current, { opacity: [0, 1] }, { duration: 0.5 });
  }, [pathname]); // Run animation on path change

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};
