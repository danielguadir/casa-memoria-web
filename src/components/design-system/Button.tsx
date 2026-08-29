'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'terracota' 
  | 'mostaza' 
  | 'outline' 
  | 'danger' 
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-verde-profundo text-crema hover:bg-verde-profundo/90 focus:ring-verde-profundo border border-transparent shadow-sm',
  secondary: 'bg-crema-dark text-cafe hover:bg-crema-dark/80 focus:ring-cafe/30 border border-crema-dark shadow-xs',
  terracota: 'bg-terracota text-crema hover:bg-terracota-light focus:ring-terracota border border-transparent shadow-sm',
  mostaza: 'bg-mostaza text-cafe hover:bg-mostaza/90 focus:ring-mostaza border border-transparent shadow-sm font-semibold',
  outline: 'bg-transparent text-verde-profundo border-2 border-verde-profundo hover:bg-verde-profundo hover:text-crema focus:ring-verde-profundo',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent shadow-sm',
  ghost: 'bg-transparent text-cafe hover:bg-crema-dark/50 hover:text-verde-profundo focus:ring-cafe/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm font-medium rounded-xl gap-2',
  lg: 'px-6 py-3 text-base font-semibold rounded-xl gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-[0.98] cursor-pointer select-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
