import { cn } from '@/lib/utils';

export default function UtilWrapper({
  children,
  className,
}: {
  children?: Readonly<React.ReactNode>;
  className?: string;
}) {
  return <div className={cn('flex gap-2.5 items-center', className)}>{children}</div>;
}
