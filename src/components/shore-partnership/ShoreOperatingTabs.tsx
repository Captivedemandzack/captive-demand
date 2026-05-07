'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { CTAButton } from '@/components/ui/CTAButton';
import { cn } from '@/lib/utils';

const cardShadow =
  '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.5)';

interface ShoreOperatingTab {
  id: string;
  /** Tab label (uppercased in the strip) */
  shortLabel: string;
  /** Italic Nohemi summary inside the panel */
  headline: string;
  /** Long-form description */
  body: string;
  /** Primary stat value (e.g. "4–6", "Day 1", "100%") */
  statValue: string;
  /** Stat label below the value */
  statLabel: string;
  /** Capability chips on the right */
  capabilities: readonly string[];
}

interface ShoreOperatingTabsProps {
  tabs: readonly ShoreOperatingTab[];
}

/**
 * Tabbed operating-model card — mirrors `IndustriesFolderSection` mechanics
 * (uses the shared `.industry-tab-*` styles from globals.css).
 */
export function ShoreOperatingTabs({ tabs }: ShoreOperatingTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const reduceMotion = useReducedMotion();
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  if (!active) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl bg-white md:rounded-3xl"
      style={{ boxShadow: cardShadow }}
    >
      <div className="industry-tab-bar-shell w-full shrink-0">
        <div
          className="industry-tab-scroller scrollbar-hide snap-x snap-mandatory scroll-smooth"
          role="presentation"
        >
          <div className="industry-tab-strip" role="tablist" aria-label="Operating model pillars">
            {tabs.map((tab, idx) => {
              const isActive = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`shore-operating-tab-${tab.id}`}
                  aria-controls={`shore-operating-panel-${tab.id}`}
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    'relative min-h-[48px] shrink-0 cursor-pointer snap-start snap-always whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] md:text-xs',
                    isActive && 'industry-tab-active',
                    isActive && idx === 0 && 'industry-tab-active-first',
                    !isActive && 'industry-tab-inactive',
                  )}
                >
                  <span className="relative z-[1] block whitespace-nowrap">{tab.shortLabel}</span>
                  {isActive ? (
                    <span
                      className="absolute bottom-2 left-5 right-5 z-[1] h-[3px] rounded-full bg-[#1a1512] md:bottom-2.5"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="industry-tab-panel overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active.id}
            id={`shore-operating-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`shore-operating-tab-${active.id}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
            className="p-6 md:p-10 lg:p-12"
          >
            <div className="grid grid-cols-1 gap-8">
              <div className="flex min-w-0 flex-col">
                <h3
                  className="text-balance mb-5 text-2xl tracking-wide text-[#1a1512] md:text-3xl lg:text-4xl"
                  style={{
                    fontFamily: 'Nohemi, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                  }}
                >
                  {active.headline}
                </h3>
                <p className="mb-8 text-pretty text-sm leading-[1.65] text-[#1a1512]/80 md:text-base">
                  {active.body}
                </p>

                <div className="mb-6 h-px w-full bg-[#1a1512]/10 md:mb-8" aria-hidden />

                <div className="mb-10 flex min-w-0 flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:gap-x-6 md:gap-y-3">
                  <div className="shrink-0">
                    <div
                      className="mb-1 text-2xl font-semibold leading-none text-[#ff5501] md:text-3xl"
                      style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 600 }}
                    >
                      {active.statValue}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1512]/55">
                      {active.statLabel}
                    </div>
                  </div>
                  <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-2 p-0 md:pt-0.5">
                    {active.capabilities.map((cap) => (
                      <li key={cap}>
                        <span className="inline-block rounded-lg bg-[#eceae8] px-2.5 py-1 text-xs font-medium text-[#525252]">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full min-w-0 max-w-full">
                  <CTAButton
                    variant="dark"
                    text="START A PROJECT"
                    href="#contact"
                    ariaLabel="Start a project: jump to the Shore lead form"
                    style={{
                      filter:
                        'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
