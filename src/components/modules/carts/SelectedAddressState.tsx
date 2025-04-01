import { getSelectedAddress } from '@/actions/cart-service';
import AddressPickerButton from '@/components/ui/carts/AddressPickerButton';

interface SelectedAddressStateProps {
  memberAddressUuid: string;
}

async function SelectedAddressState({ memberAddressUuid }: SelectedAddressStateProps) {
  const data = await getSelectedAddress(memberAddressUuid);
  return (
    <div className='flex justify-between items-center'>
      <div className='text-body3'>
        <p className='font-bold'>{data?.addressNickname}</p>
        <p>{data?.mainAddress}</p>
        <p>{data?.subAddress}</p>
      </div>
      <AddressPickerButton href='' text='배송지 변경' className='text-primary-100' />
    </div>
  );
}

export default SelectedAddressState;
