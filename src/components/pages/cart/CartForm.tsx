import CartItem from '@/components/modules/cart/CartItem';
import CartSubmitButton from '@/components/modules/cart/CartSubmitButton';
import { CartItemDataType } from '@/types/responseDataTypes';

interface CartFormProps {
  action: (updateCartData: FormData) => void;
  cartItemDatas?: CartItemDataType[];
}

export default async function CartForm({
  action,
  cartItemDatas,
}: CartFormProps) {
  if (!cartItemDatas || cartItemDatas.length === 0) return;

  return (
    <section className='flex-1'>
      <form className='flex flex-col gap-2.5 px-6' action={action}>
        <ul className='space-y-10'>
          {cartItemDatas.map((cartItemData) => (
            <CartItem key={cartItemData.cartId} {...cartItemData} />
          ))}
        </ul>

        <CartSubmitButton />
      </form>
    </section>
  );
}
