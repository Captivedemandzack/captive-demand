import type { ComponentType } from 'react';
import Image from 'next/image';

import { canonicalProductionOrigin } from '@/lib/site';
import { cn } from '@/lib/utils';

import {
  type AiBrandGlyphProps,
  ChatGPTGlyph,
  PerplexityGlyph,
} from '@/components/layout/ask-ai-brand-glyphs';

/** Always embed production URL in prompts so links work from localhost/staging builds. */
function buildTellAboutPrompt(customPrompt?: string): string {
  if (customPrompt?.trim()) return customPrompt.trim();
  const origin = canonicalProductionOrigin.replace(/\/$/, '');
  return `tell me about ${origin}/`;
}

export interface AskAiAboutFooterProps {
  /** Override the default “tell me about …” prompt sent to each assistant. */
  prompt?: string;
  className?: string;
}

/**
 * Tonal “pill” chip: soft top highlight + shallow bottom occlusion + ambient outer shadow
 * (same vocabulary as AnimatedCTAButton / tactile surfaces, without orange).
 */
const CHIP =
  'group relative inline-flex size-[46px] shrink-0 items-center justify-center rounded-xl bg-[#ebe9e7] text-[#8f8f8f] transition-[transform,box-shadow,color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5 hover:text-[#696969] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1512]/12 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa]';

const CHIP_SHADOW_REST =
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),inset_0_-1px_0_0_rgba(0,0,0,0.045),0_1px_2px_rgba(0,0,0,0.055),0_4px_12px_rgba(0,0,0,0.045)]';

const CHIP_SHADOW_HOVER =
  'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.96),inset_0_-1px_0_0_rgba(0,0,0,0.055),0_2px_4px_rgba(0,0,0,0.065),0_10px_22px_rgba(0,0,0,0.065)]';

/** Matches tonal weight of `currentColor` SVG glyphs; strips chroma from raster/brand SVG assets. */
const CHIP_ICON =
  'flex size-[22px] shrink-0 items-center justify-center opacity-[0.92] transition-opacity duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 [&_img]:grayscale [&_img]:contrast-[1.03]';

type AssistantGlyphRow = {
  id: string;
  label: string;
  href: string;
  kind: 'glyph';
  Glyph: ComponentType<AiBrandGlyphProps>;
};

type AssistantImageRow = {
  id: string;
  label: string;
  href: string;
  kind: 'image';
  src: string;
  width: number;
  height: number;
};

type AssistantRow = AssistantGlyphRow | AssistantImageRow;

export function AskAiAboutFooter({ prompt: promptOverride, className }: AskAiAboutFooterProps = {}) {
  const prompt = buildTellAboutPrompt(promptOverride);
  const encoded = encodeURIComponent(prompt);

  /** Claude → Gemini → Grok → ChatGPT → Perplexity */
  const assistants: AssistantRow[] = [
    {
      id: 'claude',
      label: 'Claude',
      href: `https://claude.ai/new?q=${encoded}`,
      kind: 'image',
      src: '/claudeicon.avif',
      width: 22,
      height: 22,
    },
    {
      id: 'gemini',
      label: 'Gemini',
      href: `https://www.google.com/search?q=${encoded}&udm=50`,
      kind: 'image',
      src: '/geminiicon.svg',
      width: 22,
      height: 22,
    },
    {
      id: 'grok',
      label: 'Grok',
      href: `https://x.com/i/grok?text=${encoded}`,
      kind: 'image',
      src: '/grokicon.svg',
      width: 22,
      height: 22,
    },
    {
      id: 'chatgpt',
      label: 'ChatGPT',
      href: `https://chatgpt.com/?prompt=${encoded}`,
      kind: 'glyph',
      Glyph: ChatGPTGlyph,
    },
    {
      id: 'perplexity',
      label: 'Perplexity',
      href: `https://www.perplexity.ai/search/new?q=${encoded}`,
      kind: 'glyph',
      Glyph: PerplexityGlyph,
    },
  ];

  const displaySite = `${canonicalProductionOrigin.replace(/\/$/, '')}/`;

  return (
    <section className={cn('mt-12 md:mt-14', className)} aria-labelledby="ask-ai-footer-heading">
      <div className="max-w-xl pb-6">
        <h3
          id="ask-ai-footer-heading"
          className="font-nohemi-custom text-base font-[400] tracking-tight text-brand-dark md:text-lg"
        >
          Ask AI about Captive Demand
        </h3>
        <ul className="mt-4 flex flex-wrap gap-3 md:mt-5">
          {assistants.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${item.label} about Captive Demand (${displaySite})`}
                className={cn(CHIP, CHIP_SHADOW_REST, CHIP_SHADOW_HOVER)}
              >
                <span className={CHIP_ICON}>
                  {item.kind === 'image' ? (
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      className="size-[22px] object-contain"
                    />
                  ) : (
                    <item.Glyph className="size-[22px]" />
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AskAiAboutFooter;
