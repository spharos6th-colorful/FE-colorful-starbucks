'use client';

import Counter from '@/components/ui/carts/Counter';
import { Checkbox } from '@/components/ui/CheckBox';
import DeleteButton from '@/components/ui/common/DeleteButton';
import priceFormatter from '@/lib/priceFormatter';
import { cartListDataType } from '@/types/responseDataTypes';
import Image from 'next/image';
import React from 'react';

interface CartsProductProps {
  item: cartListDataType;
  onCheckChange: (id: number, checked: boolean) => void;
}
export default function CartsProduct({ item, onCheckChange }: CartsProductProps) {
  const handleChangeCheckbox = (checked: boolean) => {
    onCheckChange(item.id, checked);
    //checkCartProduct(item.id, e.target.checked);
  };
  const handleItemDeleted = () => {
    console.log('항목이 삭제되었습니다');
  };
  return (
    <li key={item.id} className='flex  py-[24px] px-[22px] w-full border-b'>
      <Checkbox checked={item.checked} onCheckedChange={handleChangeCheckbox} id={item.id.toString()} />
      <div className=' relative  w-full aspect-square max-w-[120px] max-h-[120px] mx-[11px] '>
        <Image
          src={item.productThumbnailUrl}
          alt='example'
          fill
          style={{ objectFit: 'contain' }}
          className='rounded-[4px]'
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-between items-start mb-2'>
          <p className='text-caption1 md:text-body2 grow'> {item.name}</p>
          <DeleteButton id={item.id} onClick={handleItemDeleted} />
        </div>
        <div className='flex justify-between items-center w-full h-full'>
          <Counter initValue={item.quantity} max={3} min={1} />
          <p className='text-caption1 md:text-body2'> {priceFormatter(item.price)}원</p>
        </div>
      </div>
    </li>
  );
}
