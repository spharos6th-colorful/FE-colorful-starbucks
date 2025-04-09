'use client';
import React from 'react';

import { cn } from '@/lib/utils';

interface EventTabProps {
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function EventTab({ title, isActive = false, onClick }: EventTabProps) {
  return (
    <div
      className={cn(
        'px-4 py-5 text-center cursor-pointer',
        isActive ? 'text-body3  text-primary-100  font-black' : 'text-body3 text-text-700 ',
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
}
