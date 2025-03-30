import { cn } from '@/lib/utils';

interface ActionListProps {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

export function Group({ children, className }: ActionListProps) {
  return <ul className={cn('flex items-center [&_li]:last:border-none', className)}>{children}</ul>;
}

export function Item({ children, className }: ActionListProps) {
  return <li className={cn('!text-body3 border-r border-r-stroke-100', className)}>{children}</li>;
}

export const ActionList = { Group, Item };
