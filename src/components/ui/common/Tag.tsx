import { cn } from '@/lib/utils';

export function Tag({ children, className }: { children?: Readonly<React.ReactNode>; className?: string }) {
  return (
    <span
      className={cn(
        '!text-primary-100 bg-primary-100/10 text-extra font-normal',
        'inline-block px-1 py-0.5 rounded-xs',
        className,
      )}
    >
      {children}
    </span>
  );
}
