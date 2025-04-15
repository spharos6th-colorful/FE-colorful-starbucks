import Image from 'next/image';

import type { CartItemDataType } from '@/types/responseDataTypes';
import {
  getProductDetail,
  getProudctDetailData,
} from '@/actions/product-service';
import CartItemTopController from '@/components/ui/cart/CartItemTopController';
import CartOptionController from '@/components/ui/cart/CartOptionController';
import { Body, Caption } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';
import Link from 'next/link';
import PrintOptions from '@/components/ui/cart/PrintOptions';

export default async function CartItem({
  cartId,
  checked,
  quantity,
  productCode,
  productDetailCode,
  carvingContent,
}: CartItemDataType) {
  const productData = await getProductDetail(productCode);
  const productDetailData = await getProudctDetailData(productDetailCode);

  if (!productData || !productDetailData) return;

  return (
    <li className='flex flex-col gap-2.5 md:gap-4'>
      <CartItemTopController cartId={cartId} checked={checked} />
      <div className='flex items-start gap-2.5 md:gap-4'>
        <Link
          href={`/product/${productCode}`}
          className='block w-full min-w-20 max-w-28 relative aspect-square rounded-sm overflow-hidden'
        >
          <Image
            src={productData.productThumbnailUrl}
            alt={`${productData.productName} 이미지`}
            fill
            className='object-cover'
            sizes='100%'
            priority
          />
        </Link>

        <div className='grow w-full flex flex-col gap-y-2 py-2'>
          <Caption
            level={1}
            className='!font-medium line-clamp-2 w-full truncate text-text-900'
          >
            {productData.productName}
          </Caption>
          <Body>{priceFormatter(productDetailData.price)}원</Body>

          <PrintOptions
            options={{
              quantity: quantity,
              colorName: productDetailData.colorName,
              sizeName: productDetailData.sizeName,
              carvingContent: carvingContent,
            }}
          />

          <CartOptionController />
        </div>
      </div>
    </li>
  );
}
