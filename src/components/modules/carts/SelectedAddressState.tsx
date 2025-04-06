import { SectionContainer } from '@/components/ui/common/SectionContainer';
import { DeliveryDataType } from '@/types/responseDataTypes';

type AddressStateProps = {
  data: DeliveryDataType;
};

function AddressState({ data }: AddressStateProps) {
  return (
    <SectionContainer.InnerPaddingSection className=' p-[24px] bg-gray-200 grid grid-cols-2 justify-center'>
      <div className='text-body3'>
        <p className='font-bold'>{data.addressNickname}</p>
        <p>{data.mainAddress}</p>
        <p>{data.subAddress}</p>
      </div>
    </SectionContainer.InnerPaddingSection>
  );
}

export default AddressState;
