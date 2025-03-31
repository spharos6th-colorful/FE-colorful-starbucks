import React from 'react';

import OptionSelectionForm from './OptionSelectionForm';
import SelectedOptionList from './SelectedOptionList';
import CartIcon from '@/assets/icon/product/cart.svg';
import { Button } from '@/components/ui/common';
import { useProductOptions } from '@/context/ProductOptionsContext';
import { ProductDetail, SelectedOption } from '@/types/products/productPurchaseTypes';

interface PurchaseFormProps {
  product: ProductDetail;
  onAddToCart: (options: SelectedOption[]) => void;
  onPurchase: (options: SelectedOption[]) => void;
}

export default function PurchaseForm({ product, onAddToCart, onPurchase }: PurchaseFormProps) {
  const { selectedOptions } = useProductOptions();

  const handlePurchase = () => {
    if (selectedOptions.length === 0) {
      alert('최소 한 개 이상의 옵션을 선택해주세요.');
      return;
    }
    onPurchase(selectedOptions);
  };

  const handleAddToCart = () => {
    if (selectedOptions.length === 0) return;
    onAddToCart(selectedOptions);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>구매 옵션 선택</h2>

      <OptionSelectionForm productOptions={product.options} />

      <SelectedOptionList />

      {/* 하단 버튼 영역 */}
      <div className='mt-4'>
        <div className='flex items-center gap-3'>
          <div
            onClick={handleAddToCart}
            className={`flex-shrink-0 cursor-pointer ${selectedOptions.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <CartIcon />
          </div>
          <Button
            variant='default'
            className='flex-grow'
            onClick={handlePurchase}
            disabled={selectedOptions.length === 0}
          >
            즉시구매
          </Button>
        </div>
      </div>
    </div>
  );
}
