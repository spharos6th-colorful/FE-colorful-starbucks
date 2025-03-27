'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonsProps {
  variant?: 'default' | 'starbucks' | 'secondary' | 'wooden' | 'destructive' | 'outline' | 'ghost' | 'link';
  width?: 'auto' | 'full' | 'half';
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  disabled?: boolean;
  animate?: boolean; // 애니메이션 활성화 여부
}

export const Buttons = ({
  variant = 'default',
  width = 'auto',
  onClick,
  label,
  type = 'button',
  className = '',
  disabled = false,
  animate = true,
  ...props
}: ButtonsProps) => {
  const variantStyles = {
    default: 'bg-primary-100 text-white shadow-xs hover:bg-primary-100/90',
    starbucks: 'bg-primary-200 text-white shadow-xs hover:bg-primary-200/90',
    secondary: 'bg-secondary-100 text-white shadow-xs hover:bg-secondary-100/80',
    wooden: 'bg-secondary-200 text-white shadow-xs hover:bg-secondary-200/90',
    destructive: 'bg-error text-white shadow-xs hover:bg-error/90',
    outline: 'border border-border-100 bg-white text-text-800 shadow-xs hover:bg-gray-300',
    ghost: 'text-text-800 hover:bg-gray-300',
    link: 'text-primary-100 underline-offset-4 hover:underline',
    disabled: 'bg-disabled text-text-400 cursor-not-allowed',
  };

  const widthStyles = {
    auto: 'px-6', // 자동 너비 (내용에 맞게)
    full: 'w-full px-6', // 전체 너비
    half: 'w-1/2 px-6', // 전체 너비의 절반
  };

  const buttonVariant = disabled ? 'disabled' : variant;

  const buttonStyle = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all h-12 py-3 text-button1',
    variantStyles[buttonVariant],
    widthStyles[width],
    className,
  );

  const animationProps =
    animate && !disabled
      ? {
          whileTap: { scale: 0.98 },
          transition: {
            duration: 0.2,
          },
        }
      : {};

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonStyle}
      disabled={disabled}
      {...animationProps}
      {...props}
    >
      {label}
    </motion.button>
  );
};

export default Buttons;
