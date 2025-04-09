'use client';
import React from 'react';

import CategoryContent from '../../modules/product/CategoryContent';

export default function ProductCategoryTopTabBar({
  initialCategory,
}: {
  initialCategory: string;
}) {
  return (
    <div className='w-full border-b boarder-stroke-100 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <CategoryContent initialCategory={initialCategory} />
      </div>
    </div>
  );
}
