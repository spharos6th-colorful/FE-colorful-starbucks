'use client';
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { sampleCategories } from '@/data/productCategoryTopDummyDatas';
import { ProductCategoryTopType } from '@/types/products/productCategoryType';
import ProductCategoryTop from '../ui/products/ProductCategoryTop';

function CategorySkeleton() {
  return (
    <div className='w-full border-b boarder-stroke-100'>
      <div className='flex overflow-x-auto'>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className='flex-shrink-0'>
            <div className='h-12 w-24 bg-gray-200 animate-pulse rounded m-2'></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryCode = searchParams.get('category') || 'all';

  const handleCategoryClick = (category: ProductCategoryTopType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category.code);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='flex overflow-x-auto'>
      {sampleCategories.map((category) => (
        <div key={category.code} className='flex-shrink-0'>
          <ProductCategoryTop
            name={category.name}
            isActive={currentCategoryCode === category.code}
            onClick={() => handleCategoryClick(category)}
          />
        </div>
      ))}
    </div>
  );
}

// Parent component with Suspense
export default function ProductCategoryTopLayout() {
  return (
    <div className='w-full border-b boarder-stroke-100'>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent />
      </Suspense>
    </div>
  );
}
