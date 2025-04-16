'use client';
import { useEffect, useRef } from 'react';

import { useModalContext } from '@/context/ModalContext';
import { cn } from '@/lib/utils';

export function Modal({
  children,
  className,
  variant = 'card',
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: 'card' | 'bottomSheet';
}) {
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

  if (variant === 'bottomSheet') {
    return (
      <dialog
        ref={dialogRef}
        className={cn(
          'm-0 mt-auto rounded-t-md max-w-3xl',
          'backdrop:backdrop-blur-[2px] backdrop:h-full backdrop:fixed backdrop:bottom-0',
          'shadow-1',
          'transition-all animate-bottom-sheet-slide-up',
          'w-full fixed left-1/2 transform -translate-x-1/2',

          className,
        )}
        onClick={handleBackdropClick}
      >
        {children}
      </dialog>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'absolute left-1/2 top-1/2 -translate-1/2',
        'max-w-md w-[calc(100%-48px)] sm:w-full rounded-md',
        'backdrop:backdrop-blur-[2px]',
        'shadow-1',
        'overflow-visible',
        'animate-card-slide-up transition-all',
        className,
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
