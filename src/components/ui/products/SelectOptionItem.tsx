import React from 'react';

import QuantityControl from './QuantityControl';
import { SelectedOption } from '@/types/products/productPurchaseTypes';

interface SelectedOptionItemProps {
  option: SelectedOption;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function SelectedOptionItem({ option, onRemove, onQuantityChange }: SelectedOptionItemProps) {
  const { id, options, quantity } = option;

  const handleIncrease = () => onQuantityChange(id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  // 옵션 값들을 텍스트로 변환 (예: "색상: 블랙, 사이즈: M")
  const optionsText = Object.entries(options)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  return (
    <div className='p-3 flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <span>{optionsText}</span>
        <button onClick={() => onRemove(id)} className='text-gray-400 hover:text-gray-600'>
          ✕
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-500'>수량</span>
        <QuantityControl quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} size='small' />
      </div>
    </div>
  );
}
