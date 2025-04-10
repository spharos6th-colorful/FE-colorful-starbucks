'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

import LogInForm from './LogInInForm';
import { BottomSheet, Button } from '@/components/ui/common';

export default function LogInSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가하세요.
    console.log('로그인 버튼 클릭됨');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    signIn('credentials', {
      email: email,
      password: password,
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <form className='h-full' onSubmit={handleSubmit}>
      <LogInForm />
      <BottomSheet>
        <Button type='submit' className='w-full h-10'>
          로그인
        </Button>
      </BottomSheet>
    </form>
  );
}
