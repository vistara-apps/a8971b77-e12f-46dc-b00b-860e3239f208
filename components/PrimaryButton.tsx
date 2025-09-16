'use client';

import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const primaryButtonVariants = cva(
  'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-blue-600 focus:ring-primary',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface PrimaryButtonProps {
  children: ReactNode;
  variant?: 'default';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PrimaryButton({ 
  children, 
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  className 
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        primaryButtonVariants({ variant, size }),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
