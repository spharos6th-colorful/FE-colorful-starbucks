import { Body, BottomSheet, Button, SubTitle } from '@/components/ui/common';

export default function CartSubmitButton() {
  return (
    <BottomSheet className='space-y-4'>
      <div className='grid grid-cols-3'>
        <Body level={1}>
          총 <span className='text-primary-100'>1</span>건
        </Body>
        <SubTitle level={1} className='col-span-2 text-right'>
          43,000<span className='text-xs'>원</span>
        </SubTitle>
      </div>
      <Button type='submit' className='w-full'>
        구매하기
      </Button>
    </BottomSheet>
  );
}
