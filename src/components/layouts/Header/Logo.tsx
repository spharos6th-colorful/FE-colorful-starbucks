import Link from 'next/link';

import LogoIcon from '@/assets/icons/common/logo.svg';

export default function Logo() {
  return (
    <h1 className='absolute left-1/2 -translate-x-1/2'>
      <Link href={'/'}>
        <LogoIcon />
      </Link>
    </h1>
  );
}
