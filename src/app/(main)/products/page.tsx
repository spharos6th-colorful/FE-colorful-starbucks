import React from 'react';

import { getBottomCategories, getTopCategories } from '@/actions/product-service';
import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
  const topCategory: CategoryTopResponseType[] = await getTopCategories(0, 10);
  const params = await searchParams;
  const filteredParams: SearchParamsType = {};
  const topCategoryId = params.topCategoryId || '1';

  Object.entries(params).forEach(([key, value]) => {
    if (key === '') {
      return (filteredParams[key] = value ? (value as string) : '20');
    }
    filteredParams[key] = value;
  });

  const bottomCategory = await getBottomCategories(Number(topCategoryId), 0, Number(params.key));

  return (
    <main>
      <ProductCategoryTopTabBar topCategory={topCategory} />
      <ProductDetailCategorySection bottomCategory={bottomCategory} />
    </main>
  );
}
