'use client';

import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

const CODE_LINES = [
  { indent: 0, parts: [{ t: 'async ', c: 'kw' }, { t: 'function ', c: 'kw' }, { t: 'shipSpinout', c: 'fn' }, { t: '(ctx) {', c: 'muted' }] },
  { indent: 1, parts: [{ t: 'const ', c: 'kw' }, { t: 'bundle ', c: 'var' }, { t: '= await ', c: 'muted' }, { t: "webpack('…')", c: 'str' }, { t: ' // 40s+', c: 'com' }] },
  { indent: 1, parts: [{ t: 'if (!', c: 'muted' }, { t: 'flags', c: 'var' }, { t: '.PROD) ', c: 'muted' }, { t: 'throw ', c: 'kw' }, { t: 'new Error()', c: 'str' }] },
  { indent: 1, parts: [{ t: 'await ', c: 'kw' }, { t: 'migrateSchema', c: 'fn' }, { t: '(manual)', c: 'com' }] },
  { indent: 1, parts: [{ t: 'return ', c: 'kw' }, { t: 'duplicateRoutes', c: 'fn' }, { t: '(ctx)', c: 'muted' }] },
  { indent: 0, parts: [{ t: '}', c: 'muted' }] },
  { indent: 0, parts: [{ t: '// repeat for every spinout…', c: 'com' }] },
  { indent: 0, parts: [{ t: 'export ', c: 'kw' }, { t: 'class ', c: 'kw' }, { t: 'LegacyPipeline', c: 'fn' }, { t: ' { /* … */ }', c: 'muted' }] },
  { indent: 1, parts: [{ t: 'await ', c: 'kw' }, { t: 'rebuildAssets', c: 'fn' }, { t: "('*.vendor.js')", c: 'str' }] },
  { indent: 1, parts: [{ t: 'invalidateCache', c: 'fn' }, { t: '(keys)', c: 'muted' }] },
] as const;

function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  return (
    <div
      className="shrink-0 whitespace-pre font-mono text-[8px] leading-[1.7] tracking-wide sm:text-[9px] md:text-[10px]"
      style={{ paddingLeft: `${line.indent * 0.65}rem` }}
    >
      {line.parts.map((p, pi) => (
        <span
          key={`${line.indent}-${pi}-${p.t.slice(0, 8)}`}
          className={cn(
            p.c === 'kw' && 'text-white/60',
            p.c === 'fn' && 'text-[#ffb089]/92',
            p.c === 'var' && 'text-white/72',
            p.c === 'str' && 'text-white/48',
            p.c === 'com' && 'text-white/40 italic',
            p.c === 'muted' && 'text-white/52'
          )}
        >
          {p.t}
        </span>
      ))}
    </div>
  );
}

