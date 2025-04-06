import AddressPickerButton from '@/components/ui/carts/AddressPickerButton';
import { SectionContainer } from '@/components/ui/common/SectionContainer';

function EmptyAddress() {
  return (
    <SectionContainer.InnerPaddingSection className=' p-[24px] bg-gray-200 grid grid-cols-2 justify-center'>
      <div className='text-body3 justify-self-start'>
        <p>등록된 배송지가 없습니다.</p>
        <p>배송지를 등록해주세요.</p>
      </div>
      <AddressPickerButton href='' text='배송지 등록' className='text-secondary-300 justify-self-end' />
    </SectionContainer.InnerPaddingSection>
  );
}
export default EmptyAddress;
