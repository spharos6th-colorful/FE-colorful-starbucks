import TotalItem from '@/components/ui/carts/TotalItem';
import TotalPrice from '@/components/ui/carts/TotalPrice';
import { BottomSheet, Button } from '@/components/ui/common';

type BottomCartBarProps = {
  count: number;
  price: number;
};

function BottomCartBar({ count, price }: BottomCartBarProps) {
  const isEmptyCart = count === 0;
  return (
    <BottomSheet className='shadow-2 '>
      <div className='grid grid-cols-2 mb-[16px] items-center justify-between w-full'>
        <TotalItem count={count} /> <TotalPrice price={price} />
      </div>
      <div className='grid  grid-cols-2 gap-4 '>
        <Button variant='outline' width='half' disabled={isEmptyCart} className='w-full'>
          선물하기
        </Button>
        <Button width='half' disabled={isEmptyCart} className='w-full'>
          구매하기
        </Button>
      </div>
    </BottomSheet>
  );
}
export default BottomCartBar;
