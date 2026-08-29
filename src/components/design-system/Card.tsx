'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'terracota' | 'verde';
  hoverEffect?: boolean;
}

const cardVariants = {
  default: 'bg-crema text-cafe border border-crema-dark shadow-sm',
  outline: 'bg-transparent text-cafe border-2 border-cafe/20',
  elevated: 'bg-white text-cafe shadow-md border border-gray-100',
  terracota: 'bg-terracota text-crema border border-terracota-light shadow-md',
  verde: 'bg-verde-profundo text-crema border border-verde-profundo/80 shadow-md',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        rounded-2xl transition-all duration-300 overflow-hidden
        ${cardVariants[variant]}
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-xl hover:border-mostaza/50' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 border-b border-black/5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-lg sm:text-xl font-bold font-serif tracking-wide ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-xs sm:text-sm text-cafe/70 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-4 sm:p-6 bg-black/5 border-t border-black/5 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
