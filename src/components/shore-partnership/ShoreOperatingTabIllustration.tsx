'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ShoreOperatingTabIllustrationProps {
  tabId: string;
  className?: string;
}

function DarkPanel({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  role?: string;
  'aria-label'?: string;
}) {
  return (
    <div
      {...rest}
      className={cn(
        'relative h-full min-h-[160px] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12100e]',
        'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.07),inset_0_-32px_64px_rgba(0,0,0,0.55)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function WebsiteSkeleton({ dark = false }: { dark?: boolean }) {
  const bar = dark ? 'bg-white/10' : 'bg-[#1a1512]/10';
  const barSoft = dark ? 'bg-white/[0.06]' : 'bg-[#1a1512]/6';
  const surface = dark ? 'border-white/10 bg-white/[0.04]' : 'border-[#1a1512]/8 bg-white';
  const nav = dark ? 'border-white/10 bg-white/[0.03]' : 'border-[#1a1512]/6 bg-[#fafafa]';

  return (
    <div className={cn('relative h-full overflow-hidden rounded-xl border p-2.5', surface)}>
      <div className={cn('mb-2 flex h-3 items-center gap-1 rounded border px-1.5', nav)}>
        <div className={cn('size-1 rounded-full', bar)} />
        <div className={cn('h-1 flex-1 rounded', barSoft)} />
      </div>
      <div className={cn('relative mb-2 aspect-[16/7] overflow-hidden rounded-lg', barSoft)}>
        <div className={cn('absolute left-3 top-3 h-1.5 w-2/3 rounded', bar)} />
        <div className={cn('absolute left-3 top-6 h-1 w-1/2 rounded', barSoft)} />
        <div className={cn('absolute bottom-3 left-3 h-4 w-14 rounded-full', dark ? 'bg-[#ff5501]/60' : 'bg-[#ff5501]/80')} />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((n) => (
          <div key={n} className={cn('rounded-md border p-1.5', surface)}>
            <div className={cn('mb-1 h-1 w-3/4 rounded', bar)} />
            <div className={cn('h-4 rounded', barSoft)} />
          </div>
        ))}
      </div>
    </div>
  );
}

const AUDIT_CHECKS = [
  { id: 'ia', label: 'Information architecture', pass: false },
  { id: 'hero', label: 'Above-the-fold clarity', pass: false },
  { id: 'booking', label: 'Booking & contact flow', pass: false },
  { id: 'mobile', label: 'Mobile experience', pass: true },
  { id: 'speed', label: 'Page load speed', pass: false },
  { id: 'tracking', label: 'Analytics & tracking', pass: false },
  { id: 'local-seo', label: 'Local SEO signals', pass: false },
  { id: 'trust', label: 'Trust & credibility', pass: true },
] as const;

const SCAN_MS = 2600;
const RESULTS_MS = 5200;

function ScanBeam({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-20 h-[2px] bg-[#ff5501] shadow-[0_0_14px_3px_rgba(255,85,1,0.75)]"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : { duration: SCAN_MS / 1000, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-10 h-10 bg-gradient-to-b from-[#ff5501]/25 via-[#ff5501]/8 to-transparent"
        initial={{ top: '-2.5rem' }}
        animate={{ top: 'calc(100% - 2.5rem)' }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : { duration: SCAN_MS / 1000, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] bg-[#ff5501]/[0.04]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3, 0.6, 0] }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : { duration: SCAN_MS / 1000, ease: 'linear' }
        }
      />
    </>
  );
}

function AuditChecklist({ reduceMotion }: { reduceMotion: boolean | null }) {
  const failCount = AUDIT_CHECKS.filter((item) => !item.pass).length;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">Audit results</p>
        <span className="rounded border border-[#ff5501]/30 bg-[#ff5501]/10 px-2 py-0.5 font-mono text-[7px] uppercase tracking-wider text-[#ff5501]">
          {failCount} to fix
        </span>
      </div>

      <ul className="min-h-0 flex-1 space-y-0 overflow-hidden">
        {AUDIT_CHECKS.map((item, index) => (
          <motion.li
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : {
                    delay: index * 0.08,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }
            }
            className="flex items-center justify-between gap-2 border-b border-white/[0.06] py-2 last:border-b-0"
          >
            <span className="text-[9px] leading-snug text-white/75 sm:text-[10px]">{item.label}</span>
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-full border',
                item.pass
                  ? 'border-[#28c840]/35 bg-[#28c840]/12'
                  : 'border-[#ff5501]/35 bg-[#ff5501]/12',
              )}
              aria-hidden
            >
              {item.pass ? (
                <Check className="size-3 text-[#28c840]" strokeWidth={2} />
              ) : (
                <X className="size-3 text-[#ff5501]" strokeWidth={2} />
              )}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function SiteAuditIllustration() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<'scan' | 'results'>(reduceMotion ? 'results' : 'scan');

  useEffect(() => {
    if (reduceMotion) {
      setPhase('results');
      return;
    }

    const timeouts: number[] = [];

    const queue = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeouts.push(id);
    };

    const runCycle = () => {
      setPhase('scan');
      queue(() => {
        setPhase('results');
        queue(runCycle, RESULTS_MS);
      }, SCAN_MS);
    };

    runCycle();
    return () => {
      for (const id of timeouts) window.clearTimeout(id);
    };
  }, [reduceMotion]);

  return (
    <div className="relative flex h-full flex-col p-4">
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          {phase === 'scan' ? (
            <motion.div
              key="scan"
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: 'blur(2px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="relative h-full overflow-hidden rounded-xl">
                <WebsiteSkeleton dark />
                <ScanBeam reduceMotion={reduceMotion} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 4, filter: 'blur(2px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <AuditChecklist reduceMotion={reduceMotion} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 shrink-0 text-center font-mono text-[8px] uppercase tracking-wider text-white/40"
        >
          {phase === 'scan' ? 'Auditing structure, conversion & tracking…' : `${AUDIT_CHECKS.length} areas reviewed`}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const TEAM_STEPS = [
  { id: 'strategy', label: 'Strategy', detail: 'Scope + priorities' },
  { id: 'delivery', label: 'Delivery', detail: 'Build + integrate' },
  { id: 'qc', label: 'QC', detail: 'Review + launch' },
] as const;

function TeamProcessIllustration() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const circleSize = 44;
  const circleCenter = circleSize / 2;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % TEAM_STEPS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const progressWidth =
    active === 0 ? '0px' : active === 1 ? `calc(50% - ${circleCenter}px)` : `calc(100% - ${circleSize}px)`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-5">
      <div className="relative w-full max-w-[280px]">
        <div
          className="absolute h-[2px] rounded-full bg-white/10"
          style={{ left: circleCenter, right: circleCenter, top: circleCenter - 1 }}
          aria-hidden
        />
        <motion.div
          className="absolute h-[2px] rounded-full bg-[#ff5501]/75"
          style={{ left: circleCenter, top: circleCenter - 1 }}
          animate={{ width: progressWidth }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
          }
          aria-hidden
        />

        <div className="relative flex justify-between">
          {TEAM_STEPS.map((step, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <motion.div
                  className={cn(
                    'relative z-10 flex size-11 items-center justify-center rounded-full border-2 font-mono text-[9px] uppercase tracking-wider',
                    isActive
                      ? 'border-[#ff5501] bg-[#12100e] text-[#ff5501]'
                      : isPast
                        ? 'border-[#ff5501]/50 bg-[#12100e] text-[#ff5501]/80'
                        : 'border-white/10 bg-[#12100e] text-white/35',
                  )}
                  animate={{ scale: isActive && !reduceMotion ? 1.06 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {isPast ? (
                    <Check className="size-4" strokeWidth={2} aria-hidden />
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </motion.div>
                <p
                  className={cn(
                    'font-mono text-[8px] uppercase tracking-wider',
                    isActive ? 'text-white/80' : isPast ? 'text-white/55' : 'text-white/40',
                  )}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={TEAM_STEPS[active].id}
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[9px] uppercase tracking-wider text-white/50"
        >
          {TEAM_STEPS[active].detail}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function AnalyticsIllustration() {
  const metrics = [
    { label: 'Users', value: '12.4k', delta: '+18%' },
    { label: 'Sessions', value: '18.1k', delta: '+12%' },
    { label: 'Conversions', value: '284', delta: '+31%' },
  ] as const;

  return (
    <div className="flex h-full flex-col p-3">
      <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="size-4 rounded bg-[#f9ab00]/20" />
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/60">Analytics</p>
        </div>
        <div className="flex gap-1">
          {['GA4', 'GTM'].map((tag) => (
            <span key={tag} className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[7px] text-white/45">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-2 grid grid-cols-3 gap-1.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
            <p className="font-mono text-[7px] uppercase tracking-wider text-white/40">{m.label}</p>
            <p className="mt-0.5 font-nohemi text-sm font-semibold tabular-nums text-white">{m.value}</p>
            <p className="font-mono text-[7px] text-[#28c840]">{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-white/8 bg-white/[0.02] p-2">
        <p className="mb-2 font-mono text-[7px] uppercase tracking-wider text-white/35">Traffic over time</p>
        <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          <polyline
            fill="none"
            stroke="rgba(249,171,0,0.7)"
            strokeWidth="2"
            points="0,50 30,42 60,38 90,28 120,32 150,18 180,22 200,12"
          />
          <polyline
            fill="none"
            stroke="rgba(255,85,1,0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            points="0,55 30,48 60,44 90,40 120,36 150,30 180,28 200,24"
          />
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {['UTM', 'CRM', 'Portfolio rollup'].map((tag) => (
          <span key={tag} className="rounded border border-[#ff5501]/25 bg-[#ff5501]/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-wider text-[#ff5501]/80">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function StudioEditorIllustration() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1a1816] text-[8px]">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#141210] px-2 py-1.5">
        <span className="font-mono text-[7px] text-white/50">yourbusiness.co</span>
        <div className="flex items-center gap-1">
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[6px] text-white/60">Desktop</span>
          <span className="rounded bg-[#ff5501] px-2 py-0.5 font-mono text-[6px] uppercase text-white">Publish</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Pages sidebar */}
        <div className="w-[22%] shrink-0 border-r border-white/8 bg-[#12100e] p-1.5">
          <p className="mb-1.5 font-mono text-[6px] uppercase tracking-wider text-white/35">Pages</p>
          <div className="space-y-1">
            <div className="rounded border border-[#ff5501]/30 bg-[#ff5501]/10 px-1.5 py-1 font-mono text-[6px] text-[#ff5501]">/home</div>
            <div className="rounded px-1.5 py-1 font-mono text-[6px] text-white/40">/about</div>
          </div>
        </div>

        {/* Preview canvas */}
        <div className="relative min-w-0 flex-1 bg-[#0d0c0b]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a2520]/80 to-[#1a1512]/90" />
          <div className="relative flex h-full flex-col justify-end p-2">
            <div className="mb-1 h-2 w-3/4 rounded bg-white/20" />
            <div className="mb-2 h-1 w-1/2 rounded bg-white/10" />
            <div className="h-3 w-12 rounded bg-[#c4a574]/70" />
          </div>
          <p className="absolute right-1 top-1 font-mono text-[5px] text-white/30">Reload preview</p>
        </div>

        {/* Captive Studio panel */}
        <div className="flex w-[28%] shrink-0 flex-col border-l border-white/8 bg-[#141210]">
          <div className="border-b border-white/8 px-1.5 py-1">
            <p className="font-mono text-[6px] uppercase tracking-wider text-white/50">Captive Studio</p>
          </div>
          <div className="flex-1 space-y-1 p-1.5">
            {['Update hero headline', 'Replace hero image', 'Edit about text'].map((chip) => (
              <div key={chip} className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-1 font-mono text-[5px] text-white/45">
                {chip}
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 p-1.5">
            <div className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-1 font-mono text-[5px] text-white/30">
              Type a message…
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/8 bg-[#12100e] px-2 py-1">
        <span className="font-mono text-[6px] text-[#28c840]">● Editing</span>
        <span className="font-mono text-[6px] text-white/30">v8</span>
      </div>
    </div>
  );
}

export function ShoreOperatingTabIllustration({ tabId, className }: ShoreOperatingTabIllustrationProps) {
  if (tabId === '01') {
    return (
      <DarkPanel className={className} role="img" aria-label="Website audit scan and results checklist">
        <SiteAuditIllustration />
      </DarkPanel>
    );
  }

  if (tabId === '02') {
    return (
      <DarkPanel className={className} role="img" aria-label="Senior team workflow animation">
        <TeamProcessIllustration />
      </DarkPanel>
    );
  }

  if (tabId === '03') {
    return (
      <DarkPanel className={className} role="img" aria-label="GA4 analytics dashboard">
        <AnalyticsIllustration />
      </DarkPanel>
    );
  }

  if (tabId === '04') {
    return (
      <DarkPanel className={className} role="img" aria-label="Delivery timeline visualization">
        <div className="flex h-full flex-col justify-center gap-4 p-5">
          {[1, 2, 3, 4].map((week) => (
            <div key={week} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/35">W{week}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ff5501]" style={{ width: `${week * 25}%` }} />
              </div>
            </div>
          ))}
        </div>
      </DarkPanel>
    );
  }

  return (
    <DarkPanel className={className} role="img" aria-label="Captive Studio site editor">
      <div className="relative h-full p-2">
        <StudioEditorIllustration />
      </div>
    </DarkPanel>
  );
}
