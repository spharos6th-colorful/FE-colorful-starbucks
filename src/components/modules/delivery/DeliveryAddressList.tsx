// import { getDeliveryDatas } from '
import { dummyDeliveryDatas } from '@/data/dummyDeliveryDatas';
import DeliveryItem from '../../ui/delivery/DeliveryItem';
import DeliveryActionList from './DeliveryActionList';

export default async function DeliveryAddressList() {
  // const deliveryAddressDatas = await getDeliveryDatas();
  const deliveryAddressDatas = dummyDeliveryDatas;

  return (
    <ul className='px-6 [&_li]:last:border-none pb-28'>
      {deliveryAddressDatas.map((address) => (
        <li
          key={address.memberAddressId}
          className='border-b border-b-stroke-100 py-5 flex justify-between items-start'
        >
          <DeliveryItem data={address} />
          <DeliveryActionList memberAddressId={address.memberAddressId} />
        </li>
      ))}
    </ul>
  );
}
