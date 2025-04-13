'use client';
import { useState } from 'react';
import Link from 'next/link';

import Logo from '@/assets/icons/common/logo.svg';
import ChevronDown from '@/assets/icons/common/chevron-down.svg';
import { cn } from '@/lib/utils';
import { Caption } from '@/components/ui/common';
import { infoListData } from '@/data/initialDatas';

export default function FooterInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='px-6'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-2 cursor-pointer'
      >
        <Logo />
        <ChevronDown
          className={cn(
            'transition-transform duration-500 ease-in-out',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>

      <div
        className={cn(
          'pt-4 text-text-500 space-y-1.5',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <Caption level={3} className='pb-1'>
          주식회사 에스씨케이컴퍼니
        </Caption>

        <ul
          className={cn(
            'flex flex-wrap items-center gap-x-1.5 gap-y-1.5',
            '*:relative *:pr-2',
            '*:last:after:hidden *:after:block *:after:h-2.5 *:after:w-[1px] *:after:bg-text-100 ',
            '*:after:-translate-y-1/2 *:after:top-1/2 *:after:right-0 *:after:absolute',
          )}
        >
          {infoListData.map((info) => {
            if (info?.type === 'tel')
              return (
                <li key={info.id} className='text-caption3'>
                  <Link href={`tel:${info.text}`} className=''>
                    {info.text}
                  </Link>
                </li>
              );

            return (
              <li key={info.id}>
                <Caption level={3}>{info.text}</Caption>
              </li>
            );
          })}
        </ul>

        <address className='text-caption3 not-italic'>
          주소 : 서울특별시 중구 퇴계로 100 (스테이트타워 남산) 8~10층 (우 :
          04631)
        </address>
      </div>

      <p className='text-[0.5625rem] text-text-400 pt-2.5'>
        ⓒ 2025 Starbucks Coffee Company. All Rights Reserved. Hosting By
        (주)신세계아이앤씨
      </p>
    </div>
  );
}
