'use client';

import { Checkbox } from '@/components/ui/CheckBox';
import { CheckedState } from '@radix-ui/react-checkbox';

function NomalSelectBox({ checked }: { checked?: boolean }) {
  const handleChangeCheckbox = (checked: CheckedState) => {
    console.log('checked');
    // cartItemAllCheck(e.target.checked);
  };
  return (
    <div className='flex items-center gap-[10px]'>
      <Checkbox checked={checked} onCheckedChange={handleChangeCheckbox} id='nomal-check' />
      {/* <input type='checkbox' checked={checked} id='all-check' onChange={handleChangeCheckbox} className /> */}
      <label htmlFor='nomal-check' className='text-body3'>
        일반 선택
      </label>
    </div>
  );
}

export default NomalSelectBox;
