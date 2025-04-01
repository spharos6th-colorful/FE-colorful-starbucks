import AddressPickerButton from '@/components/ui/carts/AddressPickerButton';
import { DeliveryDataType } from '@/types/responseDataTypes';

interface DefaultAddressStateProps {
  deliveryAddress?: DeliveryDataType;
}

function DefaultAddressState({ deliveryAddress }: DefaultAddressStateProps) {
  if (!deliveryAddress)
    return (
      <div className='flex justify-between items-center'>
        <div className='text-body3'>
          <p>등록된 배송지가 없습니다.</p>
          <p>배송지를 등록해주세요.</p>
        </div>
        <AddressPickerButton href='' text='배송지 등록' className='text-secondary-300' />
      </div>
    );

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col'>
        <span className='font-bold'>{deliveryAddress?.addressNickname}</span>
        <span>{deliveryAddress?.mainAddress}</span>
        <span>{deliveryAddress?.subAddress}</span>
      </div>
      <AddressPickerButton href='' text='배송지 변경' className='text-primary-100' />
    </div>
  );
}

export default DefaultAddressState;
