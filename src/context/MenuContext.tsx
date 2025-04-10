'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type MenuContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const MenuProvider = ({ children }: { children?: Readonly<React.ReactNode> }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <MenuContext.Provider value={{ isOpen, setIsOpen }}>{children}</MenuContext.Provider>;
};
