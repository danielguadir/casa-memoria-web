'use client';

import React from 'react';
import { socialLinks } from '@/data/socialLinks';

interface SocialHeaderBarProps {
  className?: string;
  variant?: 'header' | 'footer' | 'mobile';
}

export default function SocialHeaderBar({
  className = '',
}: SocialHeaderBarProps) {
  return (
    <div className={`flex items-center space-x-2 sm:space-x-2.5 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          title={social.name}
          className={`
            w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center 
            transition-all duration-300 cursor-pointer hover:scale-115 shrink-0 shadow-sm
            bg-verde-profundo/80 text-crema border border-crema/20
            ${social.hoverColorClass}
          `}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
