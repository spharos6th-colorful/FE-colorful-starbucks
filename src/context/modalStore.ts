import { create } from 'zustand';

import { ModalType } from '@/types/modalTypes';

type ModalStoreProps = {
  modal: ModalType;
  setModal: (value: ModalType) => void;
  clearModal: () => void;
};

export const useModalStore = create<ModalStoreProps>((set) => ({
  modal: '',
  setModal: (modalType: ModalType) => set({ modal: modalType }),
  clearModal: () => set({ modal: '' }),
}));
