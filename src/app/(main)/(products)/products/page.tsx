import React from 'react';

import ProductCategoryTopLayout from '@/components/layouts/ProductCategoryTopLayout';

type SearchParams = Promise<{ category?: string }>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const currentCategory = searchParams.category || 'all';
  return (
    // 가장 큰 속성에는 대부분 스타일은 뺀다.(안에 있는걸 줄이면 됨)
    <main>
      <ProductCategoryTopLayout initialCategory={currentCategory} />
      {/* 상품 소분류 카테고리 및 옵션들이 들어갈 예정 */}
      {/* 상품 리스트 나타낼 페에지가 들어갈 예정 */}
      {/* <ProductList categoryId={activeCategoryId} /> */}
    </main>
  );
}
