'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { BookingCalendarShell } from '@/components/booking/BookingCalendarShell';
import { CTAButton } from '@/components/ui/CTAButton';
import { usePricingLead } from '@/components/pricing/pricing-lead-context';
import { cn } from '@/lib/utils';
import {
  ANNUAL_COMPANY_REVENUE_OPTIONS,
  qualifiesForBookingCalendar,
  type AnnualCompanyRevenue,
} from '@/lib/annual-company-revenue';

const sans = { fontFamily: 'var(--font-pricing-sans), system-ui, sans-serif' } as const;
const mono = { fontFamily: 'var(--font-pricing-mono), ui-monospace, monospace' } as const;

const DEFAULT_BOOKING_CALENDAR_URL =
  'https://calendar.captivedemand.com/book-with-spencer-step-2-15-mins';

function resolveBookingCalendarUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL?.trim() ||
    (process.env.NEXT_PUBLIC_CALCOM_LINK?.trim().startsWith('http')
      ? process.env.NEXT_PUBLIC_CALCOM_LINK.trim()
      : '');
  if (fromEnv) {
    try {
      return new URL(fromEnv).toString();
    } catch {
      /* fall through */
    }
  }
  return DEFAULT_BOOKING_CALENDAR_URL;
}

const BOOKING_CALENDAR_URL = resolveBookingCalendarUrl();

const CAL_DISABLED = process.env.NEXT_PUBLIC_CALCOM_EMBED === 'false';

type ModalStep = 'form' | 'booking' | 'thanks';

