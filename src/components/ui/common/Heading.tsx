import { cn } from '@/lib/utils';
import { Title } from '@/components/ui/common';

interface HeadingProps {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

function Wrapper({ children, className = '' }: HeadingProps) {
  return <div className={cn('w-full flex justify-between items-center px-6 py-5 lg:py-8', className)}>{children}</div>;
}

export const Heading = { Title, Wrapper };
