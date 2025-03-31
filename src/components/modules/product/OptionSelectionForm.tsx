// components/modules/products/OptionSelectionForm.tsx
import React from 'react';
import OptionSelector from '@/components/ui/products/OptionSelector';
import QuantityControl from '@/components/ui/products/QuantityControl';
import { ProductOption } from '@/types/products/productPurchaseTypes';
import { useProductOptions } from '@/context/ProductOptionsContext';

interface OptionSelectionFormProps {
  productOptions: ProductOption[];
}

export default function OptionSelectionForm({ productOptions }: OptionSelectionFormProps) {
  const { currentSelections, quantity, setOptionValue, increaseQuantity, decreaseQuantity, isOptionComplete } =
    useProductOptions();

  return (
    <div className='space-y-4'>
      {/* 동적으로 옵션 선택기 렌더링 */}
      {productOptions.map((option) => (
        <OptionSelector
          key={option.id}
          label={option.name}
          value={currentSelections[option.name] || ''}
          options={option.values}
          placeholder={`${option.name}을(를) 선택해주세요`}
          onValueChange={(value: string) => setOptionValue(option.name, value)}
        />
      ))}

      {/* 모든 옵션이 선택되었을 때만 수량 선택 표시 */}
      {isOptionComplete() && (
        <div className='flex justify-between items-center'>
          <span>수량</span>
          <QuantityControl quantity={quantity} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
        </div>
      )}
    </div>
  );
}
