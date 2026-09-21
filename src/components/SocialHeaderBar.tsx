'use client';

import React from 'react';
import { socialLinks, siteMapLink } from '@/data/socialLinks';
import { Map } from 'lucide-react';

interface SocialHeaderBarProps {
  className?: string;
  showSiteMap?: boolean;
  variant?: 'header' | 'footer' | 'mobile';
}

export default function SocialHeaderBar({
  className = '',
  showSiteMap = true,
  variant = 'header',
}: SocialHeaderBarProps) {
  const handleSiteMapClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (siteMapLink.href.startsWith('/#')) {
      const targetId = siteMapLink.href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className={`flex items-center space-x-2 sm:space-x-3 ${className}`}>
      {/* Redes sociales */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5">
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

      {/* Separador y Mapa del Sitio */}
      {showSiteMap && (
        <div className="flex items-center space-x-2 pl-1 border-l border-crema/20">
          <a
            href={siteMapLink.href}
            onClick={handleSiteMapClick}
            aria-label={siteMapLink.ariaLabel}
            className="flex items-center space-x-1 text-xs font-medium text-crema/90 hover:text-mostaza transition-colors cursor-pointer whitespace-nowrap py-1 px-1.5 rounded-md hover:bg-white/10"
          >
            <Map size={14} className="text-mostaza" />
            <span>{siteMapLink.name}</span>
          </a>
        </div>
      )}
    </div>
  );
}
