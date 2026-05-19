'use client';

import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

interface ShoreStat {
  value: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

const STATS: ShoreStat[] = [
  {
    value: '83',
    suffix: '%',
    label: 'Lead Capture Rate on Abandoned Bookings',
    sublabel: 'Abandoned booking recovery',
  },
  {
    value: '16',
    suffix: '+',
    label: 'Active engagements',
    sublabel: "Inside Shore's portfolio today",
  },
  {
    value: '1M',
    suffix: '+',
    label: 'Lifecycle emails',
    sublabel: 'Portfolio-wide (rolling)',
  },
  {
    value: '420',
    suffix: 'K+',
    label: 'Organic search impressions',
    sublabel: 'Portfolio SEO & AEO reach',
  },
];

/**
 * Visual twin of `ResultsShowcase` — same radial gradient + glass stat cards.
 * Values are static strings (includes K/M suffixes).
 */
export function ShorePartnershipStatsBand() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-12 md:py-16"
      style={{
        background:
          'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)',
      }}
      aria-label="At a glance"
    >
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-10">
          <span className="block font-mono text-sm uppercase tracking-wider text-white/30">/ At a glance</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              style={{
                boxShadow:
                  'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 40px -15px rgba(0,0,0,0.3)',
              }}
            >
              <div className="mb-4 flex items-baseline gap-1">
                <span
                  className="text-5xl tracking-tighter text-white md:text-6xl"
                  style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                >
                  {stat.value}
                </span>
                {stat.suffix ? (
                  <span
                    className="text-3xl text-[#ff5501] md:text-4xl"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                  >
                    {stat.suffix}
                  </span>
                ) : null}
              </div>
              <h3
                className="mb-1 text-base text-white"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
              >
                {stat.label}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
