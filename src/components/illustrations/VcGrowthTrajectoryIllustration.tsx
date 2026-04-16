'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NOISE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";

/** ViewBox — x at column centers matches 4-col grid (12.5%, 37.5%, …) */
const VB = { w: 100, h: 70 };

/** Column centers (same as `grid-cols-4` cell midlines) */
const COL_X = [12.5, 37.5, 62.5, 87.5] as const;

const SERIES = [
  { label: 'CAC', peak: false },
  { label: 'LTV', peak: false },
  { label: 'AOV', peak: false },
  { label: 'MRR', peak: true },
] as const;

/** Y in viewBox (↓); upward story = decreasing y */
const COL_Y = [58, 46, 35, 14] as const;

/**
 * Standard point-to-point line graph math. 
 * Connects directly through the dots and calculates the slope 
 * to bleed the line slightly off the left and right edges.
 */
function buildLinePath(): string {
  const [x0, x1, x2, x3] = COL_X;
  const [y0, y1, y2, y3] = COL_Y;

  // Calculate slope for the first segment to extend it to the left edge (x=0)
  const slopeStart = (y1 - y0) / (x1 - x0);
  const yStart = y0 - (slopeStart * x0);

  // Calculate slope for the last segment to extend it to the right edge (x=100)
  const slopeEnd = (y3 - y2) / (x3 - x2);
  const yEnd = y3 + (slopeEnd * (100 - x3));

  return [
    `M 0 ${yStart}`,
    `L ${x0} ${y0}`,
    `L ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `L 100 ${yEnd}`
  ].join(' ');
}

function buildAreaPath(): string {
  const line = buildLinePath();
  // Drops the fill path straight down to the bottom of the viewBox to complete the shape
  return `${line} L 100 ${VB.h} L 0 ${VB.h} Z`;
}

const PATH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MONTHS = ['Month 1', 'Month 2', 'Month 3', 'Month 4'] as const;

export interface VcGrowthTrajectoryIllustrationProps {
  className?: string;
}

/**
 * VC tab: 4-col grid aligns dots + month labels; standard segmented line graph.
 */
export function VcGrowthTrajectoryIllustration({ className }: VcGrowthTrajectoryIllustrationProps) {
  const reduceMotion = useReducedMotion();
  const linePath = buildLinePath();
  const areaPath = buildAreaPath();
  const lineDuration = reduceMotion ? 0 : 2.35;
  const nodeBaseDelay = reduceMotion ? 0 : 0.32;
  const step = reduceMotion ? 0 : 0.34;

  return (
    <div
      className={cn(
        'vc-growth-illustration relative flex h-full min-h-[160px] w-full flex-col overflow-hidden rounded-2xl bg-[#131211]',
        'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.07),inset_0_-28px_56px_rgba(0,0,0,0.52)]',
        className
      )}
      role="img"
      aria-label="Growth chart: CAC, LTV, AOV, and MRR markers aligned to Month 1 through Month 4, with a consistent upward trend."
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          backgroundColor: '#131211',
          backgroundImage: `
            linear-gradient(185deg, rgba(255,255,255,0.055) 0%, transparent 18%),
            linear-gradient(0deg, rgba(0,0,0,0.42) 0%, transparent 42%),
            radial-gradient(ellipse 95% 70% at 50% -5%, rgba(210,218,226,0.05) 0%, transparent 48%),
            linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.025) 48%, transparent 62%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.055] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TILE, backgroundSize: '112px 112px' }}
      />

      {/* Plot: Shared single container guarantees 1:1 pixel mapping between SVG and HTML dots */}
      <div className="relative min-h-0 flex-1 px-3 sm:px-4">
        {/* The single mathematical bounding box */}
        <div className="pointer-events-none absolute inset-x-3 top-2 bottom-10 sm:inset-x-4 sm:top-3 sm:bottom-11">
          
          {/* 1. SVG Layer */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="vc-area-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(230,228,224,0.07)" />
                <stop offset="45%" stopColor="rgba(230,228,224,0.03)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </linearGradient>
            </defs>

            <motion.path
              d={areaPath}
              fill="url(#vc-area-fill)"
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.38 }}
            />

            <motion.path
              d={linePath}
              fill="none"
              stroke="rgba(218,214,208,0.88)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="nonScalingStroke"
              initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: lineDuration, ease: PATH_EASE },
                opacity: { duration: 0.28, ease: PATH_EASE },
              }}
            />
          </svg>

          {/* 2. HTML Dots Layer */}
          {SERIES.map((s, i) => {
            const peak = s.peak;
            const x = COL_X[i];
            const y = COL_Y[i];
            const topPct = (y / VB.h) * 100;
            return (
              /* Root wrapper pinned perfectly to the exact mathematical coordinate */
              <div
                key={s.label}
                className="absolute"
                style={{ left: `${x}%`, top: `${topPct}%` }}
                aria-hidden
              >
                {/* LABEL: Anchored to the coordinate, pushing up */}
                <motion.div
                  className="absolute bottom-full left-1/2 mb-2.5 flex -translate-x-1/2 flex-col items-center"
                  initial={{ opacity: reduceMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: reduceMotion ? 0 : nodeBaseDelay + i * step,
                    duration: 0.34,
                    ease: PATH_EASE,
                  }}
                >
                  <div className="flex max-w-[min(5.5rem,22vw)] justify-center">
                    {peak ? (
                      <div className="relative inline-block whitespace-nowrap rounded-lg bg-[#ff5501] px-2 py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_6px_20px_rgba(255,85,1,0.28),inset_0_1px_0_0_rgba(255,255,255,0.32)] sm:text-[11px]">
                        {s.label}
                        <span
                          className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#ff5501]"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <div className="inline-block whitespace-nowrap rounded-lg border border-white/[0.12] bg-black/40 px-2 py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/[0.88] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md sm:text-[11px]">
                        {s.label}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* DOT: Centered perfectly on the mathematical coordinate */}
                <motion.div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  initial={{ scale: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: reduceMotion ? 0 : nodeBaseDelay + i * step + 0.04,
                    duration: 0.32,
                    ease: PATH_EASE,
                  }}
                >
                  {peak ? (
                    <>
                      <span className="absolute h-8 w-8 rounded-full bg-[#ff5501]/25 blur-md" />
                      <span className="relative z-[1] block h-2.5 w-2.5 rounded-full border border-[#fff5ed]/80 bg-[#ff5501] shadow-[0_0_0_1px_rgba(0,0,0,0.35)] sm:h-3 sm:w-3" />
                    </>
                  ) : (
                    <span className="block h-2 w-2 rounded-full border border-[rgba(235,232,228,0.55)] bg-[#2c2826] sm:h-2.5 sm:w-2.5" />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis — same 4 columns as plot */}
      <div className="relative z-[1] grid shrink-0 grid-cols-4 gap-0 border-t border-white/[0.07] px-3 pb-3 pt-2 sm:px-4 sm:pb-3.5 sm:pt-2.5">
        {MONTHS.map((m) => (
          <span
            key={m}
            className="text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/36 sm:text-[10px]"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default VcGrowthTrajectoryIllustration;