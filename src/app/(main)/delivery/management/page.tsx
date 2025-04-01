import Link from 'next/link';

import { BottomSheet, Button, Heading } from '@/components/ui/common';
import DeliveryAddressList from '@/components/modules/delivery/DeliveryAddressList';
import DeleteAddressModal from '@/components/ui/delivery/DeleteAddressModal';
import IconPlus from '@/assets/icon/delivery/plusIcon.svg';

interface DeliveryManagementPageProps {
  searchParams: Promise<{ memberAddressId?: string }>;
}

export default async function DeliveryManagementPage({ searchParams }: DeliveryManagementPageProps) {
  const { memberAddressId } = await searchParams;
  console.log('🚀 ~ DeliveryManagementPage ~ memberAddressId:', memberAddressId);

  return (
    <>
      <Heading.Wrapper>
        <Heading.Title>배송지 관리</Heading.Title>
      </Heading.Wrapper>

      <DeliveryAddressList />

      {memberAddressId ? <DeleteAddressModal memberAddressId={memberAddressId} /> : null}

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
