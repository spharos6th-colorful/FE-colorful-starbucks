'use client';

import { Checkbox } from '@/components/ui/common/checkbox';
import { ActionList } from '@/components/ui/common';
import { CartItemDataType } from '@/types/responseDataTypes';
import { deleteCartItem } from '@/actions/cart-service';

export default function CartController({
  cartDatas,
}: {
  cartDatas: CartItemDataType[];
}) {
  const isAllChecked = cartDatas.every((cart) => cart.checked);
  const selectedCart = cartDatas.filter((cart) => cart.checked);

  const handleClickSelectedCartDelete = async (
    deleteCartId: CartItemDataType[],
  ) => {
    const cartIds = deleteCartId.map((cart) => ({ cartId: cart.cartId }));

    try {
      await deleteCartItem(cartIds);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className='flex justify-between items-center px-4 py-3 border-b'>
      <label className='flex items-center gap-2.5 text-body3'>
        <Checkbox checked={isAllChecked} />
        <span>전체 선택</span>
      </label>

      <ActionList.Group className='*:px-2.5 *:!text-extra [&_button]:cursor-pointer'>
        <ActionList.Item className='text-primary-100'>
          <button
            type='button'
            aria-label='선택 삭제'
            onClick={() => handleClickSelectedCartDelete(selectedCart)}
          >
            선택 삭제
          </button>
        </ActionList.Item>
        <ActionList.Item>
          <button type='button' aria-label='전체 삭제'>
            전체 삭제
          </button>
        </ActionList.Item>
      </ActionList.Group>
    </section>
  );
}
