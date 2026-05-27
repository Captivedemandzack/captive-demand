import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

/** Default marketing-page canvas (homepage sections, /contact). */
export const SITE_PAGE_BG_CLASS = 'bg-[#FAFAFA]';

/** Bezel + layered inner/outer shadow — matches CTASection testimonial card. */
export const SITE_RAISED_PANEL_SHADOW: CSSProperties = {
  boxShadow:
    '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(0,0,0,0.04)',
};

/** Raised gray panel surface (resting cards on #FAFAFA). */
export function siteRaisedPanelClassName(className?: string) {
  return cn(
    'relative overflow-hidden rounded-2xl border border-[#e8e8e8] bg-[#f6f5f6]',
    className,
  );
}

/** Carousel / Card.tsx-style stack on lighter gray. */
export const SITE_GRAY_CARD_SHADOW: CSSProperties = {
  boxShadow:
    '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05), inset 0 1px 0 0 rgba(255,255,255,0.4)',
};

export function siteGrayCardClassName(className?: string) {
  return cn(
    'relative overflow-hidden rounded-xl border border-[#1a1512]/5 bg-[#f3f4f6]',
    className,
  );
}

/** White marketing cards (CaseStudies Card.tsx shell). */
export const SITE_MARKETING_WHITE_SHADOW: CSSProperties = {
  boxShadow:
    '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05), inset 0 1px 0 0 rgba(255,255,255,0.4)',
};

export function siteMarketingWhiteCardClassName(className?: string) {
  return cn('relative overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white', className);
}

/** ContactFormCard input + label utilities */
export const SITE_FORM_LABEL_CLASS =
  'font-mono uppercase text-[10px] text-[#999] tracking-[0.08em] block mb-2';

export const SITE_FORM_INPUT_CLASS =
  'w-full bg-[#fafafa] border border-[#e0e0e0] rounded-lg px-3.5 py-3 font-mono text-[13px] text-[#111] outline-none transition-colors focus:border-[#E8480C] focus:bg-white';

/** Muted reassurance copy directly beneath form submit buttons */
export const SITE_FORM_ANCHOR_TEXT_CLASS =
  'mt-3 font-mono text-[11px] leading-relaxed text-[#1a1512]/55';

/** Primary marketing accent (hero pills, focus rings). */
export const SITE_ORANGE = '#ff5501';
