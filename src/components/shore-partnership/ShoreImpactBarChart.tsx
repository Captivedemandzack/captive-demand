'use client';

import { cn } from '@/lib/utils';

import type { ShoreImpactChart } from '@/data/shore-partnership-case-studies';

interface ShoreImpactBarChartProps {
  chart: ShoreImpactChart;
  className?: string;
  variant?: 'light' | 'dark';
}

function formatInt(n: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
}

export function ShoreImpactBarChart({ chart, className, variant = 'light' }: ShoreImpactBarChartProps) {
  const [priorPeriod, currentPeriod] = chart.comparisonLabels;
  const isDark = variant === 'dark';
  const mode = chart.comparisonMode ?? 'period';
  const metricList = chart.bars.map((b) => b.label).join(', ');
  const figureAriaLabel =
    mode === 'segment'
      ? `${priorPeriod} versus ${currentPeriod} for ${metricList}`
      : `${priorPeriod} compared to ${currentPeriod} for ${metricList}`;

  return (
    <figure className={cn('space-y-6', className)} aria-label={figureAriaLabel}>
      <figcaption className="sr-only">
        {mode === 'segment'
          ? `Side-by-side comparison of ${priorPeriod} and ${currentPeriod} for ${metricList} in the same reporting window.`
          : `Bar comparison of metrics between ${priorPeriod} and ${currentPeriod}.`}
      </figcaption>

      {chart.subtitle?.trim() ? (
        <p
          className={cn(
            'text-pretty text-[15px] leading-relaxed md:text-[15px]',
            isDark ? 'text-white/70' : 'text-neutral-600',
          )}
        >
          {chart.subtitle.trim()}
        </p>
      ) : null}

      <div
        className={cn(
          'flex justify-between gap-4 border-b pb-3 font-mono text-[13px] uppercase tracking-[0.2em]',
          isDark ? 'border-white/10 text-white/55' : 'border-[#e8e8e8] text-neutral-500',
        )}
      >
        <span className="text-[#ff5501]">{priorPeriod}</span>
        <span className={isDark ? 'text-white' : 'text-[#1a1512]'}>{currentPeriod}</span>
      </div>

      <div className="space-y-7">
        {chart.bars.map((row) => {
          const max = Math.max(row.prior, row.current, 1);
          const priorPct = (row.prior / max) * 100;
          const currentPct = (row.current / max) * 100;

          return (
            <div key={row.label}>
              <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-[#ff5501]">
                {row.label}
              </p>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-2.5 min-w-0 flex-1 overflow-hidden rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]',
                      isDark ? 'bg-white/10' : 'bg-neutral-200/70',
                    )}
                  >
                    <div
                      className="h-full rounded-full bg-[#ff5501]/35 transition-[width] duration-500 ease-out"
                      style={{ width: `${priorPct}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      'w-[4.5rem] shrink-0 text-right font-mono text-[15px] tabular-nums',
                      isDark ? 'text-white/60' : 'text-neutral-600',
                    )}
                  >
                    {formatInt(row.prior)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-2.5 min-w-0 flex-1 overflow-hidden rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]',
                      isDark ? 'bg-white/10' : 'bg-neutral-200/70',
                    )}
                  >
                    <div
                      className={cn(
                        'h-full rounded-full transition-[width] duration-500 ease-out',
                        isDark ? 'bg-white' : 'bg-[#1a1512]',
                      )}
                      style={{ width: `${currentPct}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      'w-[4.5rem] shrink-0 text-right font-mono text-[15px] font-semibold tabular-nums',
                      isDark ? 'text-white' : 'text-[#1a1512]',
                    )}
                  >
                    {formatInt(row.current)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {chart.footnote ? (
        <p
          className={cn(
            'border-t pt-4 text-pretty text-[15px] leading-relaxed md:text-[15px]',
            isDark ? 'border-white/10 text-white/50' : 'border-[#e8e8e8] text-neutral-500',
          )}
        >
          {chart.footnote}
        </p>
      ) : null}
    </figure>
  );
}

export default ShoreImpactBarChart;
