import Link from 'next/link';

import { BottomSheet, Button, Heading } from '@/components/ui/common';
import DeliveryAddressList from '@/components/modules/delivery/DeliveryAddressList';
import IconPlus from '@/assets/icon/delivery/plusIcon.svg';

export default async function DeliveryManagementPage() {
  return (
    <>
      <Heading.Wrapper>
        <Heading.Title>배송지 관리</Heading.Title>
      </Heading.Wrapper>

      <DeliveryAddressList />

      <BottomSheet>
        <Button variant={'default'} width={'auto'} className='w-full' asChild>
          <Link href='/delivery/create'>
            <IconPlus width={12} height={12} /> 새 배송지 추가
          </Link>
        </Button>
      </BottomSheet>
    </>
  );
}