function CodeRowMarquee({
  line,
  rowIndex,
  reduceMotion,
}: {
  line: (typeof CODE_LINES)[number];
  rowIndex: number;
  reduceMotion: boolean | null;
}) {
  const toRight = rowIndex % 2 === 0;
  const durationSec = 56 + (rowIndex % 5) * 5;

  return (
    <div className="relative w-full overflow-hidden py-[3px]">
      <div
        className={cn(
          'flex w-max items-center',
          !reduceMotion && (toRight ? 'studios-row-drift-right' : 'studios-row-drift-left')
        )}
        style={
          !reduceMotion ? ({ animationDuration: `${durationSec}s` } satisfies CSSProperties) : undefined
        }
      >
        <CodeLine line={line} />
        {!reduceMotion ? <CodeLine line={line} /> : null}
      </div>
    </div>
  );
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface StudiosCodeToComponentsIllustrationProps {
  className?: string;
}

/**
 * Startup studios: code fills the frame (alternating rows, slow).
 * One small, tilted glass "section" in front — hover reveals dashed
 * outlines on its editable parts to telegraph "reusable, configurable".
 */
export function StudiosCodeToComponentsIllustration({ className }: StudiosCodeToComponentsIllustrationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'studios-code-ui group relative h-full min-h-[160px] w-full overflow-hidden rounded-2xl bg-[#0f0d0c]',
        'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-24px_48px_rgba(0,0,0,0.45)]',
        className
      )}
      role="img"
      aria-label="Illustration: code fills the background with alternating horizontal drift; a small frosted-glass section sits on top showing a reusable component layout."
    >
      {!reduceMotion ? (
        <style>{`
          @keyframes studios-row-left {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes studios-row-right {
            from { transform: translate3d(-50%, 0, 0); }
            to { transform: translate3d(0, 0, 0); }
          }
          .studios-code-ui .studios-row-drift-left { animation: studios-row-left linear infinite; }
          .studios-code-ui .studios-row-drift-right { animation: studios-row-right linear infinite; }

          /* Hover state for "editable" dashed outlines (no JS needed) */
          .studios-code-ui .studios-edit-ring {
            outline: 1px dashed rgba(255,255,255,0);
            outline-offset: 3px;
            border-radius: inherit;
            transition: outline-color 220ms cubic-bezier(0.16, 1, 0.3, 1), outline-offset 220ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .studios-code-ui:hover .studios-edit-ring {
            outline-color: rgba(255,255,255,0.55);
          }
          .studios-code-ui:hover .studios-edit-ring-accent {
            outline-color: rgba(255,85,1,0.75);
          }
          .studios-code-ui .studios-edit-label {
            position: absolute;
            top: -0.6rem;
            left: 0.25rem;
            font-family: var(--font-mono, ui-monospace), ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 7px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.75);
            background: rgba(15,13,12,0.85);
            padding: 2px 4px;
            border-radius: 3px;
            opacity: 0;
            transform: translateY(2px);
            transition: opacity 200ms ease, transform 200ms ease;
            pointer-events: none;
            white-space: nowrap;
          }
          .studios-code-ui:hover .studios-edit-label { opacity: 1; transform: translateY(0); }
          .studios-code-ui .studios-edit-label-accent { color: #ffb089; }
          @media (prefers-reduced-motion: reduce) {
            .studios-code-ui .studios-row-drift-left,
            .studios-code-ui .studios-row-drift-right { animation: none !important; }
          }
        `}</style>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '96px 96px' }}
      />

      {/* Code — fills the entire frame */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-0.5 px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-5">
        {CODE_LINES.map((line, i) => (
          <CodeRowMarquee key={i} line={line} rowIndex={i} reduceMotion={reduceMotion} />
        ))}
      </div>

      {/* Subtle top/bottom vignette so edges settle without hiding code */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0f0d0c]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0f0d0c]/80 to-transparent" />

      {/* Small tilted glass "section" — scaled responsively */}
      <div className="relative z-[1] flex h-full items-center justify-center px-3 py-3 sm:px-4 sm:py-4">
        <motion.div
          className={cn(
            'relative w-[min(78%,240px)] sm:w-[min(68%,260px)] md:w-[min(62%,280px)] lg:w-[min(58%,300px)]',
            'rounded-2xl border border-white/[0.16] bg-white/[0.09] p-2.5 sm:p-3 md:p-3.5',
            'shadow-[0_28px_64px_rgba(0,0,0,0.55),0_12px_24px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.22)]',
            'backdrop-blur-xl backdrop-saturate-150'
          )}
          style={{ transformOrigin: 'center center' }}
          initial={reduceMotion ? false : { opacity: 0, y: 8, rotate: 0, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
          whileHover={reduceMotion ? undefined : { rotate: 0, y: -2, scale: 1.02 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Title bar (editable) */}
          <div className="relative mb-2 flex items-center gap-1.5 rounded-md px-1.5 py-1 sm:gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <div className="ml-auto h-1.5 w-10 rounded-full bg-[#ff5501]/45" />
            <span className="studios-edit-ring studios-edit-ring-accent pointer-events-none absolute inset-0" aria-hidden />
            <span className="studios-edit-label studios-edit-label-accent">CTA</span>
          </div>

          {/* Hero strip (editable) */}
          <div className="relative mb-2 flex gap-2 rounded-lg bg-white/[0.09] p-2 ring-1 ring-white/[0.1] sm:mb-2.5">
            <div className="w-2 shrink-0 self-stretch rounded bg-[#ff5501]/50" />
            <div className="flex flex-1 flex-col justify-center gap-1.5 py-0.5">
              <div className="h-1 w-[86%] rounded-full bg-white/40" />
              <div className="h-1 w-[60%] rounded-full bg-white/24" />
              <div className="h-1 w-[70%] rounded-full bg-white/18" />
            </div>
            <span className="studios-edit-ring pointer-events-none absolute inset-0" aria-hidden />
            <span className="studios-edit-label">Hero</span>
          </div>

          {/* Two column (editable tiles) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative flex flex-col gap-1.5 rounded-lg bg-white/[0.07] p-2 ring-1 ring-white/[0.1]">
              <div className="h-1 w-full rounded-full bg-white/32" />
              <div className="h-1 w-[85%] rounded-full bg-white/20" />
              <div className="h-1 w-[55%] rounded-full bg-white/14" />
              <div className="mt-auto h-6 w-full rounded-md bg-white/[0.07] ring-1 ring-white/10" />
              <span className="studios-edit-ring pointer-events-none absolute inset-0" aria-hidden />
              <span className="studios-edit-label">Card</span>
            </div>
            <div className="relative flex flex-col gap-1.5 rounded-lg bg-white/[0.07] p-2 ring-1 ring-white/[0.1]">
              <div className="h-8 w-full rounded-md bg-white/[0.09] ring-1 ring-white/10" />
              <div className="h-1 w-full rounded-full bg-white/26" />
              <div className="h-1 w-[70%] rounded-full bg-white/16" />
              <span className="studios-edit-ring pointer-events-none absolute inset-0" aria-hidden />
              <span className="studios-edit-label">Media</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StudiosCodeToComponentsIllustration;
