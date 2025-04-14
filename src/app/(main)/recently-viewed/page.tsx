import React from 'react';

import { getRecentlyProductsDummy } from '@/actions/product-service';
import RecentProductList from '@/components/pages/product/RecentProductList';

export default async function RecentlyViewedPage() {
  // const recentProducts = await getRecentlyProducts();
  const recentProducts = await getRecentlyProductsDummy();
  return (
    <>
      <header></header>
      <main>
        <RecentProductList recentProducts={recentProducts} />
      </main>
    </>
  );
}
