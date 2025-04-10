'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ActionList } from '@/components/ui/common';
import { useModalContext } from '@/context/ModalContext';
import DeleteAddressModal from '@/components/ui/delivery/DeleteAddressModal';

export default function DeliveryActionList({
  memberAddressId,
}: {
  memberAddressId: string;
}) {
  const router = useRouter();
  const { openModal } = useModalContext();

  const handleClickDeleteButton = () => {
    openModal(<DeleteAddressModal memberAddressId={memberAddressId} />);
    router.push(`/delivery?memberAddressId=${memberAddressId}`);
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
