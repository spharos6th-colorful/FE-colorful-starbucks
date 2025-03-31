import { cn } from '@/lib/utils';
import type { TitleProps, SubTitleProps, BodyProps, CaptionProps, TypographyType } from '@/types/TypographyTypes';

export function Title({ level = 2, children, className = '' }: TitleProps) {
  return (
    <h2
      className={cn(
        `${level === 1 ? '!text-title1' : ''}`,
        `${level === 2 ? '!text-title2' : ''}`,
        `${level === 3 ? '!text-title3' : ''}`,
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SubTitle({ level = 2, children, className = '' }: SubTitleProps) {
  return (
    <h3
      className={cn(
        `${level === 1 ? '!text-subtitle1' : ''}`,
        `${level === 2 ? '!text-subtitle2' : ''}`,
        `${level === 3 ? '!text-subtitle3' : ''}`,
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Body({ level = 2, children, className = '' }: BodyProps) {
  return (
    <p
      className={cn(
        `${level === 1 ? '!text-body1' : ''}`,
        `${level === 2 ? '!text-body2' : ''}`,
        `${level === 3 ? '!text-body3' : ''}`,
        `${level === 4 ? '!text-body4' : ''}`,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ level = 2, children, className = '' }: CaptionProps) {
  return (
    <p
      className={cn(
        `${level === 1 ? '!text-caption1' : ''}`,
        `${level === 2 ? '!text-caption2' : ''}`,
        `${level === 3 ? '!text-caption3' : ''}`,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Extra({ children, className = '' }: TypographyType) {
  return <p className={cn('!text-extra', className)}>{children}</p>;
}
