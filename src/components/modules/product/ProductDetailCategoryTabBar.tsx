'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { SubDetailCategory } from '@/types/products/productCategoryType';

type ProductDetailCategoryTabBarProps = {
  categories: SubDetailCategory[];
  selectedIds: string | string[] | undefined;
};

const getSelectedArray = (selected?: string | string[]): string[] => {
  if (!selected) return [];
  return typeof selected === 'string' ? [selected] : selected;
};

export default function ProductDetailCategoryTabBar({ categories, selectedIds }: ProductDetailCategoryTabBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedArray = getSelectedArray(selectedIds);

  const updateQueryParams = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('bottomCategoryIds', categoryId.toString());
    return params.toString();
  };
  return (
    <div className='w-full overflow-x-auto hide-scrollbar py-4 border-b border-stroke-100'>
      <div className='flex min-w-max px-4'>
        <span className='text-body3 text-black w-20'>카테고리</span>
        <div className='flex gap-6'>
          {categories.map((category) => (
            <Link
              key={category.bottomCategoryId}
              href={`${pathname}?${updateQueryParams(category.bottomCategoryId)}`}
              className={`text-body3 ${
                selectedArray.includes(category.bottomCategoryId.toString())
                  ? 'text-primary-100 font-black'
                  : 'text-[var(--color-text-700)]'
              }`}
              scroll={false}
            >
              {category.categoryName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
