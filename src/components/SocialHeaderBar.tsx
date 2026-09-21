'use client';

import React from 'react';
import { socialLinks } from '@/data/socialLinks';

interface SocialHeaderBarProps {
  className?: string;
  variant?: 'header' | 'footer' | 'mobile';
}

export default function SocialHeaderBar({
  className = '',
  variant = 'header',
}: SocialHeaderBarProps) {
  const isFooter = variant === 'footer';

  return (
    <div className={`flex items-center space-x-1.5 sm:space-x-2.5 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          title={social.name}
          className={`
            transition-all duration-200 cursor-pointer flex items-center justify-center rounded-full
            ${
              isFooter
                ? 'bg-verde-profundo p-2 hover:bg-terracota text-crema hover:scale-110 border border-crema/10 shadow-sm'
                : 'text-crema/90 hover:text-mostaza hover:scale-115 hover:bg-white/10 p-1.5 rounded-full'
            }
          `}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

