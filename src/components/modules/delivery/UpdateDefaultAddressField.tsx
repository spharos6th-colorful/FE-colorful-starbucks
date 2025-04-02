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
    <RadioGroup
      defaultValue={data[defaultAddress].memberAddressUuid}
      className='px-6 [&_label]:last:border-none'
      name='memberAddressUuid'
    >
      {data.map((delivery) => (
        <label
          htmlFor={delivery.memberAddressUuid}
          className='flex gap-2 md:gap-4 py-3 items-start w-full border-b border-stroke-100'
          key={delivery.memberAddressUuid}
        >
          <RadioGroupItem value={delivery.memberAddressUuid} id={delivery.memberAddressUuid} />

          <DeliveryItem data={delivery} />

          <ActionList.Group>
            <ActionList.Item className='text-text-600'>
              <Link href={`/delivery/edit/${delivery.memberAddressUuid}`}>수정</Link>
            </ActionList.Item>
          </ActionList.Group>
        </label>
      ))}
    </RadioGroup>
  );
}
