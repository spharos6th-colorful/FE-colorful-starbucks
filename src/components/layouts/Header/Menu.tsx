'use client';

import MenuIcon from '@/assets/icons/common/menu.svg';
import { useMenuContext } from '@/context/MenuContext';

export default function Menu() {
  const { setIsOpen } = useMenuContext();

  return (
    <button onClick={() => setIsOpen(true)} className='cursor-pointer'>
      <MenuIcon />
    </button>
  );
}
