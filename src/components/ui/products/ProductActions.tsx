'use client';

import { useScrollVisibility } from '@/hooks/useScrollVisibility';
import { Button } from '../common';
import CartIcon from '@/assets/icon/product/cart.svg';
import { useModal } from '../common/Modal';
import PurchaseModal from './PurchaseModal';
import { ProductOption } from '@/types/products/productPurchaseTypes';

interface ProductActionsProps {
  productId: string;
  productName: string;
  productPrice: number;
  productOptions: ProductOption[];
}

export default function ProductActions({ productId, productPrice, productName, productOptions }: ProductActionsProps) {
  const { modal, openModal } = useModal();
  console.log(productName);

  const handlePurchaseClick = () => {
    openModal('purchase-modal');
  };

  const isVisible = useScrollVisibility(500);
  const isPurchaseModalOpen = modal === 'purchase-modal';

  return (
    <>
      {!isPurchaseModalOpen && (
        <div
          className={`fixed max-w-3xl bottom-0 left-1/2 w-full -translate-x-1/2 p-4 z-40 bg-white rounded-t-2xl shadow-lg transition-all duration-500 ease-in-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className='flex items-center gap-3 max-w-screen-lg mx-auto'>
            <CartIcon className='flex-shrink-0' />
            <Button variant='default' className='flex-grow' onClick={handlePurchaseClick}>
              구매하기
            </Button>
          </div>
        </div>
      )}

      <PurchaseModal productId={productId} productPrice={productPrice} productOptions={productOptions} />
    </>
  );
}
