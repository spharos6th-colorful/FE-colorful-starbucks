'use client';
import { useRouter } from 'next/navigation';

import ChevronLeft from '@/assets/icons/common/chevron-left.svg';

export default function Prev() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className='cursor-pointer'>
      <ChevronLeft />
    </button>
  );
}
