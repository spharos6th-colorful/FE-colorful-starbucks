'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ModalContainerProps, ModalProps } from '@/types/modalTypes';
import { useModalStore } from '@/context/modalStore';
import { cn } from '@/lib/utils';

export const useModal = () => {
  const { modal, setModal, clearModal } = useModalStore();

  return {
    modal,
    openModal: setModal,
    closeModal: clearModal,
  };
};

export const Modal = ({ children, type, variant = 'slide', className = '' }: ModalProps) => {
  const { modal, closeModal } = useModal();
  const [body, setBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') setBody(document.body);
  }, []);

  const removeModal = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    closeModal();
  };

  const modalContent =
    modal === type ? (
      <div
        onClick={(e) => removeModal(e)}
        className='fixed max-w-3xl z-20 left-1/2 bg-black/30 bottom-0 -translate-x-1/2 w-full h-full'
      >
        <ModalContainer variant={variant} className={cn(className)}>
          {children}
        </ModalContainer>
      </div>
    ) : null;

  if (!body) return;

  return createPortal(modalContent, body);
};

/**
 * Modal 생성 시에 useEffect 실행되서 Modal 을 제외하고, scroll 동작 막기 위함.
 */
const ModalContainer = ({ children, variant, className }: ModalContainerProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (variant === 'card')
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'animate-slide-up absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2',
          'shadow-[0_4px_10px_rgba(0,0,0,0.06)]',
          'max-w-lg w-full mx-auto',
          'bg-white rounded-lg',
          'px-6 py-5',
          className,
        )}
      >
        {children}
      </div>
    );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'animate-slide-up absolute left-0 bottom-0',
        'w-full px-6 pt-6 pb-8',
        'shadow-[0_-4px_10px_rgba(0,0,0,0.06)] rounded-t-lg bg-white flex flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
};
