'use client';

import { ProductOptionType } from '@/types/products/productPurchaseTypes';
import ProductActions from '@/components/ui/products/ProductActions';

interface ProductActionsWrapperProps {
  productId: string;
  productName: string;
  productPrice: number;
  productOptions: ProductOptionType[];
}

export default function ProductActionsWrapper({
  productId,
  productName,
  productPrice,
  productOptions,
}: ProductActionsWrapperProps) {
  return (
    <section>
      <div className='w-full z-30'>
        <ProductActions
          productId={productId}
          productName={productName}
          productPrice={productPrice}
          productOptions={productOptions}
        />
      </div>
    </section>
  );
}
