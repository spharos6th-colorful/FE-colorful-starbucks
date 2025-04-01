'use client';

import React from 'react';

import CategoryContent from '../modules/product/CategoryContent';

export default function ProductCategoryTopLayout({ initialCategory }: { initialCategory: string }) {
  return (
    <div className='w-full border-b boarder-stroke-100'>
      <CategoryContent initialCategory={initialCategory} />
    </div>
  );
}
