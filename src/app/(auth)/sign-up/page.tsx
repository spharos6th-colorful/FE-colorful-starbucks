'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/common';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/common/Avatar';
import logo from '../../../assets/images/logo.png';
import Image from 'next/image';

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push('sign-up/user-info');
  };
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <section className='w-full space-y-4 pt-15 pb-10 px-7 tracking-tighter'>
        <Avatar style={{ width: '5rem', height: '5rem' }}>
          <Image src={logo} alt='로고' fill style={{ objectFit: 'cover' }} />
        </Avatar>
        <h1 className='text-3xl font-bold'>
          고객님
          <br />
          환영합니다!
        </h1>
        <p className='text-md font-medium leading-normal text-[#717171]'></p>
      </section>

      <form
        onSubmit={handleSubmit}
        className='group w-full font-semibold tracking-tighter px-4 pb-40'
      >
        <div className='flex items-center gap-2 py-4 relative'>
          <input
            type='checkbox'
            className='text-lg font-bold'
            data-required={false}
          />
          <label>전체동의</label>
        </div>

        <hr className='border-t border-gray-300' />

        <div className='flex items-center gap-2 py-4 relative'>
          <input
            type='checkbox'
            className='text-lg font-bold'
            data-required={true}
          />
          <label>[필수] 이용약관 동의</label>
          <Link href='/' className={cn('absolute right-0')}>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className='flex items-center gap-2 py-4 relative'>
          <input
            type='checkbox'
            className='text-lg font-bold'
            data-required={true}
          />
          <label>[필수] 개인정보 수집 및 이용 동의</label>
          <Link href='/' className={cn('absolute right-0')}>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className='flex items-center gap-2 py-4 relative'>
          <input
            type='checkbox'
            className='text-lg font-bold'
            data-required={true}
          />
          <label>[필수] 스타벅스 카드 이용약관</label>
          <Link href='/' className={cn('absolute right-0')}>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className='flex items-center gap-2 py-4 relative'>
          <input
            type='checkbox'
            className='text-lg font-bold'
            data-required={true}
          />
          <label>[필수] 마케팅 활용 수집 이용 동의</label>
          <Link href='/' className={cn('absolute right-0')}>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className='w-full fixed bottom-0 pb-5 left-0 bg-white px-7 pt-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
          <Button
            type='submit'
            variant='starbucks'
            width='auto'
            className='
              w-full text-lg font-bold py-6
              group-has-[button[data-state=unchecked][data-required=true]]:bg-[#E0E0E0]
              group-has-[button[data-state=unchecked][data-required=true]]:pointer-events-none
            '
          >
            다음
          </Button>
        </div>
      </form>
    </main>
  );
}
