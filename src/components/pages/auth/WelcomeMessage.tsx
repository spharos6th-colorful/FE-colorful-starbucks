import React from 'react';
import Image from 'next/image';
import img from '@/components/ui/logo.png';

export default function WelcomeMessage() {
  return (
    <section className='w-full py-10'>
      <Image src={img} alt='로고' className='size-[3.875rem] mb-[1.5rem]' />
      <h1 className='text-[1.375rem] font-semibold'>
        안녕하세요.
        <br />
        스타벅스입니다.
      </h1>
      <p className='mt-3 text-[0.875rem] text-custom-gray-600 font-medium'>회원 서비스 이용을 위해 로그인 해주세요.</p>
    </section>
  );
}
