import Link from 'next/link';
import React from 'react';

export default function AuthLink() {
  return (
    <section className='mt-12 flex justify-center text-sm text-text-500'>
      <Link href='/find-id' className='px-3'>
        아이디 찾기
      </Link>
      <Link href='/find-password' className='px-3'>
        비밀번호 찾기
      </Link>
      <Link href='/sign-up' className='px-3'>
        회원가입
      </Link>
    </section>
  );
}
