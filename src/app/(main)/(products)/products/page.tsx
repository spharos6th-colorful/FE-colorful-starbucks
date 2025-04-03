import React from 'react';

import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import ProductCategoryTopTabBar from '@/components/layouts/ProductCategoryTopTabBar';

type SearchParams = Promise<SearchParamsType>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const topCategoryId = searchParams.topCategoryId || '1';

  const filteredParams: Record<string, string | string[] | undefined> = {};

  Object.entries(searchParams).forEach(([key, value]) => {
    filteredParams[key] = value;
  });

  return (
    <main>
      <ProductCategoryTopTabBar initialCategory={topCategoryId} />
      {/* 상품 소분류 카테고리 및 옵션들이 들어갈 예정 */}
      {/* 상품 리스트 나타낼 페이지가 들어갈 예정 */}
    </main>
  );
}
