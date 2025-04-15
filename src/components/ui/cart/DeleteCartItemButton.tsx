'use client';
import { deleteCartItem } from '@/actions/cart-service';
import Delete from '@/assets/icons/cart/delete.svg';

export default function DeleteCartItemButton({ cartId }: { cartId: number }) {
  const handleDeleteCartItem = async (cartId: number) => {
    const deleteCartItemData = [{ cartId }];

    try {
      await deleteCartItem(deleteCartItemData);
    } catch (error) {
      console.log('🚀 ~ handleDeleteCartItem ~ error:', error);
      throw error;
    }
  };

  return (
    <button
      type='button'
      className='flex-shrink-0 ml-2 cursor-pointer'
      aria-label='상품 삭제'
      onClick={() => handleDeleteCartItem(cartId)}
    >
      <Delete className='*:stroke-text-300 hover:*:stroke-black active:*:stroke-black' />
    </button>
  );
}
