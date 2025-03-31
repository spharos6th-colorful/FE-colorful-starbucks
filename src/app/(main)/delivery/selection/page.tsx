import Image from 'next/image';
import Link from 'next/link';

import { Heading } from '@/components/ui/common/Heading';
import UpdateDefaultAddressForm from '@/components/pages/delivery/UpdateDefaultAddressForm';
import plusIcon from '@/assets/icon/delivery/plusIcon.svg';

export default async function DeliverySelectionPage() {
  const handleUpdateDefaultAddress = async (updateDefaultAddressData: FormData) => {
    'use server';
    console.log('🚀 ~ handleUpdateDefaultAddress ~ updateDefaultAddressData:', updateDefaultAddressData);
  };

  return (
    <>
      <Heading.Wrapper>
        <Heading.Title>배송지 선택</Heading.Title>
        <Link href='/delivery/create' className='flex gap-1.5 text-primary-100 text-body3'>
          <Image src={plusIcon} alt='새 배송지 추가 아이콘' />
          <span>새 배송지 추가</span>
        </Link>
      </Heading.Wrapper>

      <UpdateDefaultAddressForm handleUpdateDefaultAddress={handleUpdateDefaultAddress} />
    </>
  );
}
