'use client';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { useMenuContext } from '@/context/MenuContext';
import MenuText from '@/components/modules/menu/MenuText';
import MenuNav from '@/components/modules/menu/MenuCategory';
import MenuList from '@/components/modules/menu/MenuList';
import MenuHeader from '@/components/layouts/Menu/MenuHeader';

export default function Menu() {
  const asideRef = useRef<HTMLElement>(null);
  const { isOpen, setIsOpen } = useMenuContext();

  useEffect(() => {
    const container = document.getElementById('container');
    if (container && isOpen) {
      container.style.overflowY = 'hidden';
    }
    return () => {
      if (container && isOpen) {
        container.style.overflowY = 'scroll';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!asideRef.current) return;
      if (!asideRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={cn(
        'max-w-3xl fixed left-1/2 -translate-x-1/2 z-[9999]',
        'w-full h-dvh overflow-hidden bg-black/10',
        'transition-opacity duration-[200ms] ease-in-out',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
    >
      <aside
        ref={asideRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute left-0 top-0 max-w-3xl',
          'w-full h-dvh lg:w-4/5 bg-white',
          'transition-all duration-500 ease-in-out',
          'flex flex-col justify-between',
          'overflow-y-scroll scrollbar-hidden',
          isOpen ? 'translate-x-0 shadow-1' : '-translate-x-full shadow-none',
        )}
      >
        <MenuHeader />
        <MenuText
          title='Welcome !'
          text='온라인 스토어에 오신 것을 환영합니다.'
        />
        <hr className='mx-6' />

        <MenuNav />

        <MenuList />
      </aside>
    </div>
  );
}
