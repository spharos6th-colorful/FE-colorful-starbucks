'use client';

import { ProductOptionType } from '@/types/products/productPurchaseTypes';
import ProductActions from '@/components/ui/products/ProductActions';

interface ProductActionsWrapperProps {
  productId: number;
  productPrice: number;
  productOptions: ProductOptionType[];
}

export default function ProductActionsWrapper({
  productId,
  productPrice,
  productOptions,
}: ProductActionsWrapperProps) {
  return (
    <section>
      <div className='w-full z-30'>
        <ProductActions
          productId={productId}
          productPrice={productPrice}
          productOptions={productOptions}
        />
      </div>
    </section>
  );
}
