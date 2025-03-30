import { cn } from '@/lib/utils';

interface HeadingProps {
  children?: Readonly<React.ReactNode>;
  className?: string;
}

function Wrapper({ children, className = '' }: HeadingProps) {
  return <div className={cn('w-full flex justify-between items-center px-6 py-5 lg:py-8', className)}>{children}</div>;
}

function Title({ children, className = '' }: HeadingProps) {
  return <h2 className={cn('text-title2', className)}>{children}</h2>;
}

export const Heading = { Title, Wrapper };
