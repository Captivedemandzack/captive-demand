'use client';

import { useState } from 'react';

import { Check } from 'lucide-react';

import { CTAButton } from '@/components/ui/CTAButton';
import { trackGa4Event } from '@/lib/analytics';
import {
  SITE_FORM_INPUT_CLASS,
  SITE_FORM_LABEL_CLASS,
  SITE_MARKETING_WHITE_SHADOW,
  siteMarketingWhiteCardClassName,
} from '@/lib/site-surfaces';
import { cn } from '@/lib/utils';

export function ShorePartnershipLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    portco: '',
    message: '',
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
          source: 'shore_partnership',
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          businessName: form.portco.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      trackGa4Event('generate_lead', {
        lead_source: 'shore_partnership_page',
        form_name: 'shore_partnership',
      });
      setSubmitted(true);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(siteMarketingWhiteCardClassName('p-10 text-center'))}
        style={SITE_MARKETING_WHITE_SHADOW}
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#E8480C]/10">
          <Check className="size-7 text-[#E8480C]" strokeWidth={2} aria-hidden />
        </div>
        <h3 className="mt-6 font-sans text-[20px] font-bold text-[#111]">
          Got it. Spencer will pick this up directly.
        </h3>
        <p className="mx-auto mt-4 max-w-md font-mono text-sm text-[#666]">
          We never sell your info. Your submission goes straight to Spencer&apos;s desk for a personal reply.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#999]">
          Typical reply within the same business day
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(siteMarketingWhiteCardClassName('p-8 md:p-10'))}
      style={SITE_MARKETING_WHITE_SHADOW}
    >
      <div className="sr-only" aria-live="polite">
        {status === 'error' ? 'Something went wrong. Try again or email hello@captivedemand.com.' : ''}
      </div>

      <form onSubmit={handleSubmit}>
        <label className="hidden">
          Don&apos;t fill this out
          <input
            tabIndex={-1}
            autoComplete="off"
            name="company_site"
            value={form.trap}
            onChange={(e) => setForm((f) => ({ ...f, trap: e.target.value }))}
            className="hidden"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1">
            <label htmlFor="shore-name" className={SITE_FORM_LABEL_CLASS}>
              Your name
            </label>
            <input
              id="shore-name"
              required
              name="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className={`${SITE_FORM_INPUT_CLASS} mt-2`}
              placeholder="Jordan Rivera"
            />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="shore-email" className={SITE_FORM_LABEL_CLASS}>
              Work email
            </label>
            <input
              id="shore-email"
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`${SITE_FORM_INPUT_CLASS} mt-2`}
              placeholder="you@portco.com"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="shore-portco" className={SITE_FORM_LABEL_CLASS}>
              Portfolio company
            </label>
            <input
              id="shore-portco"
              required
              name="businessName"
              value={form.portco}
              onChange={(e) => setForm((f) => ({ ...f, portco: e.target.value }))}
              className={`${SITE_FORM_INPUT_CLASS} mt-2`}
              placeholder="e.g., Empower Aesthetics"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="shore-msg" className={SITE_FORM_LABEL_CLASS}>
              What should we know before we respond?
            </label>
            <textarea
              id="shore-msg"
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${SITE_FORM_INPUT_CLASS} mt-2 resize-y`}
              placeholder="Timeline, scope hypotheses, internal stakeholders."
            />
          </div>
        </div>

        {status === 'error' ? (
          <p className="mt-4 text-sm text-red-700" role="alert">
            We could not send that right away. Email{' '}
            <a className="underline underline-offset-2" href="mailto:hello@captivedemand.com">
              hello@captivedemand.com
            </a>{' '}
            and we will respond from Spencer&apos;s desk.
          </p>
        ) : null}

        <div className="pt-6">
          <CTAButton
            variant="dark"
            text={status === 'submitting' ? 'SENDING...' : 'START CONVERSATION'}
            as="button"
            type="submit"
            disabled={status === 'submitting'}
            fullWidth
            ariaLabel="Submit Shore partnership inquiry"
          />
        </div>

        <p className="mt-4 font-mono text-[11px] text-[#999]">
          We never sell your info. Your submission goes straight to Spencer&apos;s desk for a personal reply.
        </p>
      </form>
    </div>
  );
}
