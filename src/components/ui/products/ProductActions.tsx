'use client';

import { useScrollVisibility } from '@/hooks/useScrollVisibility';
import { Button } from '../common';
import CartIcon from '@/assets/icon/product/cart.svg';

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  console.log(productId);
  const isVisible = useScrollVisibility(500);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 z-50 bg-white rounded-t-2xl transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className=' flex items-center gap-3'>
        <CartIcon className='flex-shrink-0' />
        <Button variant='default' className='flex-grow'>
          구매하기
        </Button>
      </div>
    </div>
  );
}
