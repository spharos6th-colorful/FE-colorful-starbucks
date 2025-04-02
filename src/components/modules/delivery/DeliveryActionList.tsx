'use client';
import Link from 'next/link';

import { ActionList } from '@/components/ui/common';
import { useModal } from '@/components/ui/common/Modal';
import { useRouter } from 'next/navigation';
import { MODAL_TYPE } from '@/data/modalData';

export default function DeliveryActionList({ memberAddressId }: { memberAddressId?: string }) {
  const router = useRouter();
  const { openModal } = useModal();

  const handleClickDeleteButton = () => {
    openModal(MODAL_TYPE.DELETE_ADDRESS);
    router.push(`/delivery/management?memberAddressId=${memberAddressId}`);
  };
  return (
    <ActionList.Group className='[&_li]:px-2'>
      <ActionList.Item>
        <Link href={`/delivery/edit/${memberAddressId}`}>수정</Link>
      </ActionList.Item>
      <ActionList.Item>
        <button onClick={handleClickDeleteButton} className='cursor-pointer'>
          삭제
        </button>
      </ActionList.Item>
    </ActionList.Group>
  );
}
