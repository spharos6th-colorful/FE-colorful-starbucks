import React from 'react';

// 컴포넌트의 props 타입 정의
interface ProductBottomTabBarWrapperProps {
  title: string;
  children: React.ReactNode;
}

// 제품 하단 탭 바 래퍼 컴포넌트
export function ProductBottomTabBarWrapper({
  title,
  children,
}: ProductBottomTabBarWrapperProps) {
  return (
    <div className='w-full border-b border-stroke-100 py-4'>
      <div className='flex items-center px-4'>
        <p className='text-body3 text-black font-bold w-20 shrink-0'>{title}</p>
        <div className='overflow-x-auto scrollbar-hidden ml-4'>
          <ul className='flex gap-6 min-w-max'>{children}</ul>
        </div>
      </div>
    </div>
  );
}
