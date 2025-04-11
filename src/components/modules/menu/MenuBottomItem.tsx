'use client';
import { useRouter } from 'next/navigation';

import { Body, Caption } from '@/components/ui/common';
import { useMenuContext } from '@/context/MenuContext';
import type { MenuListDataType } from '@/types/Menu';
import ChevronRight from '@/assets/icons/common/chevron-right.svg';

export default function MenuBottomItem({ href, desc, title }: MenuListDataType) {
  const router = useRouter();
  const { setIsOpen } = useMenuContext();

  const handleRouteChange = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <li className='grid grid-cols-[1fr_auto] justify-between items-center gap-x-3 py-5'>
      <button onClick={() => handleRouteChange(href)} className='text-left space-y-1.5'>
        <Body level={2}>{title}</Body>
        <Caption level={3}>{desc}</Caption>
      </button>
      <ChevronRight stroke='var(--color-text-900)' className='w-fit' />
    </li>
  );
}
