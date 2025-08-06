"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./transitionLink";

type Props = {
  href: string;
  children: React.ReactNode;
};

export const NavLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  if (isActive) {
    return (
      <a
        role="menuitem"
        aria-current="page"
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink
      href={href}
      role="menuitem"
    >
        {children}
    </TransitionLink>
  );
}