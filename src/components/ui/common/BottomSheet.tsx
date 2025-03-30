import { cn } from '@/lib/utils';

export function BottomSheet({
  children,
  className = '',
}: {
  children?: Readonly<React.ReactNode>;
  className?: string;
}) {
  return (
    <div className={cn('absolute z-10 left-0 bottom-0 w-full px-5 pt-3 pb-8 bg-white shadow-2', className)}>
      {children}
    </div>
  );
}
