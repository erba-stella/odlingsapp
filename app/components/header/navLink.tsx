"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: Props) {
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
    <Link role="menuitem" href={href}>
      {children}
    </Link>
  );
}