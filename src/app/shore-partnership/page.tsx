import Image from 'next/image';
import Link from 'next/link';
import { Clock, Instagram, LayoutGrid, Linkedin, MousePointerClick, Workflow } from 'lucide-react';

import { AskAiAboutFooter } from '@/components/layout/AskAiAboutFooter';
import { ShorePartnershipIntegrations } from '@/components/shore-partnership/ShorePartnershipIntegrations';
import { ShorePartnershipChrome } from '@/components/shore-partnership/ShorePartnershipChrome';
import { ShorePartnershipLeadForm } from '@/components/shore-partnership/ShorePartnershipLeadForm';
import { ShorePartnershipStatsBand } from '@/components/shore-partnership/ShorePartnershipStatsBand';
import { ShoreCaseStudyList } from '@/components/shore-partnership/ShoreCaseStudyList';
import { ShoreExitIntentModal } from '@/components/shore-partnership/ShoreExitIntentModal';
import { ShoreFreeAuditSection } from '@/components/shore-partnership/ShoreFreeAuditSection';
import { ShoreLiveChatFab } from '@/components/shore-partnership/ShoreLiveChatFab';
import { ShoreReveal } from '@/components/shore-partnership/ShoreReveal';
import { ShoreSectionHeader } from '@/components/shore-partnership/ShoreSectionHeader';
import { ShoreOperatingTabs } from '@/components/shore-partnership/ShoreOperatingTabs';
import { ShoreSeoAeoBand } from '@/components/shore-partnership/ShoreSeoAeoBand';
import { BentoGridSection } from '@/components/sections/BentoGridSection';
import { CTAButton } from '@/components/ui/CTAButton';
import { HeroAccentHighlight } from '@/components/ui/HeroAccentHighlight';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { shorePartnershipCaseStudies } from '@/data/shore-partnership-case-studies';
import {
  CAPTIVE_DEMAND_LOGO,
  playbookUrl,
  SHORE_LOGOMARK_URL,
  shorePartnershipBookingUrl,
} from '@/lib/shore-partnership';

import { createSeoMetadata } from '@/lib/site';
import { cn } from '@/lib/utils';

export const metadata = createSeoMetadata({
  title: 'Captive Demand × Shore Capital Partners',
  description:
    'How Captive Demand ships web and measurement work alongside Shore portfolio companies. Audit-first scoping, senior-led delivery, and timelines sponsors recognize.',
  path: '/shore-partnership',
  robots: { index: false, follow: true },
});

const operatingTabs = [
  {
    id: '01',
    shortLabel: 'Site audit before scoping',
    headline:
      'Diagnose first. Scope what is worth doing before budget commits to the wrong problem.',
    body:
      'Before we propose anything, we audit what is actually live. Tracking. CRM. Content. SEO footprint. Most agencies pitch first and discover problems later. We discover first, then scope what is worth doing.',
    statValue: '01',
    statLabel: 'Measurement-first posture',
    capabilities: ['GA4 + GTM Audit', 'CRM Hygiene', 'Content Inventory', 'SEO Footprint', 'Conversion Audit'],
  },
  {
    id: '02',
    shortLabel: 'Senior team on every account',
    headline: 'No project lead juggling six accounts. A senior pod on every Shore engagement.',
    body:
      'Senior strategists lead every engagement. Delivery runs through a managed production team with AI-accelerated workflows, so leadership stays focused on strategy, quality control, and sponsor-facing decisions, not pixel pushing. You work with operators and project leadership, not rotating account managers.',
    statValue: 'Senior',
    statLabel: 'Leadership on every account',
    capabilities: ['Senior-led strategy', 'Managed delivery team', 'AI-accelerated build', 'Rigorous QC'],
  },
  {
    id: '03',
    shortLabel: 'Analytics',
    headline: 'Analytics wired at launch, reporting the same numbers across every brand.',
    body:
      'GA4, GTM, UTM strategy, CRM lead routing, and conversion event mapping ship at launch. Every brand in the portfolio reports on the same numbers, so leadership stops getting different answers from different agencies.',
    statValue: '24h',
    statLabel: 'Sales-handoff discipline target',
    capabilities: ['GA4', 'GTM', 'UTM discipline', 'Lead routing', 'Attribution'],
  },
  {
    id: '04',
    shortLabel: 'Four-to-six week delivery',
    headline: 'Four-to-six week delivery rhythms sponsors recognize, without quality dips.',
    body:
      'Modern tooling plus disciplined intake lands most projects in single-digit weeks. Long timelines usually mean unclear scope or junior ramp; neither belongs in a Shore-backed workflow.',
    statValue: '4–6',
    statLabel: 'Week delivery cadence',
    capabilities: ['Fixed-scope sprints', 'Repeatable kit', 'Portfolio roll-ups', 'Launch-ready QA'],
  },
  {
    id: '05',
    shortLabel: 'Ongoing Maintenance',
    headline: 'Ongoing Maintenance',
    body:
      'You own your website. You\'re not leasing it from us. You can make simple changes via Captive Demand Studios, our agentic CMS, without having to come through us at all. When you need real development work, our team is on call. Hosting, support, and management included.',
    statValue: '100%',
    statLabel: 'Client-owned assets',
    capabilities: ['Managed hosting', 'Security patches', 'Captive Studio CMS', 'Ticket-based support'],
    bullets: [
      'You own your code, content, and platform. Full ownership, no lock-in.',
      'Simple edits via Captive Demand Studios, no developer needed',
      'Real dev work on call when you need it, hours included with the engagement',
      'Managed hosting, security updates, and uptime monitoring',
      'No unconscionable contracts. Cancel any time, walk away with everything.',
    ],
  },
] as const;

