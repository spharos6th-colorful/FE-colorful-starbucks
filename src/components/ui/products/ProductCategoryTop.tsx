import React from 'react';

import { ProductCategoryTopProsType } from '@/types/products/productCategoryTopTypes';

export default function ProductCategoryTop({ name, isActive = false, onClick }: ProductCategoryTopProsType) {
  return (
    <div
      className={`px-4 py-5 text-center cursor-pointer ${
        isActive
          ? 'border-b-2 border-primary-100 text-primary-100 text-body2 font-black'
          : 'text-[var(--color-text-700)] text-body3'
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
