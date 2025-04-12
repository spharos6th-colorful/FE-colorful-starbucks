import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavDataType } from '@/types/initDataTypes';

export default function NavItem({ data: { icon: Icon, path, text } }: { data: NavDataType }) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={cn(
          'w-14 h-14',
          'text-text-900 [&_svg]:stroke-text-900 flex flex-col items-center gap-1 !text-extra',
          (path === '/' && pathname === path) || (path !== '/' && pathname.includes(path))
            ? 'text-primary-100 [&_svg]:stroke-primary-100'
            : '',
          'active:scale-110',
          'transition-all duration-200 ease-in-out',
        )}
      >
        {Icon ? <Icon /> : ''}
        <p>{text}</p>
      </Link>
    </li>
  );
}