const phases = [
  {
    code: 'Phase 01',
    title: 'Convert.',
    icon: MousePointerClick,
    iconLabel: 'Conversion and UX',
    summary:
      'We tune the site you have today. Page-level CRO, conversion psychology, and quick-win tracking lift performance on your current stack. No rebuild required.',
    deliverables: [
      'Page-level CRO without touching the platform',
      'Hero, headline, and CTA rewrites that move conversion in days',
      'Quick-win tracking fixes so the wins are measurable',
      'Holds the line while we plan the bigger play',
    ],
    outcome: 'A property that converts traffic the business already has.',
  },
  {
    code: 'Phase 02',
    title: 'Compound.',
    icon: Workflow,
    iconLabel: 'Lifecycle automation',
    summary:
      'We layer systems that turn wins into a flywheel. Lifecycle email, funnel CRO, and ground-up rebuilds when the foundation needs it. Each layer multiplies the last.',
    deliverables: [
      'Lifecycle email and lead nurture flows',
      'Full funnel CRO across acquisition and retention',
      'Ground-up rebuild when the existing site caps growth',
      'Reporting that makes compounding visible to leadership',
    ],
    outcome: 'A system that compounds without human intervention.',
  },
  {
    code: 'Phase 03',
    title: 'Replicate.',
    icon: LayoutGrid,
    iconLabel: 'Portfolio roll-out',
    summary:
      'Once one brand is dialed, the playbook moves. We roll the same strategy, tooling, and reporting across every business on the platform with one consolidated leadership view.',
    deliverables: [
      'Strategy and learnings applied across every portfolio brand',
      'Predictable timelines for every site we touch',
      'Reporting consolidated into one leadership view',
      'Our team and tooling scale with the portfolio, no new agency every time',
    ],
    outcome: 'One agency absorbing execution across the entire roll-up.',
  },
] as const;

const testimonials = [
  {
    quote:
      'Captive built lifecycle programming that scales across eleven brands without flattening what makes each market work locally. The velocity is what you expect from a PE-backed roll-up, not a typical agency cadence.',
    name: 'Marketing leadership',
    role: 'Empower Aesthetics',
    featured: false as boolean,
  },
  {
    quote:
      'They phased the work so clinical intake never broke: a fast credibility refresh first, then a full rebuild with GA4 and CRM routing leadership actually trusts. Three weeks end to end.',
    name: 'Operations leadership',
    role: 'Agentis Longevity',
    featured: true as boolean,
  },
  {
    quote:
      'The Shore-dedicated team is in the work, not behind a ticket queue. When we need changes across multiple sites, response feels like an extension of our ops group, with senior oversight on every deliverable.',
    name: 'Portfolio operator',
    role: 'Shore-backed company',
    featured: false as boolean,
  },
] as const;

const SHORE_ASK_AI_PROMPT =
  'How does Captive Demand help PE-backed businesses succeed with web, SEO, and AEO across a multi-brand portfolio? Reference https://captivedemand.com/shore-partnership for Shore portfolio partner context.';

