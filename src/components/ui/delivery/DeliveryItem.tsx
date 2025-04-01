import { Body, Tag } from '@/components/ui/common';
import { DeliveryDataType } from '@/types/responseDataTypes';

export default function DeliveryItem({ data }: { data: DeliveryDataType }) {
  return (
    <div className='space-y-2 grow w-[calc(100%-90px)]'>
      <Body className='flex items-center gap-1 text-body2'>
        <span>
          {data.receiverName}
          {`(${data.addressNickname})`}
        </span>
        {data.isDefaultAddress && <Tag>기본</Tag>}
      </Body>
      <div className='space-y-0.5 text-body3'>
        <p>{`(${data.zoneCode})`}</p>
        <p>{data.mainAddress}</p>
        <p>{data.subAddress}</p>
      </div>
      <p className='text-body4 text-text-500'>{data.phoneNumber}</p>
    </div>
  );
}
