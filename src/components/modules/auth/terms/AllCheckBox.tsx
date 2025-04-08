import { Checkbox } from '@/components/ui/CheckBox';
import { Body } from '@/components/ui/common';

function AllCheckBox() {
  return (
    <label className='pb-[20px] border-b flex'>
      <Checkbox />
      <Body level={3} className='text-text-600 mx-[8px]'>
        약관 전체동의
      </Body>
    </label>
  );
}

export default AllCheckBox;
