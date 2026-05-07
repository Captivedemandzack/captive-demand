import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface HeroAccentHighlightProps {
  children: ReactNode;
  className?: string;
  /** Matches WebsiteHero; disable so longer phrases can wrap inside centered headlines. */
  nowrap?: boolean;
  /** Classes on the foreground text span (e.g. font-light to match a lighter h1). */
  textClassName?: string;
}

/**
 * Frosted inline chip behind hero accent words — aligned with {@link WebsiteHero}.
 */
export function HeroAccentHighlight({
  children,
  className,
  nowrap = true,
  textClassName,
}: HeroAccentHighlightProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden rounded-[6px]',
        nowrap ? 'whitespace-nowrap' : 'whitespace-normal text-center',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]"
        aria-hidden
      />
      <span className={cn('relative text-[#0f0d0a]', textClassName)} style={{ zIndex: 1 }}>
        {children}
      </span>
      <span
        className="pointer-events-none absolute inset-0 rounded-[6px]"
        style={{
          zIndex: 2,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          background:
            'linear-gradient(to bottom, rgba(250,249,246,0.0) 0%, rgba(250,249,246,0.08) 25%, rgba(250,249,246,0.35) 50%, rgba(250,249,246,0.65) 72%, rgba(250,249,246,0.88) 100%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,1) 100%)',
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-[6px]"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.0) 45%, rgba(255,255,255,0.06) 100%)',
        }}
        aria-hidden
      />
    </span>
  );
}

export default HeroAccentHighlight;
