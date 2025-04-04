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
        'sticky left-1/2 top-1/2 -translate-1/2',
        'max-w-md w-[calc(100%-48px)] sm:w-full min-h-40 rounded-md',
        'backdrop:backdrop-blur-[2px]',
        'shadow-1',
        'overflow-hidden',
        'animate-card-slide-up transition-all',
      )}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
}

interface ButtonProps<T> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  handleClose?: (data?: T) => void;
}

export function CloseModal<T>({
  className,
  children,
  handleClose,
  ...props
}: ButtonProps<T>) {
  const { closeModal } = useModalContext();

  const onclick = () => {
    if (handleClose) {
      handleClose();
    }
    closeModal();
  };

  return (
    <button className={cn(className)} onClick={onclick} {...props}>
      {children}
    </button>
  );
}
