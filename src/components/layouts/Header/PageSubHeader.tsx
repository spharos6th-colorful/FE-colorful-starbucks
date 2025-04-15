'use client';
import { usePathname } from 'next/navigation';

import Prev from './Prev';
import { Body } from '@/components/ui/common';
import { pageSubHeaderData } from '@/data/initialDatas';

export default function PageMSubHeader() {
  const pathname = usePathname();
  const title = pageSubHeaderData.find((value) => pathname.includes(value.path));

  return (
    <header className='sticky flex justify-between items-center px-4 py-3 shadow-1'>
      <Prev />
      <Body className='absolute left-1/2 -translate-x-1/2'>{title?.title}</Body>
    </header>
  );
}
