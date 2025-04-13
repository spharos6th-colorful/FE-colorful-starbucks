import Link from 'next/link';

import { termConditionData } from '@/data/initialDatas';
import { cn } from '@/lib/utils';

export default function TermConditionList() {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center gap-x-1.5 gap-y-1.5 bg-gray-100 px-6 py-4',
        '*:relative *:pr-2',
        '*:last:after:hidden *:after:block *:after:h-2.5 *:after:w-0.5 *:after:bg-text-200 ',
        '*:after:-translate-y-1/2 *:after:top-1/2 *:after:right-0 *:after:absolute',
      )}
    >
      {termConditionData.map((data) => (
        <li key={data.id} className='text-caption3 text-text-700'>
          <Link href={data.href}>{data.text}</Link>
        </li>
      ))}
    </ul>
  );
}
