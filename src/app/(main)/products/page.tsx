import React from 'react';

import { getTopCategories } from '@/actions/product-service';
import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
// import { SearchParamsType } from '@/data/productDummy/productSearchTypes';

export default async function ProductsPage() {
  const categoryTop: CategoryTopResponseType[] = await getTopCategories(0, 10);

  return (
    <main>
      <ProductCategoryTopTabBar categoryTop={categoryTop} />
    </main>
  );
}
