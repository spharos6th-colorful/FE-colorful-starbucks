import { cn } from '@/lib/utils';

export function BottomSheet({
  children,
  className = '',
}: {
  children?: Readonly<React.ReactNode>;
  className?: string;
}) {
  return <div className={cn('fixed bottom-0 w-full max-w-3xl bg-white p-4', className)}>{children}</div>;
}
