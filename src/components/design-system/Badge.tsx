'use client';

import React from 'react';

export type BadgeVariant = 'verde' | 'terracota' | 'mostaza' | 'cafe' | 'blue' | 'neutral' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  verde: 'bg-verde-profundo/10 text-verde-profundo border-verde-profundo/30',
  terracota: 'bg-terracota/10 text-terracota border-terracota/30',
  mostaza: 'bg-mostaza/20 text-cafe border-mostaza/40 font-semibold',
  cafe: 'bg-cafe/10 text-cafe border-cafe/30',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'verde',
  children,
  icon,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold
        border shadow-2xs tracking-wide
        ${badgeVariants[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0 w-3 h-3">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
