'use client';
import React, { ReactNode } from 'react';

type ProductBottomTabBarWrapperProps = {
  title: string;
  children: ReactNode;
};

export function ProductBottomTabBarWrapper({
  title,
  children,
}: ProductBottomTabBarWrapperProps) {
  return (
    <div className='w-full overflow-x-auto scrollbar-hidden py-4 border-b border-stroke-100'>
      <div className='flex min-w-max px-4'>
        <span className='text-body3 text-black w-20'>{title}</span>
        <div className='flex gap-6'>{children}</div>
      </div>
    </div>
  );
}
