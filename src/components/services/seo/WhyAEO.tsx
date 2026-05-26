'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';
import { SHORE_SECTION_EYEBROW_CLASS } from '@/lib/shore-section-styles';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface WhyAEOComparisonRow {
  theirs: { label: string; value: string; sublabel: string };
  ours: { label: string; value: string; sublabel: string };
}

export interface WhyAEOContent {
  sectionId?: string;
  /** Match Shore partnership page eyebrow styling (ShoreSectionHeader) */
  useShoreEyebrow?: boolean;
  /** Text scrambled on scroll (without leading slash) */
  eyebrow: string;
  headline: React.ReactNode;
  painPoints: readonly string[];
  comparisonData: readonly WhyAEOComparisonRow[];
}

export const DEFAULT_WHY_AEO_CONTENT: WhyAEOContent = {
  eyebrow: 'THE PROBLEM',
  headline: (
    <>
      Traditional SEO agencies
      <AccentBr />
      weren&apos;t built for the
      <AccentBr />
      <span className="text-[#1a1512]/30">AI search era</span>
    </>
  ),
  painPoints: [
    'Traditional agencies burn months before you see anything tangible',
    'Bloated teams add meetings, slow decisions, and inflate project costs',
    'Pricing is hidden with vague scopes that grow larger mid-project',
  ],
  comparisonData: [
    {
      theirs: { label: 'Typical Agency Timeline', value: '6-12 months', sublabel: 'before measurable results' },
      ours: { label: 'Our Timeline', value: '90 days', sublabel: 'to first-page rankings' },
    },
    {
      theirs: { label: 'Avg. Agency SEO Cost', value: '$5-15k/mo', sublabel: 'locked into annual contracts' },
      ours: { label: 'Our Pricing', value: '$1.5-3.5k/mo', sublabel: 'cancel anytime' },
    },
  ],
};

export const SHORE_SEO_AEO_CONTENT: WhyAEOContent = {
  sectionId: 'seo-aeo',
  useShoreEyebrow: true,
  eyebrow: 'SEO + AEO',
  headline: (
    <>
      Rank in Google.
      <AccentBr />
      Convert on-site.
      <AccentBr />
      <span className="text-[#1a1512]/30">Get cited by AI.</span>
    </>
  ),
  painPoints: [
    'Rebuild vendors ship polished sites with no search architecture, then sell SEO as a separate phase',
    'Every portfolio brand reinvents IA, schema, and tracking instead of inheriting a proven Shore playbook',
    'AI assistants cite competitors because pages were never structured for entities, citations, or answer-ready content',
  ],
  comparisonData: [
    {
      theirs: { label: 'Typical vendor scope', value: 'Design-first', sublabel: 'SEO and analytics quoted after launch' },
      ours: {
        label: 'Captive + Shore build',
        value: 'Search-ready',
        sublabel: 'IA, schema, GA4, and GTM ship on day one',
      },
    },
    {
      theirs: {
        label: 'Typical vendor approach',
        value: 'One brand',
        sublabel: 'sequential rebuilds, months between each launch',
      },
      ours: {
        label: 'Our approach',
        value: 'Multi-brand',
        sublabel: 'parallel rollouts with shared templates, tracking, and IA across the portfolio',
      },
    },
    {
      theirs: { label: 'Legacy SEO only', value: 'Blue links', sublabel: 'no structure for AI answers or citations' },
      ours: {
        label: 'SEO + AEO built in',
        value: 'Full discovery',
        sublabel: 'Google rankings plus ChatGPT, Perplexity, and AI Overviews',
      },
    },
  ],
};

const DecorativeShapeWithLine = ({
  shapeColor = '#d5d5d5',
  lineColor = '#e5e5e5',
}: {
  shapeColor?: string;
  lineColor?: string;
}) => (
  <div className="flex w-full items-end">
    <svg viewBox="0 0 80 8" className="h-2 w-20 shrink-0" preserveAspectRatio="none">
      <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
    </svg>
    <div className="h-px flex-1 self-end" style={{ backgroundColor: lineColor }} />
  </div>
);

export interface WhyAEOProps {
  content?: WhyAEOContent;
}

