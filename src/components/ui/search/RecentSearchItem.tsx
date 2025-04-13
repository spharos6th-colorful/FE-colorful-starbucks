import Link from 'next/link';

import CloseIcon from '@/assets/icons/common/close.svg';
import { RecentSearchType } from '@/types/search/recentSearchTypes';

type RecentSearchItemProps = {
  recentSearchHistory: RecentSearchType;
  callbackUrl?: string;
};

export default function RecentSearchItem({
  recentSearchHistory,
  callbackUrl,
}: RecentSearchItemProps) {
  return (
    <li className='flex justify-between items-center gap-3'>
      <Link
        href={`/search/result?query=${recentSearchHistory.query}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ''}`}
        className='text-sm truncate'
      >
        {recentSearchHistory.query}
      </Link>

      <button className='cursor-pointer'>
        <CloseIcon width={16} height={16} fill={'var(--color-text-900)'} />
      </button>
    </li>
  );
}
