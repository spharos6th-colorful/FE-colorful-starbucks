import { BottomSheet, Button, Heading, TextField } from '@/components/ui/common';
import CreateDeliveryAddressField from '@/components/modules/delivery/CreateDeliveryAddressField';

type DeliveryCreateProps = {
  searchParams: Promise<{ address?: string; zoneCode?: string }>;
};

export default async function DeliveryCreatePage({ searchParams }: DeliveryCreateProps) {
  const searchQuery = await searchParams;

  const handleSubmit = async (formData: FormData) => {
    'use server';
    console.log('🚀 ~ handleSubmit ~ formData:', formData);
  };

  return (
    <main>
      <Heading.Wrapper>
        <Heading.Title>배송지 정보</Heading.Title>
      </Heading.Wrapper>

      <form action={handleSubmit} className='grid gap-y-5 px-6' noValidate>
        <TextField label='주소별칭' name='addressNickname' />
        <TextField label='받는 분' name='receiverName' required />
        <CreateDeliveryAddressField searchParams={searchQuery} />
        <TextField label='상세주소' name='detailAddress' required />
        <TextField label='연락처' name='phoneNumber' required />

        <BottomSheet>
          <Button type='submit' variant={'default'} width={'auto'} className='w-full'>
            submit
          </Button>
        </BottomSheet>
      </form>
    </main>
  );
}