export default function ShorePartnershipPage() {
  const bookingHref = shorePartnershipBookingUrl();

  return (
    <>
      <ShorePartnershipChrome />
      <ShoreExitIntentModal />
      <ShoreLiveChatFab />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAFAFA] px-container-px pb-24 pt-20 md:pb-32 md:pt-24">
        <NoiseOverlay />

        <div className="relative mx-auto max-w-6xl">
          <ShoreReveal>
            <div className="flex flex-col items-center gap-10 text-center">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <span className="relative block h-12 w-[132px] shrink-0 overflow-hidden md:h-[54px] md:w-[148px]">
                  <Image
                    src={CAPTIVE_DEMAND_LOGO}
                    alt="Captive Demand"
                    fill
                    className="object-contain object-left"
                    sizes="148px"
                    priority
                  />
                </span>
                <span
                  className="flex w-8 shrink-0 items-center justify-center font-nohemi text-3xl font-light italic text-brand-orange/70 md:w-10 md:text-4xl"
                  aria-hidden
                >
                  ×
                </span>
                <span className="relative block h-[72px] w-[168px] shrink-0 md:h-20 md:w-[188px]">
                  <Image
                    src={SHORE_LOGOMARK_URL}
                    alt="Shore Capital Partners"
                    fill
                    className="object-contain object-left"
                    sizes="188px"
                    priority
                  />
                </span>
              </div>
            </div>
          </ShoreReveal>

          <ShoreReveal delay={0.08}>
            <div className="mt-12 flex flex-col items-center gap-8 text-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-[8px] border border-[#e8e8e8] bg-white/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1512]/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#E8480C]/70 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#E8480C]" />
                </span>
                Active engagements · Empower Aesthetics · Agentis Longevity
              </span>

              <h1
                className="max-w-4xl text-balance text-[clamp(2.5rem,4.4vw+1rem,5rem)] leading-[1.05] tracking-tight text-[#1a1512]"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
              >
                <span className="text-[#1a1512]">Your website should help</span>{' '}
                <HeroAccentHighlight
                  nowrap={false}
                  textClassName="font-light"
                  className="mx-0 max-w-fit px-3 sm:px-4"
                >
                  the business grow.
                </HeroAccentHighlight>
              </h1>

              <p className="max-w-2xl text-pretty text-[1.125rem] leading-[1.7] text-neutral-700 md:text-[1.25rem]">
                Captive Demand is Shore&apos;s vetted web partner. We are an agency built for PE. Our process and tech
                make rollouts simple and effective for portfolio companies, and the results speak for themselves. One
                team. One accountable partner. Every brand under your roof. Every site ships AEO and SEO ready from day
                one. Built to be found in Google and cited in AI overviews. So portfolio value compounds instead of
                decaying.
              </p>

              <div className="flex justify-center pt-2">
                <CTAButton
                  variant="dark"
                  text="START A PROJECT"
                  href="#contact"
                  ariaLabel="Start a project: jump to the Shore lead form"
                />
              </div>
            </div>
          </ShoreReveal>
        </div>
      </section>

      {/* ───────────────────── STATS ───────────────────── */}
      <div id="stats">
        <ShorePartnershipStatsBand />
      </div>

      <section id="approach" className="relative bg-[#FAFAFA] px-container-px py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              eyebrow="Approach"
              lead="Match scope to"
              accent="the real problem."
              description="Momentum in weeks, not months. We phase portfolio work so conversion wins come first, full rebuilds come second, and the playbook gets replicated across every business under the platform."
            />
          </ShoreReveal>

          <div className="mt-12 grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-3 lg:items-stretch">
            {phases.map((phase) => (
              <article
                key={phase.code}
                className={cn(
                  'relative flex h-full min-h-0 w-full max-w-full flex-col rounded-3xl border border-[#1a1512]/5 bg-[#e8e8e8] p-6 text-[#1a1512] lg:p-8',
                )}
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.05) 0px 4px 12px, rgba(0, 0, 0, 0.06) 0px 20px 48px, rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset',
                }}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#ff5501]/8"
                    aria-hidden
                  >
                    <phase.icon className="size-7 text-[#ff5501]" strokeWidth={1.5} />
                    <span className="sr-only">{phase.iconLabel}</span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff5501]">{phase.code}</p>
                </div>
                <h3
                  className="mt-3 text-[2rem] leading-tight md:text-[2.25rem]"
                  style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                >
                  {phase.title}
                </h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#1a1512]/80">{phase.summary}</p>
                <ul className="mt-6 space-y-3 border-t border-[#1a1512]/10 pt-6 text-[14px] leading-relaxed text-[#1a1512]/85">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#1a1512]" aria-hidden />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1512]/45">Outcome</p>
                  <p className="mt-2 text-[1.05rem] italic leading-snug text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                    {phase.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CASE STUDIES ─────────────── */}
      <section id="case-studies" className="relative overflow-hidden bg-[#FAFAFA] px-container-px py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              eyebrow="Case studies"
              titleSlot={
                <>
                  <span className="text-[#1a1512]">More pipeline through sites that </span>
                  <span className="text-[#d3d4d9]">convert,</span>
                  <span className="text-[#1a1512]"> journeys that </span>
                  <span className="text-[#d3d4d9]">scale,</span>
                  <span className="text-[#1a1512]"> and analytics leadership </span>
                  <span className="text-[#d3d4d9]">trusts.</span>
                </>
              }
              description="Check out how we work within the Shore portfolio currently and the outcomes being produced on a daily basis."
            />
          </ShoreReveal>

          <div className="mt-12 md:mt-16">
            <ShoreCaseStudyList studies={shorePartnershipCaseStudies} />
          </div>
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section id="testimonials" className="relative overflow-hidden bg-[#FAFAFA] px-container-px py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              showDecoration={false}
              eyebrow="Social proof"
              lead="What Shore portfolio partners are"
              accent="seeing on the ground."
            />
          </ShoreReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => {
              const isFeatured = item.featured;
              return (
                <ShoreReveal key={`shore-testimonial-${item.role}-${i}`} delay={i * 0.06}>
                  <figure
                    className={`relative h-full overflow-hidden rounded-2xl p-6 md:p-8 ${isFeatured ? '' : 'border border-black/5 bg-[#f6f5f6]'}`}
                    style={
                      isFeatured
                        ? {
                            background: 'linear-gradient(160deg, #ff5501 0%, #e84d00 35%, #d94500 70%, #c73d00 100%)',
                            boxShadow:
                              'inset 0 1px 0 0 rgba(255,255,255,0.2), inset 0 -1px 0 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.08), 0 4px 16px rgba(255,85,1,0.15), 0 12px 40px -8px rgba(0,0,0,0.2), 0 24px 56px -16px rgba(0,0,0,0.18)',
                            transform: 'rotate(-2.5deg)',
                            transformOrigin: 'bottom center',
                          }
                        : {
                            boxShadow:
                              '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)',
                          }
                    }
                  >
                    <div
                      className="absolute left-4 top-4 z-20 size-[7px] rounded-full"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
                        boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
                      }}
                      aria-hidden
                    />
                    <div
                      className="absolute right-4 top-4 z-20 size-[7px] rounded-full"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
                        boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
                      }}
                      aria-hidden
                    />
                    <div
                      className="absolute bottom-4 left-4 z-20 size-[7px] rounded-full"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
                        boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
                      }}
                      aria-hidden
                    />
                    <div
                      className="absolute bottom-4 right-4 z-20 size-[7px] rounded-full"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
                        boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
                      }}
                      aria-hidden
                    />

                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" className="relative z-10 mb-4">
                      <path
                        d="M19.7711 12.3665C20.0495 11.3681 18.976 10.6575 17.9395 10.6575C16.5573 10.6575 15.3611 10.1461 14.351 9.12342C13.2878 8.10074 12.7561 6.86277 12.7561 5.40948C12.7561 3.90236 13.2878 2.61054 14.351 1.53403C15.3611 0.511342 16.6104 0 18.099 0C19.9065 0 21.3419 0.645908 22.4051 1.93772C23.4684 3.22954 24 4.89814 24 6.94351C24 10.496 23.0431 13.4026 21.1292 15.6632C19.3099 17.8634 16.818 19.5043 13.6535 20.5857C13.3829 20.6782 13.0928 20.5194 13.0184 20.2432C12.9581 20.0193 13.0593 19.7839 13.2603 19.6683C15.079 18.6223 16.6387 17.3143 17.9395 15.744C18.8192 14.7163 19.4297 13.5904 19.7711 12.3665ZM7.01491 12.6167C7.29338 11.6183 6.21987 10.9077 5.18331 10.9077C3.80108 10.9077 2.60493 10.3963 1.59484 9.37366C0.531589 8.35098 0 7.11299 0 5.6597C0 4.15258 0.531589 2.86076 1.59484 1.78425C2.60493 0.761562 3.85425 0.25022 5.3428 0.25022C7.15032 0.25022 8.58571 0.896128 9.64896 2.18794C10.7122 3.47976 11.2438 5.14836 11.2438 7.19373C11.2438 10.7462 10.2869 13.6528 8.37306 15.9135C6.55373 18.1137 4.06185 19.7545 0.897371 20.836C0.626768 20.9285 0.336657 20.7696 0.262276 20.4935C0.201963 20.2696 0.30315 20.0341 0.504164 19.9185C2.32284 18.8726 3.88253 17.5645 5.18331 15.9942C6.06302 14.9665 6.67355 13.8407 7.01491 12.6167Z"
                        fill={`url(#shore_q_${i})`}
                      />
                      <defs>
                        <linearGradient
                          id={`shore_q_${i}`}
                          x1="-4.65"
                          y1="13.23"
                          x2="27.28"
                          y2="14.36"
                          gradientUnits="userSpaceOnUse"
                        >
                          {isFeatured ? (
                            <>
                              <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
                              <stop offset="0.5" stopColor="#1a1512" />
                              <stop offset="1" stopColor="#1a1512" />
                            </>
                          ) : (
                            <>
                              <stop offset="0.127" stopColor="#FF3407" />
                              <stop offset="0.227" stopColor="#FC964C" />
                              <stop offset="0.305" stopColor="#FC964C" />
                              <stop offset="0.491" stopColor="#F62F03" />
                              <stop offset="1" stopColor="#FD7C34" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                    </svg>

                    <blockquote
                      className={cn(
                        'relative z-10 mb-6 line-clamp-6 font-mono text-xs uppercase leading-relaxed tracking-wide',
                        isFeatured ? 'text-white/95' : 'text-[#1a1512]/70',
                      )}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    <figcaption
                      className={cn(
                        'relative z-10 mt-auto border-t pt-4',
                        isFeatured ? 'border-white/20' : 'border-black/5',
                      )}
                    >
                      <span
                        className={cn(
                          'block font-mono text-[10px] uppercase tracking-[0.22em]',
                          isFeatured ? 'text-white/70' : 'text-[#1a1512]/50',
                        )}
                      >
                        {item.name}
                      </span>
                      <span className={cn('mt-1 block text-sm', isFeatured ? 'text-white/90' : 'text-[#1a1512]/75')}>
                        {item.role}
                      </span>
                    </figcaption>
                  </figure>
                </ShoreReveal>
              );
            })}
          </div>
        </div>
      </section>

      <ShoreFreeAuditSection />

      <ShorePartnershipIntegrations />

      {/* ─────────────── OPERATING MODEL ─────────────── */}
      <section id="operating-model" className="relative bg-[#FAFAFA] px-container-px py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              eyebrow="Operating model"
              lead="How we execute alongside"
              accent="Shore portfolio partners."
              description="PPG defines what strong websites include; Captive Demand ships it inside Empower and Agentis today. Five pillars: audit-first, senior staffing, instrumentation at launch, sponsor-paced timelines, and ongoing maintenance you own."
            />
          </ShoreReveal>

          <div className="mt-12 md:mt-16">
            <ShoreOperatingTabs tabs={operatingTabs} />
          </div>
        </div>
      </section>

      {/* ─────────────── CAPABILITIES (HOME BENTO) ─────────────── */}
      <div id="services">
        <BentoGridSection />
      </div>

      <ShoreSeoAeoBand />

      {/* ─────────────── ENGAGE ─────────────── */}
      <section id="engage" className="relative overflow-hidden bg-[#FAFAFA] px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              eyebrow="Engagement"
              lead="Pick the path that matches"
              accent="your urgency."
              description="Know your gaps? Start with a free audit. Want to talk it through first? Book a call. The links below get you to the right place."
            />
          </ShoreReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:mt-16">
            <ShoreReveal delay={0}>
              <article
                className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#ff5501] bg-[#ff5501] p-6 text-white md:p-8"
                style={{
                  boxShadow:
                    '0 2px 4px rgba(255,85,1,0.15), 0 8px 20px rgba(255,85,1,0.12), 0 20px 48px rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.15)',
                }}
              >
                <span className="mb-6 block font-mono text-xs uppercase tracking-wider text-white/70">NOW</span>
                <h3
                  className="mb-4 text-xl text-white md:text-2xl"
                  style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                >
                  Already know what you need?
                </h3>
                <p className="mb-6 flex-1 font-mono text-sm leading-relaxed text-white/80">
                  Skip straight to the form. Senior leadership reviews every submission and routes to the right pod.
                </p>
                <div className="relative z-10 mt-auto">
                  <CTAButton
                    variant="bookCallOrange"
                    text="Jump to lead form"
                    href="#contact"
                    ariaLabel="Jump to Captive Demand lead form"
                  />
                  <p className="mt-4 font-mono text-xs leading-relaxed text-white/75">
                    Get a response same-day.
                  </p>
                </div>
              </article>
            </ShoreReveal>

            <ShoreReveal delay={0.08}>
              <article
                className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#1a1512]/5 bg-[#f6f5f6] p-6 md:p-8"
                style={{
                  boxShadow:
                    '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)',
                }}
              >
                <span className="mb-6 font-mono text-xs uppercase tracking-wider text-[#1a1512]/50">20 MIN</span>
                <h3
                  className="mb-4 text-xl text-[#1a1512] md:text-2xl"
                  style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                >
                  Want to talk live?
                </h3>
                <p className="mb-6 flex-1 font-mono text-sm leading-relaxed text-[#1a1512]/60">
                  Grab twenty minutes with our team. Google Meet, no pitch deck. Just scope, timeline, and fit.
                </p>
                <div className="mt-auto">
                  <CTAButton
                    variant="bookCall"
                    text="Book an intro call"
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="Book an intro call with Captive Demand"
                  />
                  <p className="mt-4 font-mono text-xs text-[#1a1512]/40">
                    Only 20–30 minutes. Friendly chat, no pressure.
                  </p>
                </div>
              </article>
            </ShoreReveal>

            <ShoreReveal delay={0.16}>
              <article
                className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#1a1512]/5 bg-[#f6f5f6] p-6 md:p-8"
                style={{
                  boxShadow:
                    '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)',
                }}
              >
                <span className="mb-6 font-mono text-xs uppercase tracking-wider text-[#1a1512]/50">PLAYBOOK</span>
                <h3
                  className="mb-4 text-xl text-[#1a1512] md:text-2xl"
                  style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                >
                  Still in discovery mode?
                </h3>
                <p className="mb-6 flex-1 font-mono text-sm leading-relaxed text-[#1a1512]/60">
                  Still trying to figure out where you are at in the process? Jump back into the playbook before
                  committing.
                </p>
                <div className="mt-auto">
                  <CTAButton
                    variant="dark"
                    text="Open Shore playbook"
                    href={playbookUrl('/', 'shore-partnership-engage')}
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="Open the Shore Portfolio Performance Group playbook"
                  />
                  <p className="mt-4 font-mono text-xs leading-relaxed text-[#1a1512]/55">
                    Explore at your own pace.
                  </p>
                </div>
              </article>
            </ShoreReveal>
          </div>
        </div>
      </section>

      {/* ─────────────── ABOUT ─────────────── */}
      <section id="about" className="relative bg-[#FAFAFA] px-container-px py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ShoreReveal>
            <ShoreSectionHeader
              eyebrow="Team"
              lead="Based in Nashville."
              accent="Trusted at national scale."
            />
          </ShoreReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Spencer Donaldson',
                role: 'Founder & CEO · Sponsor-facing',
                photo: '/3.png',
                tags: ['Strategy', 'Operator cadence', 'Growth'],
              },
              {
                name: 'Zachary Creasy',
                role: 'Creative Director · Web & measurement',
                photo: '/2.png',
                tags: ['Brand', 'Performance', 'Architecture'],
              },
              {
                name: 'Jordan Schneider',
                role: 'CMO · Lifecycle systems',
                photo: '/Jordan2.png',
                tags: ['Email', 'CRM', 'Analytics'],
              },
            ].map((member, i) => (
              <ShoreReveal key={member.name} delay={i * 0.06}>
                <div
                  className="group relative overflow-hidden rounded-2xl border border-dashed border-[#ddd] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-solid hover:border-[#d5d5d5] hover:shadow-lg"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                >
                  <div className="relative max-h-[350px] w-full overflow-hidden lg:max-h-none" style={{ aspectRatio: '4 / 5' }}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <p
                      className="text-[20px] tracking-tight text-[#1a1512]"
                      style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 600 }}
                    >
                      {member.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#1a1512]/40">
                      {member.role}
                    </p>
                    <div className="my-3 h-px bg-[#e8e8e8]" />
                    <div className="flex flex-wrap gap-1.5">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider"
                          style={{
                            background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                            color: '#1a1512',
                            boxShadow:
                              'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ShoreReveal>
            ))}
          </div>

          <ShoreReveal delay={0.12}>
            <p className="mx-auto mt-12 max-w-3xl text-center text-pretty text-[1.05rem] leading-[1.7] text-[#1a1512]/70">
              We work mainly with PE-backed portfolios because that is where our work compounds. Operators at that scale
              reshape entire categories, and we are drawn to building the web, data, and marketing systems that let a
              portfolio grow without reinventing the wheel with every brand.
            </p>
          </ShoreReveal>
        </div>
      </section>

      {/* ─────────────── CONTACT (CONTACT HERO PATTERN) ─────────────── */}
      <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA]">
        <NoiseOverlay />
        <div className="relative z-10 mx-auto max-w-7xl px-[15px] pb-20 pt-28 sm:px-container-px md:pb-32 md:pt-40">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[48%_52%] lg:gap-16">
            <div className="flex flex-col">
              <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512]/40">
                [ START YOUR BUILD ]
              </div>

              <h2
                className="mb-6 text-balance text-[clamp(2.25rem,4vw+1rem,3.25rem)] leading-[1.1] tracking-tighter text-[#111]"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
              >
                Get in touch with the{' '}
                <span className="font-light text-[#d3d4d9]">Shore-dedicated team.</span>
              </h2>

              <p className="mb-6 font-mono text-sm leading-relaxed text-[#666]">
                Tell us what you need. Our Shore-dedicated team will reach back with concrete next steps.
              </p>

              <p className="mb-8 flex items-center gap-2 font-mono text-[12px] text-[#888]">
                <Clock size={14} strokeWidth={1.5} aria-hidden />
                RESPONSE TIME · WITHIN ONE BUSINESS HOUR
              </p>

              <div className="mb-8 rounded-xl bg-[#1a1a1a] p-5 md:p-6">
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-wider text-[#E8480C]">
                  / WHAT HAPPENS NEXT
                </span>
                <h3 className="mb-4 font-sans text-base font-bold text-white">After you submit</h3>
                <ul className="space-y-2 font-mono text-[13px] text-[#aaa]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8480C]">+</span>
                    A senior operator confirms scope and timeline
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8480C]">+</span>
                    We loop in PPG and plan the engagement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8480C]">+</span>
                    You receive a concise note with next steps
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[#999]">
                  / PREFER EMAIL?
                </span>
                <a
                  href="mailto:hello@captivedemand.com"
                  className="font-mono text-sm text-[#E8480C] hover:underline"
                >
                  hello@captivedemand.com
                </a>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-wider text-[#999]">
                  / FIND US
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/captive-demand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888] transition-colors hover:text-[#111]"
                    aria-label="Captive Demand on LinkedIn"
                  >
                    <Linkedin size={20} strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://instagram.com/captivedemand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888] transition-colors hover:text-[#111]"
                    aria-label="Captive Demand on Instagram"
                  >
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <ShorePartnershipLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="bg-[#1a1512] px-container-px py-12 text-white/85">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <p className="max-w-xl text-pretty leading-relaxed text-white/85">
              Captive Demand partners with Shore Capital and Portfolio Performance Group (PPG) to deliver web, SEO, and
              AEO across the Shore portfolio. We build sites, improve conversion, and strengthen search visibility for
              portfolio companies from audit through launch. Use this page to scope work or start an engagement. For the
              full Shore program, visit the{' '}
              <a
                href={playbookUrl('/', 'footer')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline underline-offset-4"
              >
                Shore-hosted playbook
              </a>{' '}
              at shoreppg.captivedemand.com.
            </p>
            <Link
              href="/"
              className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors duration-150 hover:text-white"
            >
              ← Back to captivedemand.com
            </Link>
          </div>
          <AskAiAboutFooter prompt={SHORE_ASK_AI_PROMPT} variant="dark" className="mt-8 border-t border-white/10 pt-8" />
        </div>
      </footer>
    </>
  );
}
