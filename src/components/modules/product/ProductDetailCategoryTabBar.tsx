'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import { SubDetailCategory } from '@/types/products/productCategoryType';
import { ProductBottomTabBarWrapper } from '@/components/ui/common/product/ProductBottomTabBarWrapper';

type ProductDetailCategoryTabBarProps = {
  categories: SubDetailCategory[];
  selectedIds: string | string[] | undefined;
};

const getSelectedArray = (selected?: string | string[]): string[] => {
  if (!selected) return [];
  return typeof selected === 'string' ? selected.split(',') : selected;
};

export default function ProductDetailCategoryTabBar({ categories, selectedIds }: ProductDetailCategoryTabBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedArray = getSelectedArray(selectedIds);

  const updateQueryParams = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);
    const categoryIdString = categoryId.toString();

    if (selectedArray.includes(categoryIdString)) {
      const newSelected = selectedArray.filter((id) => id !== categoryIdString);

      if (newSelected.length === 0) {
        params.delete('bottomCategoryIds');
      } else {
        params.set('bottomCategoryIds', newSelected.join(','));
      }
    } else {
      const newSelected = [...selectedArray, categoryIdString];
      params.set('bottomCategoryIds', newSelected.join(','));
    }

    return params.toString();
  };

  return (
    <ProductBottomTabBarWrapper title='카테고리'>
      {categories.map((category) => (
        <Link
          key={category.bottomCategoryId}
          href={`${pathname}?${updateQueryParams(category.bottomCategoryId)}`}
          className={`text-body3 ${
            selectedArray.includes(category.bottomCategoryId.toString())
              ? 'text-primary-100 font-black'
              : 'text-text-700'
          }`}
          scroll={false}
        >
          {category.categoryName}
        </Link>
      ))}
    </ProductBottomTabBarWrapper>
  );
}
