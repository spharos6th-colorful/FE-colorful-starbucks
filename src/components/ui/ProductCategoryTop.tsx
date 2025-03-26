import { productCategoryTopType } from '@/types/productCategoryTopTypes';
import React from 'react';

// 기존 타입 유지
export default function ProductCategoryTop({ name, isActive = false, onClick }: productCategoryTopType) {
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
