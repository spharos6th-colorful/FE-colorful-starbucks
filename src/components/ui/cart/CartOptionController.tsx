'use client';

import { cn } from '@/lib/utils';

export default function CartOptionController() {
  return (
    <button
      type='button'
      className={cn(
        'border border-stroke-300  px-3 py-2 w-fit rounded-sm cursor-pointer',
        '!text-text-900 text-body3',
        'active:!text-black active:!border-black',
        'transition-colors',
      )}
    >
      옵션 변경
    </button>
  );
}
