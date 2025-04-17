'use client';

import { cn } from '@/lib/utils';
import CartOptionModal from '@/components/modules/cart/CartOptionModal';
import type {
  ProductDetailDataType,
  ProductOptionDataType,
} from '@/types/responseDataTypes';
import { useModalContext } from '@/context/ModalContext';

type CartOptionTriggerProps = {
  cartId: number;
  quantity: number;
  productCode: number;
  productDetail: ProductDetailDataType;
  options: ProductOptionDataType;
};

export default function CartOptionTrigger({
  cartId,
  productCode,
  productDetail,
  options,
  quantity,
}: CartOptionTriggerProps) {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(
      <CartOptionModal
        quantity={quantity}
        productCode={productCode}
        cartId={cartId}
        productDetail={productDetail}
        options={options}
      />,
    );
  };

  return (
    <button
      type='button'
      onClick={() => handleClick()}
      className={cn(
        'border border-stroke-300 px-3 py-2 w-fit rounded-sm cursor-pointer',
        '!text-text-900 text-caption2',
        'active:!text-black active:!border-black',
        'transition-colors',
      )}
    >
      옵션 변경
    </button>
  );
}
