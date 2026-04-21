'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Calendar,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock,
    Lock,
    Minus,
    RefreshCw,
    Repeat,
    ShieldCheck,
    Sparkles,
    Star,
    X,
    Zap,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
 * CalSync product page — SaaS styling
 * Drops the parent Captive Demand marketing-agency tokens
 * (Nohemi display, mono eyebrows, NoiseOverlay, decorative rules)
 * in favor of a clean Inter + slate + blue-600 SaaS system.
 *
 * Palette mirrors calsync.party:
 *   primary       #2563eb (blue-600)
 *   primary deep  #1d4ed8 (blue-700)
 *   primary tint  #eff6ff (blue-50), #dbeafe (blue-100)
 *   ink           #0f172a (slate-900)
 *   body          #475569 (slate-600)
 *   mute          #94a3b8 (slate-400)
 *   hairline      #e2e8f0 (slate-200)
 *   surface       #ffffff, #f8fafc (slate-50)
 *   rating        #f59e0b (amber-500)
 * ────────────────────────────────────────────────────────────── */

const SIGN_UP_URL =
    'https://www.calsync.party/sign-up?utm_source=captivedemand&utm_medium=organic&utm_campaign=products-calsync';
const SIGN_IN_URL =
    'https://www.calsync.party/sign-in?utm_source=captivedemand&utm_medium=organic&utm_campaign=products-calsync';

/* ── Primary CTA — solid blue, rounded-lg, subtle shadow ───────────── */
function PrimaryCTA({
    href = SIGN_UP_URL,
    children,
    size = 'md',
    external = true,
    className = '',
}: {
    href?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    external?: boolean;
    className?: string;
}) {
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-[15px]',
        lg: 'px-7 py-3.5 text-[15px]',
    };
    const commonClasses = `group inline-flex items-center gap-2 rounded-lg bg-blue-600 font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 ${sizes[size]} ${className}`;

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                <span>{children}</span>
                <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
        );
    }
    return (
        <Link href={href} className={commonClasses}>
            <span>{children}</span>
            <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
    );
}

