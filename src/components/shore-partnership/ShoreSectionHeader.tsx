'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SHORE_SECTION_DESCRIPTION_CLASS, SHORE_SECTION_EYEBROW_CLASS } from '@/lib/shore-section-styles';

interface ShoreSectionHeaderProps {
  /** Eyebrow label (no slash) — e.g. "Approach", "Operating Model" */
  eyebrow: string;
  /** Optional first-line lead text (Nohemi 300, full color) */
  lead?: string;
  /** Secondary headline phrase (muted grey on light, soft white on dark) */
  accent?: string;
  /** Optional second-line trail text (lower-opacity) */
  trail?: string;
  /** Full headline replacement (mutually exclusive with lead/accent/trail composition) */
  titleSlot?: ReactNode;
  /** Right-column mono description */
  description?: string;
  variant?: 'light' | 'dark';
  className?: string;
  /** Tightens default top margin when chained inside compact sections */
  compact?: boolean;
  /** SVG shape + rule above eyebrow (default true) */
  showDecoration?: boolean;
}

const DecorativeShapeLine = ({ variant }: { variant: 'light' | 'dark' }) => {
  const shapeFill = variant === 'dark' ? '#3a3530' : '#d5d5d5';
  const lineBg = variant === 'dark' ? '#3a3530' : '#e5e5e5';
  return (
    <div className="mb-6 flex w-full items-end">
      <svg
        viewBox="0 0 80 8"
        className="h-2 w-20 shrink-0"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeFill} />
      </svg>
      <div className="h-[1px] flex-1 self-end" style={{ backgroundColor: lineBg }} />
    </div>
  );
};

/**
 * Unified section header used across the Shore partnership page.
 * Mirrors the home/about/SEO pattern: SVG shape line → "/ EYEBROW" → 2-col heading + mono description.
 */
export function ShoreSectionHeader({
  eyebrow,
  lead,
  accent,
  trail,
  titleSlot,
  description,
  variant = 'light',
  className,
  compact = false,
  showDecoration = true,
}: ShoreSectionHeaderProps) {
  const isDark = variant === 'dark';

  return (
    <div className={cn('w-full', compact ? 'mb-10' : 'mb-12 md:mb-16', className)}>
      {showDecoration ? <DecorativeShapeLine variant={variant} /> : null}

      <span className={cn(SHORE_SECTION_EYEBROW_CLASS, isDark && 'text-white/60')}>
        / {eyebrow}
      </span>

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        {(lead || accent || trail || titleSlot) && (
          <div className="flex-1 min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-balance text-3xl tracking-wide md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Nohemi, sans-serif',
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              {titleSlot ? (
                titleSlot
              ) : (
                <>
                  {lead ? (
                    <span className={isDark ? 'text-white' : 'text-[#1a1512]'}>{lead}</span>
                  ) : null}
                  {lead && (accent || trail) ? ' ' : null}
                  {accent ? (
                    <span className={cn(isDark ? 'font-light text-white/55' : 'font-light text-[#d3d4d9]')}>
                      {accent}
                    </span>
                  ) : null}
                  {accent && trail ? ' ' : null}
                  {trail ? (
                    <span className={isDark ? 'text-white/40' : 'text-[#1a1512]/40'}>{trail}</span>
                  ) : null}
                </>
              )}
            </motion.h2>
          </div>
        )}

        {description ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 min-w-0 md:max-w-md md:text-right"
          >
            <p
              className={cn(
                SHORE_SECTION_DESCRIPTION_CLASS,
                isDark && 'text-white/55',
              )}
            >
              {description}
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
