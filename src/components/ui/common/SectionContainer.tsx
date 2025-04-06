import { cn } from '@/lib/utils';
import React from 'react';

function InnerPaddingSection({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={cn('w-full px-4 py-10', className)}>{children}</section>;
}

function NotPaddingSection({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={cn('w-full', className)}>{children}</section>;
}

export const SectionContainer = {
  InnerPaddingSection,
  NotPaddingSection,
};
