'use client';

import React, { useState } from 'react';
import { socialLinks, SocialLink } from '@/data/socialLinks';

interface SocialHeaderBarProps {
  className?: string;
  variant?: 'header' | 'footer' | 'mobile';
}

function SocialIconItem({ social, sizeClass }: { social: SocialLink; sizeClass: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.ariaLabel}
      title={social.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? social.brandBg : 'rgba(32, 59, 44, 0.95)', // Verde profundo suave sin borde
        color: '#F5F2EB', // Crema
        transform: isHovered ? 'scale(1.18)' : 'scale(1)',
        boxShadow: isHovered ? `0 8px 20px ${social.brandShadow}` : '0 2px 4px rgba(0,0,0,0.15)',
        border: 'none',
        outline: 'none',
      }}
      className={`
        ${sizeClass} rounded-full flex items-center justify-center 
        transition-all duration-300 cursor-pointer shrink-0 border-0 outline-none
      `}
    >
      {social.icon}
    </a>
  );
}

export default function SocialHeaderBar({
  className = '',
  variant = 'header',
}: SocialHeaderBarProps) {
  const sizeClass = variant === 'footer' ? 'w-9 h-9' : 'w-8 h-8';

  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3 ${className}`}>
      {socialLinks.map((social) => (
        <SocialIconItem key={social.id} social={social} sizeClass={sizeClass} />
      ))}
    </div>
  );
}
