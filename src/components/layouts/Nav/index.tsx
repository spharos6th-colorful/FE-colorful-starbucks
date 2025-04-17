'use client';

import type { NavDataType } from '@/types/initDataTypes';
import NavItem from './NavItem';
import Home from '@/assets/icons/nav/home.svg';
import Event from '@/assets/icons/nav/event.svg';
import Best from '@/assets/icons/nav/best.svg';
import User from '@/assets/icons/nav/user.svg';

export default function Nav() {
  const navDatas: NavDataType[] = [
    {
      id: 1,
      text: '홈',
      path: '/',
      icon: Home,
    },
    {
      id: 2,
      text: '기획전',
      path: '/events',
      icon: Event,
    },
    {
      id: 3,
      text: '베스트',
      path: '/best',
      icon: Best,
    },
    {
      id: 4,
      text: '마이페이지',
      path: '/my-page',
      icon: User,
    },
  ];

  return (
    <nav className='fixed max-w-3xl w-full bottom-0 z-20 bg-white px-6 py-2 xl:px-9 shadow-2'>
      <ul className='flex justify-between items-start max-w-xl w-full mx-auto'>
        {navDatas.map((nav) => (
          <NavItem key={nav.id} data={nav} />
        ))}
      </ul>
    </nav>
  );
}
