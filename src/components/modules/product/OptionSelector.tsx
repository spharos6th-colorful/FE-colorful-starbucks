import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/common/Select';
import { OptionSelectorProps } from '@/types/products/productPurchaseTypes';

export default function OptionSelector({ label, value, options, placeholder, onValueChange }: OptionSelectorProps) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2'>{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
