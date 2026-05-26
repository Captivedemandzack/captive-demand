'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import type { ShoreBeforeAfterShowcase } from '@/data/shore-partnership-case-studies';
import { prefetchBeforeAfterShowcase } from '@/lib/prefetch-media';
import { SITE_MARKETING_WHITE_SHADOW } from '@/lib/site-surfaces';
import { cn } from '@/lib/utils';

export interface ShoreBeforeAfterShowcaseProps {
  showcase: ShoreBeforeAfterShowcase;
  className?: string;
  variant?: 'light' | 'dark';
}

function isVideoSrc(src: string) {
  return /\.(mov|mp4|webm)$/i.test(src);
}

export function ShoreBeforeAfterShowcasePanel({
  showcase,
  className,
  variant = 'light',
}: ShoreBeforeAfterShowcaseProps) {
  const [tab, setTab] = useState<'before' | 'after'>('before');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDark = variant === 'dark';
  const isBefore = tab === 'before';
  const objectFit = showcase.imageObjectFit ?? 'cover';
  const imageDisplayMode = showcase.imageDisplayMode ?? 'scroll';
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    prefetchBeforeAfterShowcase(showcase.beforeSrc, showcase.afterSrc);
  }, [showcase.beforeSrc, showcase.afterSrc]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [tab, reduceMotion]);

  const frames = [
    { id: 'before' as const, src: showcase.beforeSrc, alt: showcase.imageAltBefore },
    { id: 'after' as const, src: showcase.afterSrc, alt: showcase.imageAltAfter },
  ];

  const hasVideo = frames.some((frame) => isVideoSrc(frame.src));
  const useScrollImages = imageDisplayMode === 'scroll' && !hasVideo;

  const activeFrame = frames.find((frame) => frame.id === tab) ?? frames[0];

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
            'relative flex-1 px-4 py-3 text-center font-mono text-[13px] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5501]/35 focus-visible:ring-offset-2',
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
            'relative flex-1 px-4 py-3 text-center font-mono text-[13px] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5501]/35 focus-visible:ring-offset-2',
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
            'relative w-full min-h-[260px] flex-1 basis-0 overflow-hidden rounded-xl border md:min-h-0',
            isDark ? 'border-white/10 bg-white/[0.06]' : 'border-neutral-200/80 bg-neutral-100',
          )}
        >
          {useScrollImages ? (
            <>
              <div
                ref={scrollRef}
                tabIndex={0}
                role="region"
                aria-label={activeFrame.alt}
                className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-y-contain [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
              >
                {frames.map((frame) => {
                  if (isVideoSrc(frame.src)) return null;
                  const isActive = tab === frame.id;
                  const scrollSize =
                    frame.id === 'before'
                      ? showcase.scrollImageSize?.before
                      : showcase.scrollImageSize?.after;

                  return (
                    <div
                      key={frame.src}
                      className={isActive ? 'block w-full' : 'hidden'}
                      aria-hidden={!isActive}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={frame.src}
                        alt={isActive ? frame.alt : ''}
                        width={scrollSize?.width}
                        height={scrollSize?.height}
                        decoding="async"
                        draggable={false}
                        className="block h-auto w-full select-none"
                      />
                    </div>
                  );
                })}
              </div>
              <div
                className={cn(
                  'pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent',
                  isDark ? 'from-[#12100e]/90' : 'from-neutral-100/95',
                )}
                aria-hidden
              />
              <p
                className={cn(
                  'pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full px-2 py-0.5 font-mono text-[13px] uppercase tracking-[0.14em]',
                  isDark ? 'bg-black/35 text-white/55' : 'bg-white/80 text-[#1a1512]/45',
                )}
                aria-hidden
              >
                Scroll to explore
              </p>
            </>
          ) : (
            frames.map((frame) => {
              const isActive = tab === frame.id;
              const isVideo = isVideoSrc(frame.src);

              if (isVideo) {
                return (
                  <video
                    key={frame.src}
                    className={cn(
                      'absolute inset-0 h-full w-full transition-opacity duration-200',
                      objectFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top',
                      isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0',
                    )}
                    src={frame.src}
                    autoPlay={isActive && !reduceMotion}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={reduceMotion && isActive ? true : undefined}
                    aria-label={isActive ? frame.alt : undefined}
                    aria-hidden={!isActive}
                  />
                );
              }

              return (
                <Image
                  key={frame.src}
                  src={frame.src}
                  alt={isActive ? frame.alt : ''}
                  fill
                  unoptimized
                  priority
                  fetchPriority={isActive ? 'high' : 'low'}
                  className={cn(
                    'transition-opacity duration-200',
                    objectFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top',
                    isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0',
                  )}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  aria-hidden={!isActive}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoreBeforeAfterShowcasePanel;
