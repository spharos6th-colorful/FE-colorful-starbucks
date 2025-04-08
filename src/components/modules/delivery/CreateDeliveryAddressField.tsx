import Link from 'next/link';

import { TextField } from '@/components/ui/common';
import { cn } from '@/lib/utils';

type CreateDeliveryAddressFieldProps = {
  searchParams: { address?: string; zoneCode?: string };
};

export default function CreateDeliveryAddressField({ searchParams }: CreateDeliveryAddressFieldProps) {
  return (
    <>
      <div className='flex gap-4'>
        <TextField label='우편번호' value={searchParams.zoneCode} name='zoneCode' required readOnly />
        <Link
          href={'/delivery/address?callback=/delivery/create'}
          className={cn(
            'border border-primary-100 rounded-full px-3 mt-4',
            'text-primary-100 hover:bg-primary-100/10 focus:bg-primary-100/10',
            '!text-body1',
            'transition-colors',
            'cursor-pointer',
          )}
        >
          주소검색
        </Link>
      </div>
      <TextField label='기본주소' name='address' value={searchParams.address} required readOnly />
    </>
  );
}
