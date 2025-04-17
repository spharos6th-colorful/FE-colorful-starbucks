import { getProudctDetailData } from '@/actions/product-service';
import CartController from '@/components/modules/cart/CartController';
import CartItem from '@/components/modules/cart/CartItem';
import CartSubmitButton from '@/components/modules/cart/CartSubmitButton';
import { Body, SubTitle, Title } from '@/components/ui/common';
import type { CartDatasType } from '@/types/responseDataTypes';

interface CartFormProps {
  action: (createOrderData: FormData) => void;
  cartDatas?: CartDatasType;
}

export default async function CartForm({ action, cartDatas }: CartFormProps) {
  if (!cartDatas || cartDatas.totalElements === 0) return;

  const checkedCartItems = cartDatas.productDetails.filter(
    (item) => item.checked,
  );
  const selectedCartProducts = await Promise.all(
    checkedCartItems.map(async (item) => {
      const data = await getProudctDetailData(item.productDetailCode);

      return data.price * item.quantity;
    }),
  );

  const totalPrice = selectedCartProducts.reduce((acc, item) => {
    return acc + item;
  }, 0);

  return (
    <>
      <CartController cartDatas={cartDatas.productDetails} />

      <Body level={3} className='px-6 pt-6 pb-4'>
        <span className='text-primary-100'>{cartDatas.totalElements}</span>개의
        상품이 있습니다.
      </Body>
      <form className='flex flex-col gap-2.5' action={action}>
        <ul>
          {cartDatas.productDetails.map((cartItemData) => (
            <CartItem key={cartItemData.cartId} {...cartItemData} />
          ))}
        </ul>

        <CartSubmitButton
          selectItemCount={checkedCartItems.length}
          totalPrice={totalPrice}
        />
      </form>

      <section className='px-6 py-10 grid grid-cols-2 items-center'>
        <SubTitle className='w-fit'>총 결제예정금액</SubTitle>
        <Title className='text-right'>
          {totalPrice.toLocaleString()}
          <span className='text-subtitle1'>원</span>
        </Title>
      </section>
    </>
  );
}
