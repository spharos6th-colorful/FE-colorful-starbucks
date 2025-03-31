import { cn } from '@/lib/utils';

interface BadgeProps {
  className?: string;
  children?: Readonly<React.ReactNode>;
  variant?: VariantType;
}

type VariantType = 'default' | 'primary' | 'secondary' | 'outlined';

function Badge({ variant = 'default', className, children }: BadgeProps) {
  const variantStyle = {
    default: 'bg-black text-white',
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    outlined: 'bg-white border border-black',
  };

  return (
    <div
      className={cn(
        'inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit',
        variantStyle[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Badge;
