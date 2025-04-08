'use client';

import { useMenuContext } from '@/context/MenuContext';

export default function TestHeader() {
  const { setIsOpen } = useMenuContext();

  return (
    <header className='px-6 py-20'>
      <button onClick={() => setIsOpen(true)}>Open</button>
    </header>
  );
}
