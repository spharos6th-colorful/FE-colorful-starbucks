'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import SearchIcon from '@/assets/icons/common/search.svg';

export default function Search() {
  const pathname = usePathname();
  return (
    <Link href={`/search?callbackUrl=${pathname}`}>
      <SearchIcon />
    </Link>
  );
}
