import TotalItem from '@/components/ui/carts/TotalItem';
import TotalPrice from '@/components/ui/carts/TotalPrice';
import { BottomSheet, Button } from '@/components/ui/common';
interface BottomCartBarProps {
  count: number;
  price: number;
}

function BottomCartBar({ count, price }: BottomCartBarProps) {
  const isEmptyCart = count === 0;
  return (
    <BottomSheet>
      <div className='flex flex-row mb-[16px] items-center justify-between'>
        <TotalItem count={count} /> <TotalPrice price={price} />
      </div>
      <div className='flex gap-5'>
        <Button variant='outline' width='half' disabled={isEmptyCart}>
          선물하기
        </Button>
        <Button width='half' disabled={isEmptyCart}>
          구매하기
        </Button>
      </div>
    </BottomSheet>
  );
}
export default BottomCartBar;
