'use client';
import type { CheckedState } from '@radix-ui/react-checkbox';

import useDebounce from '@/hooks/useDebounce';
import { Checkbox } from '@/components/ui/common/checkbox';
import { updateCartChecked } from '@/actions/cart-service';
import DeleteCartItemButton from './DeleteCartItemButton';

type CartTopItemControllerProps = { checked: boolean; cartId: number };

export default function CartItemTopController({
  checked,
  cartId,
}: CartTopItemControllerProps) {
  const debounce = useDebounce();
  const handleChange = async (cartId: number, updatedChecked: CheckedState) => {
    try {
      const data = { id: cartId, checked: updatedChecked };
      await updateCartChecked(data);
    } catch (error) {
      throw error;
    }
  };

  const handleDebounceChange = debounce(
    (cartId: number, checked: CheckedState) => handleChange(cartId, checked),
    200,
  );

  return (
    <div className='flex items-center justify-between'>
      <Checkbox
        className='aspect-square'
        checked={checked}
        value={cartId}
        name='cartId'
        onCheckedChange={(e) => handleDebounceChange(cartId, e)}
      />

      <DeleteCartItemButton cartId={cartId} />
    </div>
  );
}
