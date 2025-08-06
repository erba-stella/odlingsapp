"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMobileMenuStore } from "./mobileMenuStore";

type Props = {
  href: string;
  children: React.ReactNode;
  role?: string;
};

export const NavLink = ({
  href,
  role = "menuitem",
  children,
  ...props
}: Props) => {
  const pathname = usePathname();
  const isCurrentPage = pathname === href || pathname.startsWith(href + "/");
  const { closeMenu } = useMobileMenuStore();

  const handleClick = () => {
    closeMenu?.();
  };

 if (isCurrentPage) {
   /*
   If the link is the current page, render as a simple anchor tag
   with aria-current="page" for accessibility.
   This avoids unnecessary transitions and keeps the current page link accessible
   and semantically correct.
   */
   return (
     <a role={role} aria-current="page">
       {children}
     </a>
   );
 }

  return (
    <Link href={href} role={role} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};