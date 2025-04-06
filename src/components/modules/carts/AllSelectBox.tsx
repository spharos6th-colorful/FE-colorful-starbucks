'use client';

import { Checkbox } from '@/components/ui/CheckBox';
import { CheckedState } from '@radix-ui/react-checkbox';

export default function AllSelectBox({ checked }: { checked?: boolean }) {
  const handleChangeCheckbox = (checked: CheckedState) => {
    console.log('checked');
    // cartItemAllCheck(e.target.checked);
  };
  return (
    <div className='flex items-center gap-[10px]'>
      <Checkbox checked={checked} onCheckedChange={handleChangeCheckbox} id='all-check' />
      {/* <input type='checkbox' checked={checked} id='all-check' onChange={handleChangeCheckbox} className /> */}
      <label htmlFor='all-check' className='text-body3'>
        전체선택
      </label>
    </div>
  );
}
