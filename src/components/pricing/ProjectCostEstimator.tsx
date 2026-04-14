'use client';

import React, { useMemo, useState } from 'react';

import { CTAButton } from '@/components/ui/CTAButton';
import {
  computeEstimateRange,
  mapMidpointToTier,
  tierLineLabel,
  type EstimatorTierHint,
} from '@/lib/pricing-estimator';
import { usePricingLeadOptional } from '@/components/pricing/pricing-lead-context';
import type { PricingModalTier } from '@/components/pricing/pricing-lead-context';

const sans = { fontFamily: 'var(--font-pricing-sans, system-ui), sans-serif' } as const;
const mono = { fontFamily: 'var(--font-pricing-mono, ui-monospace), monospace' } as const;

const SITE_TYPES = [
  'Brochure / Info Site',
  'Lead Gen Site',
  'E-commerce Store',
  'Membership / Portal',
  'Custom Platform',
] as const;

const PAGE_OPTS = ['1–5 Pages', '6–10 Pages', '10–20 Pages', '20+ Pages'] as const;

const FEATURE_OPTS = [
  'CMS / Blog',
  'Booking System',
  'Payment Processing',
  'Custom Animations',
  'CRM Integration',
  'SEO Setup',
  'Multiple Languages',
  'Member Login',
] as const;

const TIMELINE_OPTS = [
  'ASAP (rush fee applies)',
  '4–6 Weeks',
  '2–3 Months',
  'Flexible',
] as const;

function formatMoney(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function hintToModalTier(h: EstimatorTierHint): PricingModalTier {
  return h;
}

function Pill({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-left text-[11px] font-medium uppercase tracking-wide transition-colors duration-150 ${
        selected ? 'bg-[#E8480C] text-white' : 'bg-[#f4f4f4] text-[#888] hover:bg-[#eaeaea]'
      }`}
      style={mono}
    >
      {children}
    </button>
  );
}

interface ProjectCostEstimatorProps {
  expanded: boolean;
}

export function ProjectCostEstimator({ expanded }: ProjectCostEstimatorProps) {
  const lead = usePricingLeadOptional();
  const [siteType, setSiteType] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);

  const range = useMemo(
    () => computeEstimateRange(siteType, pageCount, features, timeline),
    [siteType, pageCount, features, timeline],
  );

  const tierHint = useMemo(() => {
    if (!range) return null;
    return mapMidpointToTier((range.min + range.max) / 2);
  }, [range]);

  const toggleFeature = (f: string) => {
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const openQuote = () => {
    if (tierHint && lead) {
      lead.openModal(hintToModalTier(tierHint));
    } else if (lead) {
      lead.openModal('custom');
    }
  };

  return (
    <div
      className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      style={{ maxHeight: expanded ? 6000 : 0 }}
    >
      <div className="pb-8 pt-8 md:pt-12">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#E8480C]" style={mono}>
          / PROJECT ESTIMATOR
        </p>
        <h3 className="mb-2 text-center text-[28px] font-bold text-[#111]" style={sans}>
          Get a ballpark in 60 seconds.
        </h3>
        <p className="mx-auto mb-10 max-w-xl text-center text-[13px] text-[#888]" style={mono}>
          Not a quote — just a starting point. Real pricing comes after your strategy call.
        </p>

        <div className="mx-auto mb-10 max-w-4xl space-y-8">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#111]" style={mono}>
              What type of site?
            </p>
            <div className="flex flex-wrap gap-2">
              {SITE_TYPES.map((s) => (
                <Pill key={s} selected={siteType === s} onClick={() => setSiteType(siteType === s ? null : s)}>
                  {s}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#111]" style={mono}>
              How many pages?
            </p>
            <div className="flex flex-wrap gap-2">
              {PAGE_OPTS.map((p) => (
                <Pill key={p} selected={pageCount === p} onClick={() => setPageCount(pageCount === p ? null : p)}>
                  {p}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#111]" style={mono}>
              What features do you need?
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURE_OPTS.map((f) => (
                <Pill key={f} selected={features.includes(f)} onClick={() => toggleFeature(f)}>
                  {f}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#111]" style={mono}>
              Timeline?
            </p>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTS.map((t) => (
                <Pill key={t} selected={timeline === t} onClick={() => setTimeline(timeline === t ? null : t)}>
                  {t}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-xl rounded-2xl border border-[#e8e8e8] bg-white p-6">
          {!siteType ? (
            <p className="text-center text-[13px] text-[#aaa]" style={mono}>
              Select your project type above to see an estimate.
            </p>
          ) : range ? (
            <>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#E8480C]" style={mono}>
                / YOUR ESTIMATE
              </p>
              <p className="mb-2 text-[42px] font-bold leading-none tracking-tight text-[#111]" style={sans}>
                {formatMoney(range.min)} – {formatMoney(range.max)}
              </p>
              {tierHint && (
                <p className="mb-3 text-[12px] text-[#E8480C]" style={mono}>
                  → This typically falls within our {tierLineLabel(tierHint)} tier
                </p>
              )}
              <p className="mb-6 text-[12px] text-[#888]" style={mono}>
                Based on your selections. Final pricing confirmed after your strategy call.
              </p>
              {lead ? (
                <CTAButton
                  variant="pricing"
                  text="GET AN EXACT QUOTE →"
                  as="button"
                  type="button"
                  fullWidth
                  onClick={openQuote}
                />
              ) : (
                <CTAButton variant="pricing" text="GET AN EXACT QUOTE →" as="a" href="/contact" fullWidth />
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
