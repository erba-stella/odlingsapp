"use client";

import { createContext, useContext } from "react";

type MobileMenuContextType = {
  closeMenu?: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextType>({});

export const useMobileMenuStore = () => useContext(MobileMenuContext);

export const MobileMenuStoreProvider = ({
  children,
  closeMenu,
}: {
  children: React.ReactNode;
  closeMenu: () => void;
}) => {
  return (
    <MobileMenuContext.Provider value={{ closeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};