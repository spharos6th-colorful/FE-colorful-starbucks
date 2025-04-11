import Link from 'next/link';

import IconSeeMore from '@/assets/icons/product/Icon-SeeMore.svg';

interface MoreButtonProps {
  href: string;
  title: string;
}
function MoreButton({ href, title }: MoreButtonProps) {
  return (
    <Link href={href} className='flex items-center text-caption2'>
      <span>{title}</span>
      <IconSeeMore />
    </Link>
  );
}

export default MoreButton;
