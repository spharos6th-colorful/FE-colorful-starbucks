'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';

import { Modal } from '@/components/ui/common/Modal/modal';

type ModalContextType = {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      <Modal>{content}</Modal>
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
