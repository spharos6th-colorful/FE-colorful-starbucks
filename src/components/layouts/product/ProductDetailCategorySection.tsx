'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductDetailCategoryTabBar from '@/components/modules/product/ProductDetailCategoryTabBar';
import UpIcon from '@/assets/icons/common/up.svg';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import { CategoryBottomResponseType } from '@/types/products/categoryResponseTypes';
import { priceOptions } from '@/data/category/categoryData';
import ProductPriceFilterRow from '@/components/modules/product/ProductPriceFilterRow';

type ProductDetailCategorySectionProps = {
  bottomCategory: CategoryBottomResponseType[];
};

export default function ProductDetailCategorySection({ bottomCategory }: ProductDetailCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const rawSearchParams = useSearchParams();

  const searchParams: SearchParamsType = useMemo(() => {
    const rawBottomCategoryIds = rawSearchParams.get('bottomCategoryIds');
    const bottomCategoryIds = rawBottomCategoryIds ? [...new Set(rawBottomCategoryIds.split(','))] : [];
    return {
      bottomCategoryIds: bottomCategoryIds,
      price: rawSearchParams.get('price') || '',
    };
  }, [rawSearchParams]);

  return (
    <section className='w-full border-b border-stroke-100'>
      {isExpanded && (
        <>
          {bottomCategory.length > 0 && (
            <ProductDetailCategoryTabBar categories={bottomCategory} selectedIds={searchParams.bottomCategoryIds} />
          )}
          <ProductPriceFilterRow title='가격' priceOptions={priceOptions} />
        </>
      )}
      <div className='w-full py-3 flex justify-center border-b border-stroke-100'>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='flex items-center text-body3 text-[var(--color-text-700)]'
        >
          {isExpanded ? '접기' : '펼치기'}
          <span className='ml-1'>{isExpanded ? <UpIcon /> : <UpIcon className='rotate-180' />}</span>
        </button>
      </div>
    </section>
  );
}