/* ── Small section label (SaaS-style, replaces mono eyebrow) ────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[12px] font-medium uppercase tracking-wider text-blue-700">
            {children}
        </span>
    );
}

/* ── Google Calendar-style icon (inline, no asset dependency) ───────── */
function GCalIcon({ size = 56 }: { size?: number }) {
    return (
        <div
            className="relative flex items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            style={{ width: size, height: size }}
        >
            <div className="absolute top-0 left-0 right-0 h-[14%] bg-blue-500" />
            <span
                className="relative text-blue-600 font-semibold font-sans"
                style={{ fontSize: size * 0.36, marginTop: size * 0.04 }}
            >
                31
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 1. HERO
 * ────────────────────────────────────────────────────────────── */
function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-white pt-32 pb-16 md:pt-44 md:pb-24">
            {/* Soft blue ambient wash */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[780px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Two-calendar merge visual (inline) */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex items-center gap-3 md:gap-5"
                    >
                        <GCalIcon />
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/30">
                            <RefreshCw size={18} strokeWidth={2.25} className="text-white" />
                        </div>
                        <GCalIcon />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-4xl font-sans text-[40px] font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-[64px]"
                    >
                        How to Merge Google Calendars
                        <br />
                        <span className="text-slate-400">Without the Manual Work</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-600 md:text-lg"
                    >
                        CalSync automatically copies events between Google Workspace calendars every 5 minutes —
                        so your clients always see your real availability.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 flex flex-col items-center gap-3"
                    >
                        <PrimaryCTA size="lg">Start Your Free Trial</PrimaryCTA>
                        <p className="text-sm text-slate-500">
                            3-day free trial, then $2.99/month. Cancel anytime.
                        </p>
                    </motion.div>

                    <motion.ul
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="mt-10 flex flex-col items-center gap-3 text-[14px] text-slate-600 md:flex-row md:gap-8"
                    >
                        {[
                            { icon: Clock, label: 'Set up in under 2 minutes' },
                            { icon: Calendar, label: 'Works with any Google Workspace' },
                            { icon: Check, label: 'No credit card required' },
                        ].map(({ icon: Icon, label }) => (
                            <li key={label} className="flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                                    <Icon size={12} strokeWidth={2.5} className="text-blue-600" />
                                </span>
                                <span>{label}</span>
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 2. HOW IT WORKS
 * ────────────────────────────────────────────────────────────── */
const howItWorks = [
    {
        n: '1',
        icon: Calendar,
        title: 'Connect Your Calendars',
        body: 'Sign in with Google and link any Workspace or personal Gmail accounts you want to sync. Secure OAuth, minimal permissions, no email access.',
    },
    {
        n: '2',
        icon: Repeat,
        title: 'Set Up a Merge',
        body: 'Pick a source and destination calendar. Choose busy-only blocks or full event details to protect client info. Hit publish.',
    },
    {
        n: '3',
        icon: RefreshCw,
        title: 'Never Double-Book Again',
        body: 'CalSync syncs every 5 minutes. New meetings, updates, and cancellations all stay in sync — across every account.',
    },
];

function HowItWorksSection() {
    return (
        <section className="w-full bg-slate-50 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>How It Works</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        Get up and running in under 2 minutes.
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                    {howItWorks.map(({ n, icon: Icon, title, body }, i) => (
                        <div key={n} className="relative flex flex-col items-center text-center">
                            {/* Connecting dashed line (desktop only, between cards) */}
                            {i < howItWorks.length - 1 && (
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute left-[calc(50%+44px)] right-[calc(-50%+44px)] top-[22px] hidden h-px border-t border-dashed border-slate-300 md:block"
                                />
                            )}

                            <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[15px] font-semibold text-white shadow-md shadow-blue-600/25">
                                {n}
                            </div>
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-inset ring-blue-100">
                                <Icon size={20} strokeWidth={1.75} className="text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-sans text-lg font-semibold text-slate-900">{title}</h3>
                            <p className="max-w-xs text-[15px] leading-relaxed text-slate-600">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 3. FEATURES
 * ────────────────────────────────────────────────────────────── */
const features = [
    { icon: RefreshCw, title: 'Automatic Sync', body: 'Events copy every 5 minutes. Updates and cancellations sync too.' },
    { icon: Lock, title: 'Privacy Controls', body: 'Choose busy-only blocks or full event details per merge.' },
    { icon: Repeat, title: 'Unlimited Merges', body: 'Connect as many calendars and create as many sync rules as you need.' },
    { icon: Sparkles, title: 'Loop Prevention', body: 'Smart detection prevents duplicate event chains across synced calendars.' },
    { icon: Zap, title: '2-Minute Setup', body: 'Connect accounts, pick calendars, publish. No technical configuration.' },
    { icon: ShieldCheck, title: 'Secure by Design', body: 'OAuth with minimal scopes. Tokens encrypted at rest with AES-256-GCM.' },
];

function FeaturesSection() {
    return (
        <section className="w-full bg-white py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>Features</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        Everything you need to stay in sync.
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map(({ icon: Icon, title, body }) => (
                        <div
                            key={title}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
                        >
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-inset ring-blue-100">
                                <Icon size={20} strokeWidth={1.75} className="text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-sans text-[17px] font-semibold text-slate-900">{title}</h3>
                            <p className="text-[14.5px] leading-relaxed text-slate-600">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 4. MID CTA BAND
 * ────────────────────────────────────────────────────────────── */
function MidCTABand() {
    return (
        <section className="w-full bg-slate-50 py-16 md:py-20">
            <div className="mx-auto max-w-4xl px-4 md:px-8">
                <div
                    className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white px-8 py-12 text-center md:px-16 md:py-16"
                    style={{
                        boxShadow: '0 10px 40px -12px rgba(37,99,235,0.2)',
                    }}
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-32 left-1/2 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
                    />
                    <div className="relative">
                        <h2 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[40px] md:leading-[1.1]">
                            Ready to stop double-booking?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 md:text-base">
                            Join freelancers and agency operators who trust CalSync to keep their Google Calendars in
                            sync. Setup takes less than two minutes.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <PrimaryCTA size="lg">Start Free Trial</PrimaryCTA>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 5. WHY CALSYNC — alternatives that fall short
 * ────────────────────────────────────────────────────────────── */
const alternatives = [
    {
        title: 'Overlaying calendars side-by-side',
        body: 'You can see conflicts, but others can\u2019t. Clients and coworkers still book over you.',
    },
    {
        title: 'Manually blocking time',
        body: 'Tedious, error-prone, and easy to forget — especially when meetings change or get cancelled.',
    },
    {
        title: 'Scheduling tools like Calendly',
        body: 'Great for external bookings, but they don\u2019t sync your internal calendars with each other.',
    },
    {
        title: 'Zapier / Make automations',
        body: 'Complex to set up, fragile, and often cost more per month than CalSync.',
    },
];

function WhyCalSyncSection() {
    return (
        <section className="w-full bg-white py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>Why CalSync</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        You&rsquo;ve probably tried other workarounds.
                    </h2>
                    <p className="mt-4 text-[15px] text-slate-600 md:text-base">
                        Here&rsquo;s why they fall short.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {alternatives.map((a) => (
                        <div
                            key={a.title}
                            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50 ring-1 ring-inset ring-red-100">
                                <X size={16} strokeWidth={2.25} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="mb-1.5 font-sans text-[16px] font-semibold text-slate-900">
                                    {a.title}
                                </h3>
                                <p className="text-[14.5px] leading-relaxed text-slate-600">{a.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] text-slate-600 md:text-base">
                    CalSync is purpose-built for this one job: keeping your Google Calendars in sync,
                    automatically.
                </p>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 6. MANUAL METHODS + COMPARISON TABLE (SEO value-add)
 * ────────────────────────────────────────────────────────────── */
const manualMethods = [
    {
        num: '01',
        title: 'Export & Import (ICS File)',
        body: 'Export an ICS file from one calendar and import it into another. Works as a one-time snapshot — uselessly fragile as an ongoing workflow. Re-imports create duplicates, and the file tops out around 2,500 events.',
        limit: 'No ongoing sync · creates duplicates on re-import',
    },
    {
        num: '02',
        title: 'Share a Calendar Between Accounts',
        body: 'Grant another account view permission on your calendar. It\u2019s an overlay in your own UI — the events never actually exist on the destination calendar, so external viewers still see you as free.',
        limit: 'View-only overlay · doesn\u2019t block time for others',
    },
    {
        num: '03',
        title: 'Subscribe via URL (ICS link)',
        body: 'Add a calendar as a read-only subscription. Updates run on Google\u2019s refresh schedule (12–24 hours), not yours. No two-way sync, no way to speed it up.',
        limit: 'Read-only · 12–24 hour refresh lag',
    },
];

const comparisonRows = [
    { feature: 'Ongoing sync', ics: 'No', share: 'View only', url: 'Read only (12–24hr delay)', calsync: 'Every 5 min' },
    { feature: 'Events on both calendars', ics: 'One-time copy', share: 'No', url: 'No', calsync: 'Yes' },
    { feature: 'Blocks time on destination', ics: 'No', share: 'No', url: 'No', calsync: 'Yes' },
    { feature: 'Privacy controls', ics: 'None', share: 'Permission levels', url: 'None', calsync: 'Busy-only or full details' },
    { feature: 'Setup time', ics: '5–10 min', share: '5 min', url: '5 min', calsync: 'Under 2 min' },
    { feature: 'Cost', ics: 'Free', share: 'Free', url: 'Free', calsync: '$2.99/mo' },
];

function ComparisonSection() {
    return (
        <section className="w-full bg-slate-50 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>Manual Methods</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        3 ways to merge Google Calendars manually.
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-600 md:text-base">
                        Every ranking how-to article recommends these. We&rsquo;re showing you the limits.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {manualMethods.map((m) => (
                        <article
                            key={m.num}
                            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                                    Method {m.num}
                                </span>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                                    <Minus size={14} strokeWidth={2.25} className="text-red-500" />
                                </div>
                            </div>
                            <h3 className="mb-3 font-sans text-[17px] font-semibold text-slate-900">{m.title}</h3>
                            <p className="flex-1 text-[14.5px] leading-relaxed text-slate-600">{m.body}</p>
                            <div className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-4 text-[12.5px] text-slate-500">
                                <span className="font-semibold text-red-600">Limit</span>
                                <span>— {m.limit}</span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Comparison table */}
                <div className="mt-14">
                    <h3 className="mb-6 text-center font-sans text-xl font-semibold text-slate-900 md:text-2xl">
                        Side-by-side comparison
                    </h3>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full min-w-[720px] border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                                    <th className="px-5 py-4 font-semibold">Feature</th>
                                    <th className="px-5 py-4 font-semibold">ICS Import</th>
                                    <th className="px-5 py-4 font-semibold">Calendar Sharing</th>
                                    <th className="px-5 py-4 font-semibold">URL Subscription</th>
                                    <th className="bg-blue-600 px-5 py-4 font-semibold text-white">CalSync</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, i) => (
                                    <tr
                                        key={row.feature}
                                        className={i === comparisonRows.length - 1 ? '' : 'border-b border-slate-100'}
                                    >
                                        <td className="px-5 py-4 text-[14px] font-medium text-slate-900">{row.feature}</td>
                                        <td className="px-5 py-4 text-[14px] text-slate-600">{row.ics}</td>
                                        <td className="px-5 py-4 text-[14px] text-slate-600">{row.share}</td>
                                        <td className="px-5 py-4 text-[14px] text-slate-600">{row.url}</td>
                                        <td className="bg-blue-50 px-5 py-4 text-[14px] font-semibold text-blue-700">
                                            {row.calsync}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 7. TESTIMONIALS
 * ────────────────────────────────────────────────────────────── */
const testimonials = [
    {
        quote: 'I manage 4 Google Workspace accounts for different clients. CalSync is the only thing that keeps me from double-booking every week.',
        name: 'Sarah K.',
        role: 'Freelance Marketing Consultant',
    },
    {
        quote: 'Setup took me about 90 seconds. Wish I\u2019d found this years ago instead of manually blocking time across calendars.',
        name: 'Marcus T.',
        role: 'Independent Software Contractor',
    },
    {
        quote: 'The privacy mode is perfect — my clients can see I\u2019m busy without seeing each other\u2019s meeting details. Exactly what I needed.',
        name: 'Jennifer L.',
        role: 'Freelance Design Director',
    },
];

function TestimonialsSection() {
    return (
        <section className="w-full bg-white py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>Social Proof</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        Trusted by freelancers everywhere.
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <motion.figure
                            key={t.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, margin: '-80px' }}
                            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 md:p-7"
                        >
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" strokeWidth={0} />
                                ))}
                            </div>
                            <blockquote className="text-[15px] leading-relaxed text-slate-700">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <figcaption className="mt-auto border-t border-slate-100 pt-4">
                                <div className="font-sans text-[14px] font-semibold text-slate-900">{t.name}</div>
                                <div className="mt-0.5 text-[13px] text-slate-500">{t.role}</div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 8. PRICING
 * ────────────────────────────────────────────────────────────── */
function PricingSection() {
    const included = [
        'Unlimited merges',
        'Unlimited calendar connections',
        'Auto-sync every 5 minutes',
        'Privacy controls (busy-only or full details)',
        'Loop prevention',
        'Cancel anytime',
    ];

    return (
        <section className="w-full bg-slate-50 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>Pricing</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        Simple pricing.
                    </h2>
                    <p className="mt-4 text-[15px] text-slate-600 md:text-base">Try before you buy. Cancel anytime.</p>
                </div>

                <div className="mx-auto mt-12 max-w-md">
                    <div
                        className="relative overflow-hidden rounded-3xl border-2 border-blue-600 bg-white p-8"
                        style={{
                            boxShadow: '0 20px 60px -20px rgba(37,99,235,0.35)',
                        }}
                    >
                        {/* Ribbon */}
                        <div className="absolute right-0 top-0 rounded-bl-xl bg-blue-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                            Most Popular
                        </div>

                        <div className="mb-6 flex items-baseline gap-2">
                            <span className="font-sans text-[64px] font-semibold leading-none tracking-tight text-slate-900">
                                $2.99
                            </span>
                            <span className="text-[15px] text-slate-500">/ month</span>
                        </div>

                        <p className="mb-8 text-[14.5px] leading-relaxed text-slate-600">
                            3-day free trial with full functionality. No credit card required to start.
                        </p>

                        <ul className="mb-8 flex flex-col gap-3">
                            {included.map((line) => (
                                <li key={line} className="flex items-center gap-3 text-[14.5px] text-slate-700">
                                    <CheckCircle2 size={18} strokeWidth={2} className="flex-shrink-0 text-blue-600" />
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>

                        <PrimaryCTA size="md" className="w-full justify-center">
                            Start 3-Day Free Trial
                        </PrimaryCTA>

                        <p className="mt-4 text-center text-[12.5px] text-slate-500">
                            No long-term contracts. Cancel in one click.
                        </p>
                    </div>

                    <p className="mt-6 text-center text-[13px] text-slate-500">
                        Already have an account?{' '}
                        <a
                            href={SIGN_IN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 9. LONG-FORM SEO CONTENT
 *    Captures the "informational intent" layer per spec Section 2.
 * ────────────────────────────────────────────────────────────── */
const longFormStats = [
    { value: '5 min', label: 'Sync interval' },
    { value: '$2.99', label: 'Flat monthly price' },
    { value: 'AES-256', label: 'Encrypted at rest' },
    { value: 'Unlimited', label: 'Merges & calendars' },
];

const longFormSections = [
    { num: '01', title: 'The multi-Workspace problem' },
    { num: '02', title: 'Why Google can\u2019t merge calendars natively' },
    { num: '03', title: 'How CalSync merges your calendars' },
    { num: '04', title: 'Set it, and never double-book again' },
];

function LongFormSEOSection() {
    return (
        <section className="w-full bg-white py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionLabel>The Full Story</SectionLabel>
                    <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.08]">
                        Merge Google Calendars Automatically
                    </h2>
                    <p className="mt-5 text-[16px] leading-relaxed text-slate-600 md:text-[17px]">
                        Why Google&rsquo;s native options fall short for freelancers juggling multiple Workspaces —
                        and how CalSync closes the gap in five-minute increments.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white md:mt-14 md:grid-cols-4">
                    {longFormStats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex flex-col gap-1 px-5 py-6 md:px-6 md:py-7 ${i !== longFormStats.length - 1 ? 'md:border-r md:border-slate-200' : ''
                                } ${i < 2 ? 'border-b border-slate-200 md:border-b-0' : ''} ${i === 0 ? 'border-r border-slate-200' : ''
                                } ${i === 2 ? 'border-r border-slate-200 md:border-r md:border-slate-200' : ''}`}
                        >
                            <span className="font-sans text-2xl font-semibold tracking-tight text-blue-600 md:text-[28px]">
                                {s.value}
                            </span>
                            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12 lg:gap-16">
                    <aside className="md:col-span-4 md:sticky md:top-28 md:self-start">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                In this section
                            </div>
                            <ol className="mt-4 flex flex-col gap-3">
                                {longFormSections.map((s) => (
                                    <li key={s.num} className="flex items-start gap-3">
                                        <span className="mt-0.5 font-mono text-[11px] font-semibold tracking-wider text-blue-600">
                                            {s.num}
                                        </span>
                                        <span className="text-[14px] leading-snug text-slate-700">{s.title}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <Link
                            href="/insights"
                            className="group mt-4 block rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
                        >
                            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                Further reading
                            </div>
                            <div className="mt-3 flex items-start justify-between gap-3">
                                <span className="text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-blue-700">
                                    Our guide to agency calendar management
                                </span>
                                <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    className="mt-1 flex-shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-600"
                                />
                            </div>
                            <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                                A deeper dive into how we run shared calendars across client Workspaces.
                            </p>
                        </Link>
                    </aside>

                    <article className="md:col-span-8">
                        <div className="flex flex-col gap-12">
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-600">
                                        01
                                    </span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <h3 className="font-sans text-[22px] font-semibold tracking-tight text-slate-900 md:text-[24px]">
                                    The multi-Workspace problem
                                </h3>
                                <p className="mt-4 text-[15.5px] leading-[1.75] text-slate-700">
                                    Freelancers and contractors who work with multiple clients often manage separate
                                    Google Workspace accounts for each one. The problem: when you accept a meeting on
                                    one calendar, your other calendars have no idea you&rsquo;re busy. That leads to
                                    double-bookings, awkward rescheduling, and clients who start to question your
                                    professionalism.
                                </p>
                            </div>

                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-600">
                                        02
                                    </span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <h3 className="font-sans text-[22px] font-semibold tracking-tight text-slate-900 md:text-[24px]">
                                    Why Google can&rsquo;t merge calendars natively
                                </h3>
                                <p className="mt-4 text-[15.5px] leading-[1.75] text-slate-700">
                                    Google doesn&rsquo;t offer a built-in way to merge calendars across different
                                    accounts. You can view multiple calendars side by side, but that doesn&rsquo;t
                                    block time or sync events between them. And there&rsquo;s no native option to
                                    automatically copy events from one Google Calendar to another.
                                </p>
                            </div>

                            <blockquote className="relative rounded-r-lg border-l-4 border-blue-600 bg-blue-50/60 py-6 pl-6 pr-5 md:py-7 md:pl-8 md:pr-6">
                                <p className="font-sans text-[18px] font-medium leading-[1.5] text-slate-900 md:text-[20px]">
                                    If you&rsquo;ve been searching for{' '}
                                    <em className="not-italic text-blue-700">how to merge Google Calendars</em>{' '}
                                    without resorting to a manual export-import cycle — this is the gap CalSync was
                                    built to close.
                                </p>
                            </blockquote>

                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-600">
                                        03
                                    </span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <h3 className="font-sans text-[22px] font-semibold tracking-tight text-slate-900 md:text-[24px]">
                                    How CalSync merges your calendars
                                </h3>
                                <p className="mt-4 text-[15.5px] leading-[1.75] text-slate-700">
                                    CalSync connects all of your Google Calendar accounts and automatically copies
                                    events from one calendar to another every five minutes. When a new meeting lands
                                    on your Client A calendar, it instantly appears as a blocked time slot on your
                                    Client B calendar — and vice versa. You choose whether to copy full event details
                                    or just mark the time as &ldquo;Unavailable&rdquo; to keep client information
                                    private.
                                </p>
                            </div>

                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-600">
                                        04
                                    </span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>
                                <h3 className="font-sans text-[22px] font-semibold tracking-tight text-slate-900 md:text-[24px]">
                                    Set it, and never double-book again
                                </h3>
                                <p className="mt-4 text-[15.5px] leading-[1.75] text-slate-700">
                                    No manual copying. No browser extensions. No forgetting to check your other
                                    calendar before accepting a meeting. Just connect your accounts, set up a merge,
                                    and CalSync handles the rest — with AES-256-GCM encrypted token storage and
                                    calendar-event-only permissions so your data stays private.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 10. FAQ
 * ────────────────────────────────────────────────────────────── */
const faqs = [
    { q: 'Does CalSync work with personal Gmail accounts or only Google Workspace?', a: 'CalSync works with any Google account — personal Gmail and Google Workspace alike.' },
    { q: 'Is my calendar data secure?', a: 'Yes. CalSync uses OAuth for authentication with minimal permission scopes (calendar events only — no email access). All tokens are encrypted at rest using AES-256-GCM.' },
    { q: 'How often do events sync?', a: 'Every 5 minutes. When an event is created, updated, or cancelled on your source calendar, CalSync reflects the change on the destination within the next sync cycle.' },
    { q: 'Can I sync more than two calendars?', a: 'Yes. You can create unlimited merges between any combination of connected calendars.' },
    { q: 'What if I cancel — do the copied events disappear?', a: 'No. Events that have already been copied remain on the destination calendar. New events will stop syncing.' },
    { q: 'Does CalSync support Outlook or Apple Calendar?', a: 'Not yet — Google Calendar only for now. Outlook and Apple Calendar support is on the roadmap.' },
    { q: 'What happens after the free trial?', a: 'After 3 days, your subscription begins at $2.99/month. You can cancel anytime before the trial ends and you won\u2019t be charged.' },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-slate-50 py-20 md:py-28">
            <div className="mx-auto max-w-3xl px-4 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 md:text-[44px] md:leading-[1.1]">
                        Frequently asked questions.
                    </h2>
                </div>

                <div className="mt-12 flex flex-col gap-3">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={item.q}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left md:px-6 md:py-5"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-sans text-[15.5px] font-semibold text-slate-900 md:text-base">
                                        {item.q}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        strokeWidth={2}
                                        className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''
                                            }`}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="border-t border-slate-100 px-5 py-4 text-[14.5px] leading-relaxed text-slate-600 md:px-6 md:py-5">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * 11. FINAL CTA — dark band for visual anchor
 * ────────────────────────────────────────────────────────────── */
function FinalCTASection() {
    return (
        <section className="relative w-full overflow-hidden bg-slate-900 py-20 md:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[500px] w-[800px] -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
                <h2 className="font-sans text-3xl font-semibold tracking-tight text-white md:text-[44px] md:leading-[1.1]">
                    Ready to stop double-booking?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-300 md:text-base">
                    Stop flipping between browser profiles and hoping you didn&rsquo;t miss a conflict. CalSync
                    merges your Google Calendars automatically so every account reflects your real availability.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3">
                    <PrimaryCTA size="lg">Start Your Free Trial — $2.99/mo</PrimaryCTA>
                    <p className="text-[13px] text-slate-400">Set up in under 2 minutes · Cancel anytime</p>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
 * Page composition
 * ────────────────────────────────────────────────────────────── */
export function CalSyncPage() {
    return (
        <div className="w-full bg-white font-sans text-slate-900 antialiased">
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <MidCTABand />
            <WhyCalSyncSection />
            <ComparisonSection />
            <TestimonialsSection />
            <PricingSection />
            <LongFormSEOSection />
            <FAQSection />
            <FinalCTASection />
        </div>
    );
}
