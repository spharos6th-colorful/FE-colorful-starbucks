import React from 'react';

import { ProductCategoryTopProsType } from '@/types/products/productCategoryTopTypes';
import { cn } from '@/lib/utils';

export default function ProductCategoryTop({
  name,
  isActive = false,
  onClick,
}: ProductCategoryTopProsType) {
  return (
    <div
      className={cn(
        'px-4 py-5 text-center cursor-pointer border-b-2 box-border',
        isActive
          ? 'border-primary-100 text-body3 text-primary-100 font-black'
          : 'border-transparent text-body3 text-text-700 ',
      )}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
