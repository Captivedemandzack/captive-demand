'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { ShoreBeforeAfterShowcasePanel } from '@/components/shore-partnership/ShoreBeforeAfterShowcasePanel';
import { ShoreImpactBarChart } from '@/components/shore-partnership/ShoreImpactBarChart';
import type { ShoreCaseStudy } from '@/data/shore-partnership-case-studies';
import { prefetchBeforeAfterShowcase } from '@/lib/prefetch-media';
import { cn } from '@/lib/utils';

const easeInOutCubic = [0.04, 0.62, 0.23, 0.98] as [number, number, number, number];

interface ShoreCaseStudyListProps {
  studies: ShoreCaseStudy[];
}

function CaseStudyPanelBody({
  study,
  numberLabel,
}: {
  study: ShoreCaseStudy;
  numberLabel: string;
}) {
  const showcaseBottom = study.panelLayout === 'showcaseBottom' && Boolean(study.beforeAfterShowcase);

  const actionsSection =
    study.actions.length > 0 ? (
      <div>
        <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">What we did</h4>
        <ul className="mt-5 space-y-3 text-pretty text-[15px] leading-relaxed text-white/80">
          {study.actions.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ff5501]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const resultsSection =
    study.impactChart || study.results ? (
      <div className="space-y-4">
        {study.impactChart ? (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
            style={{
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
            }}
          >
            <ShoreImpactBarChart chart={study.impactChart} className="space-y-5" variant="dark" />
          </div>
        ) : null}
        {study.results ? (
          <p className="text-pretty text-[15px] leading-relaxed text-white/85">{study.results}</p>
        ) : null}
      </div>
    ) : null;

  const showcasePanel = study.beforeAfterShowcase ? (
    <ShoreBeforeAfterShowcasePanel
      showcase={study.beforeAfterShowcase}
      className={cn(showcaseBottom ? 'min-h-[420px] w-full md:min-h-[520px]' : 'min-h-0 flex-1')}
      variant="dark"
    />
  ) : (
    <div className="aspect-[16/10] w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
      <div className="flex h-full flex-col items-center justify-center gap-2 text-white/55">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff5501]/80">
          16 : 9 · drop in
        </span>
        <p className="text-pretty text-sm leading-snug">
          {study.visualProof ?? (
            <>
              Embed a screenshot, deck grab, or short Loom for{' '}
              <strong className="text-white/85">{study.name}</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );

  return (
    <div className="px-6 pb-8 pt-0 md:px-8">
      <div className="mb-8 grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4 md:gap-x-8">
        <span aria-hidden className="shrink-0 select-none font-mono text-sm tabular-nums invisible">
          {numberLabel}
        </span>
        <p className="text-pretty text-[15px] leading-relaxed text-white/75">{study.challenge}</p>
      </div>

      {showcaseBottom ? (
        <>
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div className="space-y-8">
              {actionsSection}
            </div>
            <div>{resultsSection}</div>
          </div>
          <div className="mt-10">{showcasePanel}</div>
        </>
      ) : (
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-stretch">
          <div className="space-y-8">
            {actionsSection}
            {resultsSection}
          </div>
          <div
            className={cn('flex flex-col gap-3', study.beforeAfterShowcase ? 'md:h-full md:min-h-0' : undefined)}
          >
            {showcasePanel}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Case-study list rendered as a SEOMethodology-style accordion.
 * Closed: `#f3f4f6` row with hover `#e8e8e8`.
 * Open: `#1a1512` panel with white content.
 * On load, only the first expandable row is open unless `variant === 'static'` (always open).
 * Only one expandable panel is open at a time; opening another closes the previous.
 */
export function ShoreCaseStudyList({ studies }: ShoreCaseStudyListProps) {
  const reduceMotion = useReducedMotion();
  const [prefetchedShowcaseIds, setPrefetchedShowcaseIds] = useState<Set<string>>(() => new Set());
  /** Initial: first study expanded; all others collapsed (static cards stay expanded). */
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const first = studies[0];
    if (!first || first.variant === 'static') return new Set();
    return new Set([first.id]);
  });

  const queueShowcasePrefetch = (study: ShoreCaseStudy) => {
    if (!study.beforeAfterShowcase) return;
    prefetchBeforeAfterShowcase(
      study.beforeAfterShowcase.beforeSrc,
      study.beforeAfterShowcase.afterSrc,
    );
    setPrefetchedShowcaseIds((prev) => {
      if (prev.has(study.id)) return prev;
      const next = new Set(prev);
      next.add(study.id);
      return next;
    });
  };

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.has(id)) {
        return new Set();
      }
      const study = studies.find((s) => s.id === id);
      if (study) queueShowcasePrefetch(study);
      return new Set([id]);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {studies
        .filter((study) => study.beforeAfterShowcase && prefetchedShowcaseIds.has(study.id))
        .map((study) => {
          const showcase = study.beforeAfterShowcase!;
          return (
            <div
              key={`prefetch-${study.id}`}
              aria-hidden
              className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
            >
              <Image src={showcase.beforeSrc} alt="" width={560} height={840} priority />
              <Image src={showcase.afterSrc} alt="" width={560} height={840} priority />
            </div>
          );
        })}
      {studies.map((study, index) => {
        const isStatic = study.variant === 'static';
        const isOpen = isStatic || openIds.has(study.id);
        const panelId = `case-panel-${study.id}`;
        const labelId = `case-trigger-${study.id}`;
        const number = String(index + 1).padStart(2, '0');

        const headerClass = cn(
          'group flex w-full items-start justify-between gap-4 px-6 text-left md:px-8',
          /* Open panels: less space before the challenge body below */
          isOpen ? 'pt-6 pb-2 md:pt-8 md:pb-3' : 'py-6 md:py-8',
          isStatic ? 'cursor-default' : 'cursor-pointer',
        );

        const headerBody = (
          <>
            <div className="grid min-w-0 flex-1 grid-cols-[auto_1fr] gap-x-3 gap-y-4 sm:gap-x-4 md:gap-x-8 md:gap-y-5">
              <span
                className={cn(
                  'row-start-1 shrink-0 self-center font-mono text-sm tabular-nums transition-colors duration-300',
                  isOpen ? 'font-bold text-[#ff5501]' : 'text-[#1a1512]/40',
                )}
              >
                {number}
              </span>
              <span className="row-start-1 flex min-w-0 flex-wrap items-center gap-2">
                {study.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={cn(
                      'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300',
                      isOpen
                        ? i === 0
                          ? 'bg-[#ff5501] text-white'
                          : 'border border-white/15 text-white/60'
                        : i === 0
                          ? 'bg-[#1a1512] text-white'
                          : 'border border-[#1a1512]/10 text-[#1a1512]/55',
                    )}
                  >
                    {tag}
                  </span>
                ))}
                {study.deliveryTimeline ? (
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300',
                      isOpen
                        ? 'border border-white/15 text-white/60'
                        : 'border border-[#1a1512]/10 text-[#1a1512]/55',
                    )}
                  >
                    {study.deliveryTimeline}
                  </span>
                ) : null}
              </span>
              <span
                className={cn(
                  'col-start-2 row-start-2 block min-w-0 text-left text-lg uppercase leading-tight tracking-wide transition-colors duration-300 sm:text-xl md:text-3xl md:leading-none',
                  isOpen ? 'font-medium text-white' : 'text-[#1a1512]/65 group-hover:text-[#1a1512]',
                )}
                style={{ fontFamily: 'Nohemi, sans-serif' }}
              >
                {study.name}
              </span>
              {!isOpen ? (
                <span
                  className="col-start-2 row-start-3 block text-pretty text-[14px] leading-relaxed text-[#1a1512]/60 md:text-[15px]"
                >
                  {study.challenge}
                </span>
              ) : null}
              {study.pendingReview && !isOpen ? (
                <span
                  className="col-start-2 row-start-4 mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber-700"
                >
                  Pending review
                </span>
              ) : null}
            </div>
            {!isStatic ? (
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                  isOpen ? 'bg-white/10 text-white' : 'bg-[#e8e8e8] text-[#1a1512]/40 group-hover:bg-[#d5d5d5]',
                )}
                aria-hidden
              >
                <Plus
                  size={20}
                  strokeWidth={1.6}
                  className={cn('transition-transform duration-300', isOpen ? 'rotate-45' : '')}
                />
              </span>
            ) : null}
          </>
        );

        return (
          <article
            key={study.id}
            className={cn(
              'relative w-full overflow-hidden rounded-3xl transition-all duration-500 ease-in-out',
              isOpen ? 'bg-[#1a1512]' : 'bg-[#f3f4f6] hover:bg-[#e8e8e8]',
            )}
            style={isOpen ? { boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08)' } : undefined}
          >
            {isStatic ? (
              <div id={labelId} className={headerClass}>
                {headerBody}
              </div>
            ) : (
              <button
                type="button"
                id={labelId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(study.id)}
                onMouseEnter={() => queueShowcasePrefetch(study)}
                onFocus={() => queueShowcasePrefetch(study)}
                className={headerClass}
              >
                {headerBody}
              </button>
            )}

            {isStatic && isOpen ? (
              <div id={panelId} role="region" aria-labelledby={labelId}>
                <CaseStudyPanelBody study={study} numberLabel={number} />
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {!isStatic && isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={labelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0.01 : 0.5,
                      ease: easeInOutCubic,
                    }}
                    className="overflow-hidden"
                  >
                    <CaseStudyPanelBody study={study} numberLabel={number} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </article>
        );
      })}
    </div>
  );
}
