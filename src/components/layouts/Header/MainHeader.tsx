'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/assets/icons/common/logo.svg';
import Menu from '@/assets/icons/common/menu.svg';
import Search from '@/assets/icons/common/search.svg';
import Cart from '@/assets/icons/product/cart.svg';
import { useMenuContext } from '@/context/MenuContext';

export default function MainHeader() {
  const pathname = usePathname();
  const { setIsOpen } = useMenuContext();

  return (
    <header className='sticky flex justify-between items-center px-4 py-3 shadow-1'>
      <button onClick={() => setIsOpen(true)} className='cursor-pointer'>
        <Menu />
      </button>

      <h1 className='absolute left-1/2 -translate-x-1/2'>
        <Logo />
      </h1>

      <div className='flex gap-2.5 items-center'>
        <Link href={`/search?callbackUrl=${pathname}`}>
          <Search />
        </Link>
        <Link href={`/carts?callbackUrl=${pathname}`}>
          <Cart />
        </Link>
      </div>
    </header>
  );
}
