import { MODAL_TYPE } from '@/data/modalData';

export type ModalContextType = {
  modals: ModalType[];
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

export interface ModalProps {
  type: ModalType;
  variant?: ModalVariantType;
  children?: Readonly<React.ReactNode>;
  className?: string;
}

export interface ModalContextProps {
  children?: Readonly<React.ReactNode>;
}

export interface ModalContainerProps {
  children?: React.ReactNode;
  variant?: ModalVariantType;
  className?: string;
}

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

type ModalVariantType = 'slide' | 'card';
