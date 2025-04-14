import React from 'react';

import { DailyRecentlyViewedProducts } from '@/types/products/productTypes';
import RecentProductGroup from './RecentProductGroup';

export default function RecentProductList({
  recentProducts,
}: {
  recentProducts: DailyRecentlyViewedProducts[];
}) {
  return (
    <section className='m-5 bg-white '>
      {recentProducts.map((products) => (
        <RecentProductGroup key={products.viewedAt} recentProducts={products} />
      ))}
    </section>
  );
}
