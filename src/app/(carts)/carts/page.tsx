'use client';

import BottomCartBar from '@/components/layouts/carts/BottomCartBar';
import TopAddressBar from '@/components/layouts/carts/TopAddressBar';
import CartList from '@/components/modules/carts/CartList';
import AllDeleteForm from '@/components/pages/carts/AllDeleteForm';
import { dummyCartDatas } from '@/data/carts/dummyCartDatas';
import { dummyDeliveryDatas } from '@/data/dummyDeliveryDatas';

export default function CartPage() {
  // const data = await getDeliveryDatas();
  const data = dummyDeliveryDatas;
  const cartData = dummyCartDatas;
  const onCheckChange = (id: number, checked: boolean) => {
    console.log('id:', id, 'checked:', checked);
  };

  console.log('🚀 ~ CartPage ~ data:', data);

  return (
    <main>
      <TopAddressBar addressListData={data} />
      <AllDeleteForm />
      {/* <NomalSelectBoxForm /> */}
      <CartList data={cartData} onCheckChange={onCheckChange} />
      <BottomCartBar count={3} price={50000} />
    </main>
  );
}