export function PricingQualifyModal() {
  const { isOpen, closeModal } = usePricingLead();
  const shouldReduceMotion = useReducedMotion();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [step, setStep] = useState<ModalStep>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState<AnnualCompanyRevenue>('500k_1m');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: boolean;
    email?: boolean;
    businessName?: boolean;
    annualRevenue?: boolean;
  }>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep('form');
    setName('');
    setEmail('');
    setBusinessName('');
    setAnnualRevenue('500k_1m');
    setFieldErrors({});
    setSubmitError('');
    setSubmitting(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const inputClass = (err: boolean) =>
    `w-full rounded-lg border px-3.5 py-3 font-mono text-[13px] text-[#111] outline-none transition-colors ${
      err ? 'border-red-500 bg-[#fafafa]' : 'border-[#e0e0e0] bg-[#fafafa] focus:border-[#E8480C] focus:bg-white'
    }`;

  const validate = () => {
    const next: typeof fieldErrors = {};
    if (!name.trim()) next.name = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true;
    if (!businessName.trim()) next.businessName = true;
    if (!annualRevenue) next.annualRevenue = true;
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    const skipRecaptcha = process.env.NEXT_PUBLIC_SKIP_RECAPTCHA === 'true';
    const hasKey = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    let token = '';
    if (!skipRecaptcha && hasKey) {
      if (!executeRecaptcha) {
        setSubmitError('Security check is still loading. Try again in a moment.');
        return;
      }
      try {
        token = await executeRecaptcha('pricing_modal');
      } catch {
        setSubmitError('Something went wrong. Please try again.');
        return;
      }
      if (!token) {
        setSubmitError('Something went wrong. Please try again.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          businessName: businessName.trim(),
          annualCompanyRevenue: annualRevenue,
          recaptchaToken: token,
          source: 'pricing_modal',
        }),
      });
      if (!res.ok) {
        let message = 'Something went wrong. Please try again.';
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error === 'reCAPTCHA failed' || data.error === 'reCAPTCHA required') {
            message =
              'Security check failed. Confirm your reCAPTCHA keys in .env.local match this domain, then refresh and try again.';
          }
        } catch {
          /* keep generic message */
        }
        setSubmitError(message);
        return;
      }
      const data = (await res.json()) as { qualifiesForBooking?: boolean };
      const book =
        typeof data.qualifiesForBooking === 'boolean'
          ? data.qualifiesForBooking
          : qualifiesForBookingCalendar(annualRevenue);
      setStep(book ? 'booking' : 'thanks');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const overlay = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } };

  const card = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { type: 'spring' as const, duration: 0.45, bounce: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={closeModal}
          {...overlay}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pq-modal-title"
            className={cn(
              'relative w-full rounded-[24px] bg-white p-6 shadow-xl md:p-8',
              step === 'booking'
                ? 'flex max-h-[min(92vh,780px)] max-w-[min(96vw,640px)] flex-col overflow-hidden sm:max-w-[min(96vw,680px)]'
                : 'max-w-[520px]',
            )}
            onClick={(ev) => ev.stopPropagation()}
            {...card}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#111] hover:bg-[#f4f4f4]"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="pt-2">
                <h2 id="pq-modal-title" className="mb-2 text-[22px] font-bold text-[#111]" style={sans}>
                  Tell us about your project.
                </h2>
                <p className="mb-8 text-[13px] text-[#888]" style={mono}>
                  Takes 30 seconds. We use this to prep for your call.
                </p>

                <div className="mb-5">
                  <label htmlFor="pq-name" className="mb-2 block text-[10px] uppercase tracking-[0.1em] text-[#888]" style={mono}>
                    Full Name
                  </label>
                  <input
                    id="pq-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputClass(!!fieldErrors.name)}
                    style={mono}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-600" style={mono}>
                      Please enter your name.
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="pq-email" className="mb-2 block text-[10px] uppercase tracking-[0.1em] text-[#888]" style={mono}>
                    Work Email
                  </label>
                  <input
                    id="pq-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={inputClass(!!fieldErrors.email)}
                    style={mono}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-600" style={mono}>
                      Please enter a valid work email.
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="pq-business" className="mb-2 block text-[10px] uppercase tracking-[0.1em] text-[#888]" style={mono}>
                    Business Name
                  </label>
                  <input
                    id="pq-business"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    className={inputClass(!!fieldErrors.businessName)}
                    style={mono}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                  {fieldErrors.businessName && (
                    <p className="mt-1 text-xs text-red-600" style={mono}>
                      Please enter your business name.
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="pq-revenue" className="mb-2 block text-[10px] uppercase tracking-[0.1em] text-[#888]" style={mono}>
                    Annual Company Revenue
                  </label>
                  <select
                    id="pq-revenue"
                    className={inputClass(!!fieldErrors.annualRevenue)}
                    style={mono}
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(e.target.value as AnnualCompanyRevenue)}
                  >
                    {ANNUAL_COMPANY_REVENUE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {submitError && (
                  <p className="mb-4 text-sm text-red-600" style={mono}>
                    {submitError}
                  </p>
                )}

                <CTAButton
                  variant="pricing"
                  text="NEXT STEP →"
                  as="button"
                  type="submit"
                  fullWidth
                  disabled={submitting}
                />
              </form>
            ) : step === 'thanks' ? (
              <div className="pt-2">
                <h2 className="mb-4 text-[22px] font-bold text-[#111]" style={sans}>
                  Thank you for your interest!
                </h2>
                <p className="mb-8 text-[15px] leading-relaxed text-[#555]" style={mono}>
                  We&apos;ll review your details and be in touch.
                </p>
                <CTAButton variant="pricing" text="CLOSE" as="button" type="button" fullWidth onClick={closeModal} />
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col pt-2">
                <h2 className="mb-2 shrink-0 text-[22px] font-bold text-[#111]" style={sans}>
                  Pick a time that works.
                </h2>
                <p className="mb-4 shrink-0 text-[13px] text-[#888]" style={mono}>
                  15-minute intro call. No sales pitch — just a real conversation.
                </p>

                {CAL_DISABLED ? (
                  <p className="text-center text-[13px] text-[#888]" style={mono}>
                    Prefer to reach out directly?{' '}
                    <a href="mailto:hello@captivedemand.com" className="text-[#E8480C] underline-offset-2 hover:underline">
                      hello@captivedemand.com
                    </a>
                  </p>
                ) : (
                  <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                    <BookingCalendarShell durationMinutes={15} className="min-h-0 w-full">
                      <iframe
                        title="Book a call with Spencer"
                        src={BOOKING_CALENDAR_URL}
                        className="absolute inset-0 h-full w-full border-0 bg-white"
                        allow="camera; microphone; clipboard-write"
                      />
                    </BookingCalendarShell>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
