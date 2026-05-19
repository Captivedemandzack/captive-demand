'use client';

import { useState } from 'react';
import { Check, FileSearch, Gauge, Search, ShieldCheck } from 'lucide-react';

import { ShoreReveal } from '@/components/shore-partnership/ShoreReveal';
import { ShoreSectionHeader } from '@/components/shore-partnership/ShoreSectionHeader';
import { CTAButton } from '@/components/ui/CTAButton';
import { trackGa4Event } from '@/lib/analytics';
import {
  SITE_FORM_INPUT_CLASS,
  SITE_FORM_LABEL_CLASS,
  SITE_MARKETING_WHITE_SHADOW,
  siteMarketingWhiteCardClassName,
} from '@/lib/site-surfaces';
import { cn } from '@/lib/utils';

const SITE_COUNT_OPTIONS = [
  { value: '1', label: '1 site' },
  { value: '2-5', label: '2–5 sites' },
  { value: '6-11', label: '6–11 sites' },
  { value: '12+', label: '12+ sites' },
] as const;

function AuditReportPreview() {
  const rows = [
    { label: 'Core Web Vitals', score: 62, status: 'Needs work' },
    { label: 'SEO foundation', score: 71, status: 'Fair' },
    { label: 'AEO readiness', score: 48, status: 'Priority' },
    { label: 'Conversion UX', score: 58, status: 'Needs work' },
    { label: 'Tracking & CRM', score: 44, status: 'Priority' },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#1a1512]/8 bg-[#1a1512] p-6 text-white md:p-8"
      style={{
        boxShadow:
          'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.12)',
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff5501]">Sample audit excerpt</p>
          <p className="mt-2 text-lg tracking-tight" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
            Portfolio Site Health Report
          </p>
          <p className="mt-1 font-mono text-[11px] text-white/45">3 brands · Shore partner preview</p>
        </div>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
          Free for Shore
        </span>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/70">{row.label}</span>
              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-wider',
                  row.score < 55 ? 'text-[#ff5501]' : 'text-white/50',
                )}
              >
                {row.status}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff5501] to-[#ff7a2e]"
                style={{ width: `${row.score}%` }}
              />
            </div>
            <p className="mt-2 text-right font-mono text-[10px] tabular-nums text-white/40">{row.score}/100</p>
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 font-mono text-[11px] leading-relaxed text-white/55">
        <li className="flex gap-2">
          <Search className="mt-0.5 size-3.5 shrink-0 text-[#ff5501]" strokeWidth={1.5} aria-hidden />
          Technical SEO, schema, and indexation gaps
        </li>
        <li className="flex gap-2">
          <Gauge className="mt-0.5 size-3.5 shrink-0 text-[#ff5501]" strokeWidth={1.5} aria-hidden />
          Page speed, mobile UX, and conversion blockers
        </li>
        <li className="flex gap-2">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[#ff5501]" strokeWidth={1.5} aria-hidden />
          GA4, GTM, and CRM routing sanity check
        </li>
      </ul>
    </div>
  );
}

