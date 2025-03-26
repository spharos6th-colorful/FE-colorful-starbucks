import React from 'react';

import { ProductCategoryTopType } from '@/types/productCategoryTopTypes';

export default function ProductCategoryTop({ name, isActive = false, onClick }: ProductCategoryTopType) {
  return (
    <div
      className={`px-4 py-5 text-center cursor-pointer ${
        isActive
          ? 'text-[var(--color-primary-100)] font-semibold text-body3'
          : 'text-[var(--color-text-700)] text-body3'
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
