'use client';
import { useEffect, useRef } from 'react';

import { useModalContext } from '@/context/ModalContext';
import { cn } from '@/lib/utils';

export function Modal({ children }: { children?: React.ReactNode }) {
  const { isOpen, closeModal } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();

    if (!dialogDimensions) return;

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed left-1/2 top-1/2 -translate-1/2 max-w-md w-full min-h-40 rounded-md',
        'backdrop:backdrop-blur-[2px] transition-all',
        'shadow-1',
        'overflow-hidden',
        'animate-fade-in ease-in-out',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const CloseModal = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(className)} {...props}>
      {children}
    </button>
  );
};