export function ShoreFreeAuditSection() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    portco: '',
    siteCount: '',
    siteUrls: '',
    trap: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.trap) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'shore_partnership_audit',
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          businessName: form.portco.trim(),
          siteCount: form.siteCount,
          message: form.siteUrls.trim(),
        }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      trackGa4Event('generate_lead', {
        lead_source: 'shore_partnership_audit',
        form_name: 'shore_free_audit',
      });
      setSubmitted(true);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="free-audit" className="relative bg-[#FAFAFA] px-container-px py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <ShoreReveal>
          <ShoreSectionHeader
            eyebrow="Shore exclusive"
            lead="Start with a free"
            accent="website audit."
            description="Complimentary for Shore portfolio partners only. Add every site you want reviewed and we will return a prioritized fix list, not a sales deck."
          />
        </ShoreReveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ShoreReveal delay={0.08}>
            <AuditReportPreview />
          </ShoreReveal>

          <ShoreReveal delay={0.12}>
            {submitted ? (
              <div
                className={cn(siteMarketingWhiteCardClassName('p-10 text-center'))}
                style={SITE_MARKETING_WHITE_SHADOW}
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#E8480C]/10">
                  <Check className="size-7 text-[#E8480C]" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-6 font-sans text-[20px] font-bold text-[#111]">Audit request received.</h3>
                <p className="mx-auto mt-4 max-w-md font-mono text-sm text-[#666]">
                  We will review each URL you listed and send a Shore-branded summary with ranked priorities.
                </p>
              </div>
            ) : (
              <div
                className={cn(siteMarketingWhiteCardClassName('p-8 md:p-10'))}
                style={SITE_MARKETING_WHITE_SHADOW}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#E8480C]/10">
                    <FileSearch className="size-5 text-[#E8480C]" strokeWidth={1.5} aria-hidden />
                  </span>
                  <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-[#1a1512]/60">
                    Free audit · Shore portfolio partners · multi-site intake
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <label className="hidden">
                    Leave blank
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.trap}
                      onChange={(e) => setForm((f) => ({ ...f, trap: e.target.value }))}
                      className="hidden"
                    />
                  </label>

                  <div className="grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="audit-name" className={SITE_FORM_LABEL_CLASS}>
                          Your name
                        </label>
                        <input
                          id="audit-name"
                          required
                          autoComplete="name"
                          value={form.fullName}
                          onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                          className={`${SITE_FORM_INPUT_CLASS} mt-2`}
                        />
                      </div>
                      <div>
                        <label htmlFor="audit-email" className={SITE_FORM_LABEL_CLASS}>
                          Work email
                        </label>
                        <input
                          id="audit-email"
                          required
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={`${SITE_FORM_INPUT_CLASS} mt-2`}
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="audit-portco" className={SITE_FORM_LABEL_CLASS}>
                          Portfolio company
                        </label>
                        <input
                          id="audit-portco"
                          required
                          value={form.portco}
                          onChange={(e) => setForm((f) => ({ ...f, portco: e.target.value }))}
                          className={`${SITE_FORM_INPUT_CLASS} mt-2`}
                        />
                      </div>
                      <div>
                        <label htmlFor="audit-site-count" className={SITE_FORM_LABEL_CLASS}>
                          Sites to audit
                        </label>
                        <select
                          id="audit-site-count"
                          required
                          value={form.siteCount}
                          onChange={(e) => setForm((f) => ({ ...f, siteCount: e.target.value }))}
                          className={`${SITE_FORM_INPUT_CLASS} mt-2`}
                        >
                          <option value="" disabled>
                            Select count
                          </option>
                          {SITE_COUNT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="audit-urls" className={SITE_FORM_LABEL_CLASS}>
                        Site URLs (one per line)
                      </label>
                      <textarea
                        id="audit-urls"
                        required
                        rows={4}
                        value={form.siteUrls}
                        onChange={(e) => setForm((f) => ({ ...f, siteUrls: e.target.value }))}
                        className={`${SITE_FORM_INPUT_CLASS} mt-2 resize-y`}
                        placeholder={'https://brand-one.com\nhttps://brand-two.com'}
                      />
                    </div>
                  </div>

                  {status === 'error' ? (
                    <p className="mt-4 text-sm text-red-700" role="alert">
                      Something went wrong. Email hello@captivedemand.com and we will queue your audit manually.
                    </p>
                  ) : null}

                  <div className="pt-6">
                    <CTAButton
                      variant="dark"
                      text={status === 'submitting' ? 'SUBMITTING...' : 'REQUEST FREE AUDIT'}
                      as="button"
                      type="submit"
                      disabled={status === 'submitting'}
                      fullWidth
                      ariaLabel="Request a free Shore partner website audit"
                    />
                  </div>
                </form>
              </div>
            )}
          </ShoreReveal>
        </div>
      </div>
    </section>
  );
}
