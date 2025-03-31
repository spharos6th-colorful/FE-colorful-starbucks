import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';
import { sampleCategories } from '@/data/productCategoryTopDummyDatas';
import { ProductCategoryTopType } from '@/types/products/productCategoryType';

export default function CategoryContent() {
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
