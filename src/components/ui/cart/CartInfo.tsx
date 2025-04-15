import { Body, Caption } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';
import type { ProductDetailDataType } from '@/types/responseDataTypes';
import type { ProductTypes } from '@/types/products/productTypes';
import PrintOptions from './PrintOptions';

type CartInfoProps = {
  cartId: number;
  quantity: number;
  productData?: ProductTypes;
  productDetailData?: ProductDetailDataType;
  carvingContent?: string;
};

export default function CartInfo({
  quantity,
  productData,
  productDetailData,
  carvingContent,
}: CartInfoProps) {
  if (!productData || !productDetailData) return;

  return (
    <div className='grow w-full flex flex-col gap-y-2'>
      <Caption level={1} className='!font-medium line-clamp-2 w-full truncate'>
        {productData.productName}
      </Caption>
      <Body>{priceFormatter(productDetailData.price)}원</Body>

      <Caption className='text-text-500'>{quantity}개</Caption>

      <PrintOptions
        options={{
          colorName: productDetailData.colorName,
          sizeName: productDetailData.sizeName,
          carvingContent,
        }}
      />
    </div>
  );
}
