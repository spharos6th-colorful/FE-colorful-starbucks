import Link from 'next/link';
// import Image from 'next/image';

import { Body } from '@/components/ui/common';
import CartForm from '@/components/pages/cart/CartForm';
import CartController from '@/components/modules/cart/CartController';
import { getCartDatas } from '@/actions/cart-service';

export default async function CartPage() {
  const cartDatas = await getCartDatas();

  const action = async (updateCartData: FormData) => {
    'use server';
    console.log('🚀 ~ action ~ cartsData:', updateCartData);
  };

  if (!cartDatas?.productDetails || cartDatas.productDetails.length === 0) {
    return (
      <main className='flex flex-col min-h-dvh bg-white'>
        <section className='p-6 bg-gray-50 flex justify-between items-start'>
          <Body level={3}>
            등록된 배송지가 없습니다.
            <br />
            배송지를 등록해주세요.
          </Body>
          <Link
            href={'/delivery/create'}
            className='text-primary-100 text-caption2'
          >
            배송지 등록
          </Link>
        </section>
        <section>장바구니가 비어있습니다.</section>
      </main>
    );
  }

  return (
    <main className='flex flex-col min-h-dvh bg-white'>
      {/* 배송지 정보 */}
      <section className='p-6 bg-gray-50 flex justify-between items-start'>
        <Body level={3}>
          등록된 배송지가 없습니다.
          <br />
          배송지를 등록해주세요.
        </Body>
        <Link
          href={'/delivery/create'}
          className='text-primary-100 text-caption2'
        >
          배송지 등록
        </Link>
      </section>

      <CartController cartDatas={cartDatas.productDetails} />

      <Body level={3} className='px-6 pt-6 pb-4'>
        <span className='text-primary-100'>{cartDatas.totalElements}</span>개의
        상품이 있습니다.
      </Body>
      <CartForm action={action} cartItemDatas={cartDatas.productDetails} />
    </main>
  );
}
