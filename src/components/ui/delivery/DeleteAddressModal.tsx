'use client';
import { useRouter } from 'next/navigation';

import { Body } from '@/components/ui/common';
import { Modal } from '@/components/ui/common/Modal';
import { ModalButtons } from '../common/Modal/ModalButtons';
import { deleteAddress } from '@/actions/delivery-service';
import { useModalContext } from '@/context/ModalContext';

interface DeleteAddressModalProps {
  memberAddressId: string;
}

export default function DeleteAddressModal({
  memberAddressId,
}: DeleteAddressModalProps) {
  const router = useRouter();
  const { closeModal } = useModalContext();

  const handleClickReset = () => {
    closeModal();
    router.back();
  };

  const handleDeleteAddressData = async (memberAddressId: string) => {
    try {
      await deleteAddress(memberAddressId);
    } catch (error) {
      console.log('🚀 ~ handleDeleteAddressData ~ error:', error);
      alert('주소 삭제 실패');
      throw error;
    }
  };

  return (
    <Modal variant='card'>
      <Body level={3} className='px-6 pt-10 pb-6 text-text-700'>
        배송지를 삭제하시겠어요?
      </Body>

      <ModalButtons.Wrapper>
        <ModalButtons.Button
          onClick={handleClickReset}
          className='text-text-700'
        >
          취소
        </ModalButtons.Button>
        <ModalButtons.Button
          onClick={() => handleDeleteAddressData(memberAddressId)}
          className='text-primary-100'
        >
          삭제
        </ModalButtons.Button>
      </ModalButtons.Wrapper>
    </Modal>
  );
}
