'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import type { ShoreBeforeAfterShowcase } from '@/data/shore-partnership-case-studies';
import { SITE_MARKETING_WHITE_SHADOW } from '@/lib/site-surfaces';
import { cn } from '@/lib/utils';

export interface ShoreBeforeAfterShowcaseProps {
  showcase: ShoreBeforeAfterShowcase;
  className?: string;
  variant?: 'light' | 'dark';
}

export function ShoreBeforeAfterShowcasePanel({
  showcase,
  className,
  variant = 'light',
}: ShoreBeforeAfterShowcaseProps) {
  const [tab, setTab] = useState<'before' | 'after'>('before');
  const isDark = variant === 'dark';
  const isBefore = tab === 'before';
  const src = isBefore ? showcase.beforeSrc : showcase.afterSrc;
  const alt = isBefore ? showcase.imageAltBefore : showcase.imageAltAfter;
  const objectFit = showcase.imageObjectFit ?? 'cover';
  const isVideoSrc = /\.(mov|mp4|webm)$/i.test(src);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border',
        isDark ? 'border-white/10 bg-white/[0.04]' : 'border-[#e8e8e8] bg-white',
        className,
      )}
      style={
        isDark
          ? { boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 12px 32px rgba(0,0,0,0.25)' }
          : SITE_MARKETING_WHITE_SHADOW
      }
    >
      <div
        role="tablist"
        aria-label={showcase.tablistAriaLabel ?? 'Homepage before and after comparison'}
        className={cn(
          'flex shrink-0 border-b',
          isDark ? 'border-white/10 bg-white/[0.04]' : 'border-[#e8e8e8] bg-[#f2f2f2]',
        )}
      >
        <button
          type="button"
          role="tab"
          id={`${showcase.tabIdPrefix}-tab-before`}
          aria-selected={isBefore}
          aria-controls={`${showcase.tabIdPrefix}-panel-visual`}
          tabIndex={isBefore ? 0 : -1}
          onClick={() => setTab('before')}
          className={cn(
            'relative flex-1 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5501]/35 focus-visible:ring-offset-2',
            isBefore
              ? isDark
                ? 'text-white'
                : 'text-[#1a1512]'
              : isDark
                ? 'text-white/45 hover:text-white/70'
                : 'text-neutral-500 hover:text-neutral-700',
          )}
        >
          Before
          {isBefore ? (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#ff5501]" aria-hidden />
          ) : null}
        </button>
        <button
          type="button"
          role="tab"
          id={`${showcase.tabIdPrefix}-tab-after`}
          aria-selected={!isBefore}
          aria-controls={`${showcase.tabIdPrefix}-panel-visual`}
          tabIndex={isBefore ? -1 : 0}
          onClick={() => setTab('after')}
          className={cn(
            'relative flex-1 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5501]/35 focus-visible:ring-offset-2',
            !isBefore
              ? isDark
                ? 'text-white'
                : 'text-[#1a1512]'
              : isDark
                ? 'text-white/45 hover:text-white/70'
                : 'text-neutral-500 hover:text-neutral-700',
          )}
        >
          After
          {!isBefore ? (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#ff5501]" aria-hidden />
          ) : null}
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col p-4 md:p-5"
        role="tabpanel"
        id={`${showcase.tabIdPrefix}-panel-visual`}
        aria-labelledby={isBefore ? `${showcase.tabIdPrefix}-tab-before` : `${showcase.tabIdPrefix}-tab-after`}
      >
        <div
          className={cn(
            'relative w-full flex-1 basis-0 overflow-hidden rounded-xl border',
            objectFit === 'contain'
              ? 'min-h-[280px] md:min-h-[360px]'
              : 'min-h-[260px] md:min-h-0',
            isDark ? 'border-white/10 bg-white/[0.06]' : 'border-neutral-200/80 bg-neutral-100',
          )}
        >
          {isVideoSrc ? (
            <video
              key={src}
              className={cn(
                'absolute inset-0 h-full w-full',
                objectFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top',
              )}
              src={src}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              controls={reduceMotion ? true : undefined}
              aria-label={alt}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized={/\.gif$/i.test(src)}
              className={cn(
                objectFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top',
              )}
              sizes="(max-width: 768px) 100vw, 560px"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoreBeforeAfterShowcasePanel;
