'use client';

import React from 'react';

/**
 * Standardized pill component based on methodology section styling.
 * Gray gradient, inner shadow (top highlight), outer shadow, subtle border.
 * Use rounded-[8px] for a more "buttoned up" look (not full oval).
 */
interface PillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'active';
}

export function Pill({ children, className = '', variant = 'default' }: PillProps) {
  const base =
    'inline-flex items-center px-3 py-1.5 rounded-[8px] text-[10px] font-medium font-mono uppercase tracking-wider transition-colors';

  const variants = {
    default: {
      style: {
        background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
        color: '#1a1512',
        boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
      },
    },
    dark: {
      style: {
        background: 'linear-gradient(to bottom, #2a2522, #1a1512)',
        color: '#fafafa',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2)',
      },
    },
    active: {
      style: {
        background: 'linear-gradient(to bottom, #1a1512, #0f0d0b)',
        color: '#fafafa',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 0 1px #1a1512, 0 2px 6px rgba(0,0,0,0.15)',
      },
    },
  };

  const v = variants[variant];

  return (
    <span className={`${base} ${className}`} style={v.style}>
      {children}
    </span>
  );
}
