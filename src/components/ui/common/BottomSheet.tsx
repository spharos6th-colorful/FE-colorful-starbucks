import { cn } from '@/lib/utils';

export function BottomSheet({
  children,
  className = '',
}: {
  children?: Readonly<React.ReactNode>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'fixed z-10 left-1/2 bottom-0 -translate-x-1/2 max-w-3xl w-full px-6 pt-3 pb-8 bg-white shadow-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
