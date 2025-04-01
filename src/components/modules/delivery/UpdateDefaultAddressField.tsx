import Link from 'next/link';

// import { getDeliveryDatas } from '@/action/delivery-service';
import { ActionList, RadioGroup, RadioGroupItem } from '@/components/ui/common';
import DeliveryItem from '../../ui/delivery/DeliveryItem';
import { dummyDeliveryDatas } from '@/data/dummyDeliveryDatas';

export default async function UpdateDefaultAddressField() {
  // const data = await getDeliveryDatas();
  const data = dummyDeliveryDatas;
  const defaultAddress = data.findIndex((d) => d.isDefaultAddress);

  return (
    <RadioGroup defaultValue={data[defaultAddress].memberAddressId} className='px-6' name='memberAddressId'>
      {data.map((delivery) => (
        <label
          htmlFor={delivery.memberAddressId}
          className='flex gap-2 md:gap-4 py-3 items-start w-full'
          key={delivery.memberAddressId}
        >
          <RadioGroupItem value={delivery.memberAddressId} id={delivery.memberAddressId} />

          <DeliveryItem data={delivery} />

          <ActionList.Group>
            <ActionList.Item className='text-text-600'>
              <Link href={`/delivery/edit/${delivery.memberAddressId}`}>수정</Link>
            </ActionList.Item>
          </ActionList.Group>
        </label>
      ))}
    </RadioGroup>
  );
}
