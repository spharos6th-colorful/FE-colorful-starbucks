'use client';

import React, { useState } from 'react';

import ProductDetailCategoryTabBar from '@/components/modules/product/ProductDetailCategoryTabBar';
import ProductFilterRow from '@/components/modules/product/ProductFilterRow';
import { FilterDataType, SubDetailCategoryType, SubSizeCateogryType } from '@/types/products/productCategoryType';

type ProductDetailCategorySectionProps = {
  searchParams: Record<string, string | string[] | undefined>;
  subCategories: SubDetailCategoryType[];
  subVolumeCategories: SubSizeCateogryType[];
  filterOptions: FilterDataType;
};

export default function ProductDetailCategorySection({
  searchParams,
  subCategories,
  subVolumeCategories,
  filterOptions,
}: ProductDetailCategorySectionProps) {
  // 접기/펼치기 상태만 클라이언트 측에서 관리
  const [isExpanded, setIsExpanded] = useState(true);

  // 가격 필터 옵션 (모든 카테고리에 공통)
  const priceOptions = [
    { filterId: 'under10000', filterName: '1만원미만' },
    { filterId: '10000to20000', filterName: '1만원대' },
    { filterId: '20000to30000', filterName: '2만원대' },
    { filterId: '30000to40000', filterName: '3만원대' },
  ];

  return (
    <section className='w-full border-b border-stroke-100'>
      {/* 하위 카테고리 탭바 (있을 때만 표시) */}
      {subCategories.length > 0 && (
        <ProductDetailCategoryTabBar categories={subCategories} selectedIds={searchParams.bottomCategoryIds} />
      )}

      {isExpanded && (
        <>
          {/* 시즌 필터 (있을 때만 표시) */}
          {filterOptions.seasons.length > 0 && (
            <ProductFilterRow
              title='시즌'
              options={filterOptions.seasons}
              filterId='seasons'
              selectedIds={searchParams.seasons}
            />
          )}

          {subVolumeCategories.length > 0 && (
            <ProductFilterRow
              title='용량'
              options={subVolumeCategories.map((category) => ({
                filterId: category.sizeId,
                filterName: category.sizeName,
              }))}
              filterId='sizes'
              selectedIds={searchParams.sizes}
            />
          )}

          {/* 가격 필터 (항상 표시) */}
          <ProductFilterRow
            title='가격'
            options={priceOptions}
            filterId='price'
            selectedIds={searchParams.price}
            isMultiSelect={false}
          />
        </>
      )}

      {/* 접기/펼치기 버튼 */}
      <div className='w-full py-3 flex justify-center border-b border-stroke-100'>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='flex items-center text-body3 text-[var(--color-text-700)]'
        >
          {isExpanded ? '접기' : '펼치기'}
          {/* TODO 현재 접기 펼치기 아이콘 수정 요망 */}
          <span className='ml-1'>{isExpanded ? '⌃' : '⌵'}</span>
        </button>
      </div>
    </section>
  );
}
