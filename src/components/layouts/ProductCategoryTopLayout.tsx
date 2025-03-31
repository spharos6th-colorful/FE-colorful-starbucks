'use client';

import React, { Suspense } from 'react';

import CategorySkeleton from '../ui/skeleton/CategorySkeleton';
import CategoryContent from '../modules/product/CategoryContent';

export default function ProductCategoryTopLayout() {
  return (
    <div className='w-full border-b boarder-stroke-100'>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent />
      </Suspense>
    </div>
  );
}
