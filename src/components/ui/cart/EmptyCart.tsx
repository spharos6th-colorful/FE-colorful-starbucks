import { Body } from '../common';
import Cart from '@/assets/icons/common/cart.svg';

export default function EmptyCart() {
  return (
    <section className='h-full grid justify-items-center content-center items-center gap-y-3'>
      <Cart />
      <Body level={4}>장바구니가 비어있습니다.</Body>
    </section>
  );
}
