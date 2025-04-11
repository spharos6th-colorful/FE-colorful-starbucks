import React from 'react';

import { getBottomCategories, getTopCategories } from '@/actions/product-service';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
// import CategoryContent from '@/components/modules/product/CategoryContent';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
  const params = await searchParams;
  const filteredParams: SearchParamsType = {};

  Object.entries(params).forEach(([key, value]) => {
    if (key === '') {
      return (filteredParams[key] = value ? (value as string) : '20');
    }
    filteredParams[key] = value;
  });

  const topCategoryId = params.topCategoryId || '1';

  const [topCategory, bottomCategory] = await Promise.all([
    getTopCategories(0, 10),
    getBottomCategories(Number(topCategoryId), 0, Number(params.key)),
  ]);

  return (
    <>
      <header>
        <nav>
          <ProductCategoryTopTabBar topCategory={topCategory} />
          <ProductDetailCategorySection bottomCategory={bottomCategory} />
        </nav>
      </header>
      <main></main>
    </>
  );
}
