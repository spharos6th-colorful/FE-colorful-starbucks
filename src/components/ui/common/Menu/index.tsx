'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import CloseIcon from '@/assets/icons/common/close.svg';
import { useMenuContext } from '@/context/MenuContext';
import { Body, Caption, SubTitle } from '../Typography';
import { mainCategoryDatas } from '@/data/main/initData';
import MoreButton from '../../main/MoreButton';

export default function Menu() {
  const router = useRouter();
  const asideRef = useRef<HTMLElement>(null);
  const { isOpen, setIsOpen } = useMenuContext();

  const onClick = () => setIsOpen((prev) => !prev);

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

  const handleRouteChange = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

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

  const menuListData = [
    {
      id: 1,
      href: '/events',
      title: '기획전',
      desc: '진행중인 기획전을 만나보세요.',
    },
    {
      id: 2,
      href: '/best',
      title: '베스트',
      desc: '스타벅스 베스트 MD 상품만 모아보세요.',
    },
  ];

  return (
    <div
      className={cn(
        'max-w-3xl fixed left-1/2 -translate-x-1/2 z-[9999]',
        'w-full max-h-dvh h-full overflow-hidden bg-black/10',
        'transition-opacity duration-[200ms] ease-in-out',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <aside
        ref={asideRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute left-0 top-0 max-w-3xl',
          'w-full h-full lg:w-4/5 bg-white',
          'transition-all duration-500 ease-in-out',
          'overflow-y-scroll scrollbar-hidden',
          isOpen ? 'translate-x-0 shadow-1' : '-translate-x-full shadow-none',
        )}
      >
        <header className='flex justify-end px-6 py-4'>
          <button onClick={onClick} className='cursor-pointer'>
            <CloseIcon width={24} height={24} fill='var(--color-text-900)' />
          </button>
        </header>

        <section className='px-6 py-5 space-y-3'>
          <SubTitle>Welcome !</SubTitle>
          <Body level={3}>온라인 스토어에 오신 것을 환영합니다.</Body>
        </section>

        <hr className='mx-6' />

        <nav className='px-6 py-8'>
          <div className='grid justify-end pb-4 text-text-900 hover:text-black focus:text-black transition-colors'>
            <button onClick={() => setIsOpen(false)}>
              <MoreButton href='/products' title='전체 상품 보기' />
            </button>
          </div>

          <ul className='grid grid-cols-3 md:grid-cols-4 justify-items-center items-start sm:items-center gap-x-2 gap-y-5'>
            {mainCategoryDatas.map(({ id, title, icon }) => (
              <li key={id} className='inline-block w-full max-w-[100px]'>
                <button
                  onClick={() => handleRouteChange(`/products?topCategoryId=${id}`)}
                  className='space-y-2.5 cursor-pointer w-full'
                >
                  <div className='w-full aspect-square relative'>
                    <Image
                      src={icon}
                      alt={`${title} 카테고리 썸네일 이미지`}
                      sizes='100%'
                      fill
                      className='rounded-full object-cover'
                    />
                  </div>
                  <Body level={3} className='text-center'>
                    {title}
                  </Body>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className='px-6 bg-gray-200'>
          <ul className='pb-16'>
            {menuListData.map(({ id, href, title, desc }) => (
              <li key={id}>
                <button onClick={() => handleRouteChange(href)}>
                  <Caption level={1}>{title}</Caption>
                  <Caption level={3}>{desc}</Caption>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
