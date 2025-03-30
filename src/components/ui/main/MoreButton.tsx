import Link from 'next/link';

import IconSeeMore from '@/assets/Icon-SeeMore.svg';

function MoreButton({ children, href }: { children?: React.ReactNode; href: string }) {
  return (
    <Link href={href} className='flex items-center'>
      <p>{children}</p>
      <IconSeeMore />
    </Link>
  );
}

export default MoreButton;