export function WhyAEO({ content = DEFAULT_WHY_AEO_CONTENT }: WhyAEOProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const eyebrowText = content.eyebrow;
  const isShore = Boolean(content.useShoreEyebrow);
  const cardLabelClass = isShore
    ? 'mb-3 block font-mono text-[13px] uppercase tracking-[0.2em]'
    : 'mb-3 block font-mono text-[9px] uppercase tracking-[0.2em]';
  const cardSublabelClass = isShore
    ? 'block text-pretty font-mono text-[15px] leading-snug'
    : 'block text-pretty font-mono text-[10px] leading-snug';
  const painPointClass = isShore
    ? 'text-[15px] leading-relaxed text-[#1a1512]/50'
    : 'text-sm leading-relaxed text-[#1a1512]/50';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        const originalText = eyebrowText;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        gsap.to(
          {},
          {
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: labelRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              const progress = this.progress();
              let result = '';
              for (let i = 0; i < originalText.length; i++) {
                if (originalText[i] === ' ') {
                  result += ' ';
                } else if (progress > i / originalText.length) {
                  result += originalText[i];
                } else {
                  result += chars[Math.floor(Math.random() * chars.length)];
                }
              }
              if (labelRef.current) {
                labelRef.current.textContent = '/ ' + result;
              }
            },
            onComplete: function () {
              if (labelRef.current) {
                labelRef.current.textContent = '/ ' + originalText;
              }
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [eyebrowText]);

  return (
    <section
      ref={sectionRef}
      id={content.sectionId}
      className={cn(
        'relative w-full overflow-hidden bg-[#FAFAFA] py-20 md:py-28',
        content.useShoreEyebrow ? 'px-container-px' : 'px-4',
      )}
    >
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 w-full">
          <DecorativeShapeWithLine />
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span
              ref={labelRef}
              className={cn(
                content.useShoreEyebrow
                  ? SHORE_SECTION_EYEBROW_CLASS
                  : 'mb-6 block font-mono text-[11px] uppercase tracking-[0.25em] text-[#1a1512]/40',
              )}
            >
              / {eyebrowText}
            </span>

            <h2
              className="mb-10 text-balance text-3xl leading-[1.15] tracking-tighter text-[#1a1512] md:text-4xl lg:text-[2.75rem]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
            >
              {content.headline}
            </h2>

            <div className="flex flex-col gap-4">
              {content.painPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="flex items-start gap-3"
                >
                  <XCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-[#1a1512]/15"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className={painPointClass}>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {content.comparisonData.map((row, rowIndex) => (
              <motion.div
                key={row.theirs.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-2 gap-3"
              >
                <div
                  className="min-w-0 rounded-2xl border border-[#1a1512]/[0.06] bg-[#f3f4f6] p-5 md:p-6"
                  style={{ boxShadow: '0 1px 3px rgba(26,21,18,0.04)' }}
                >
                  <span className={cn(cardLabelClass, 'text-[#1a1512]/25')}>
                    {row.theirs.label}
                  </span>
                  <span
                    className="mb-1.5 block text-balance text-xl tracking-tight text-[#1a1512]/50 md:text-2xl"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                  >
                    {row.theirs.value}
                  </span>
                  <span className={cn(cardSublabelClass, 'text-[#1a1512]/20')}>
                    {row.theirs.sublabel}
                  </span>
                </div>

                <div
                  className="relative min-w-0 overflow-hidden rounded-2xl p-5 md:p-6"
                  style={{
                    background: 'linear-gradient(135deg, #ff5501, #cc3300)',
                    boxShadow:
                      'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 8px 32px -8px rgba(255,85,1,0.25), 0 2px 4px rgba(255,85,1,0.1)',
                  }}
                >
                  <span className={cn(cardLabelClass, 'text-white/60')}>
                    {row.ours.label}
                  </span>
                  <span
                    className="mb-1.5 block text-balance text-xl tracking-tight text-white md:text-2xl"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                  >
                    {row.ours.value}
                  </span>
                  <span className={cn(cardSublabelClass, 'text-white/50')}>
                    {row.ours.sublabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
