import React from 'react';
import SelectedOptionItem from '@/components/ui/products/SelectOptionItem';
import { useProductOptions } from '@/context/ProductOptionsContext';

export default function SelectedOptionList() {
  const { selectedOptions, removeOption, updateOptionQuantity, productPrice } = useProductOptions();

  if (selectedOptions.length === 0) return null;

  // 총 금액 계산: 상품 가격 × 각 옵션의 수량 합계
  const totalQuantity = selectedOptions.reduce((sum, option) => sum + option.quantity, 0);
  const totalPrice = productPrice * totalQuantity;

  // 금액 포맷팅 (천 단위 콤마)
  const formattedPrice = totalPrice.toLocaleString();

  return (
    <div className='space-y-3'>
      <h3 className='font-medium'>선택된 옵션</h3>
      <div className='divide-y border rounded-md'>
        {selectedOptions.map((option) => (
          <SelectedOptionItem
            key={option.id}
            option={option}
            onRemove={removeOption}
            onQuantityChange={updateOptionQuantity}
          />
        ))}
      </div>
      <div className='bg-gray-50 p-3 rounded-md'>
        <p className='font-bold'>총 금액: {formattedPrice}원</p>
      </div>
    </div>
  );
}
