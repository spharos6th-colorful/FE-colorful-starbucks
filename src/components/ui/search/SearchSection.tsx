import { cn } from '@/lib/utils';

export default function SearchSection({
  children,
  className,
}: {
  children?: Readonly<React.ReactNode>;
  className?: string;
}) {
  return <section className={cn('p-6', className)}>{children}</section>;
}
