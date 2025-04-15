'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer border-primary-100 dark:bg-primary-100/30 data-[state=checked]:bg-primary-100 data-[state=checked]:text-white dark:data-[state=checked]:bg-primary-100 data-[state=checked]:border-primary-100 size-6  rounded-[4px] border shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center  text-current transition-none'
      >
        <CheckIcon className='size-[18px]' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
