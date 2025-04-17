import { Body, BottomSheet, Button, SubTitle } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';

export default async function CartSubmitButton({
  selectItemCount,
  totalPrice,
}: {
  selectItemCount: number;
  totalPrice: number;
}) {
  return (
    <BottomSheet className='space-y-4 z-40'>
      <div className='grid grid-cols-3 py-3'>
        <Body level={1}>
          총 <span className='text-primary-100'>{selectItemCount}</span>건
        </Body>
        <SubTitle level={1} className='col-span-2 text-right'>
          {priceFormatter(totalPrice)}
          <span className='text-xs'>원</span>
        </SubTitle>
      </div>
      <Button type='submit' className='w-full'>
        구매하기
      </Button>
    </BottomSheet>
  );
}
