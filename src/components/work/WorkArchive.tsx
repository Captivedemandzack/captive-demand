'use client';

import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';
import { caseStudies, getFeaturedCaseStudies, getLiveWebsites } from '@/data/case-studies';
import { partnerLogos } from '@/data/logos';
import type { CaseStudy } from '@/data/case-studies';
import { CTASection } from '@/components/sections/CTASection';

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared Helpers ─── */

const DecorativeShapeWithLine = ({ shapeColor = "#d5d5d5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
  <div className="flex items-end w-full">
    <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
      <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
    </svg>
    <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
  </div>
);

/* ─── Wireframe Grid ─── */

interface GridPositions {
  v1: number; v2: number; v3: number;
  h1: number; h2: number; h3: number;
  sectionTop: number; sectionHeight: number;
}

const GRID_FADE = 140;

function HLine({ y, opacity }: { y: number; opacity: number }) {
  return (
    <div className="absolute left-0 right-0 h-[1px]" style={{ top: y, opacity }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, #e5e5e5 ${GRID_FADE}px, #e5e5e5 calc(100% - ${GRID_FADE}px), transparent)` }} />
    </div>
  );
}

function VLine({ x, height, opacity }: { x: number; height: number; opacity: number }) {
  return (
    <div className="absolute top-0 w-[1px]" style={{ left: x, height, opacity }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, #e5e5e5 ${GRID_FADE}px, #e5e5e5 calc(100% - ${GRID_FADE}px), transparent)` }} />
    </div>
  );
}

function ArchitecturalGrid({ positions }: { positions: GridPositions | null }) {
  if (!positions) return null;
  const { v1, v2, v3, h1, h2, h3, sectionTop, sectionHeight } = positions;
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <HLine y={h1 - sectionTop} opacity={0.6} />
      <HLine y={h2 - sectionTop} opacity={0.7} />
      <HLine y={h3 - sectionTop} opacity={0.5} />
      <VLine x={v1} height={sectionHeight} opacity={0.6} />
      <VLine x={v2} height={sectionHeight} opacity={0.7} />
      <VLine x={v3} height={sectionHeight} opacity={0.5} />
    </div>
  );
}

/* ─── Section 1: Hero ─── */

function LogoScroll() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: [0, -800] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 25, ease: 'linear' } }}
      >
        {[...partnerLogos, ...partnerLogos].map((logo, i) => (
          <div key={`${logo.id}-${i}`} className="flex-shrink-0 opacity-50" style={{ filter: 'grayscale(100%) brightness(0.5)' }}>
            <div className="relative h-10 w-24">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function WorkHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [gridPos, setGridPos] = useState<GridPositions | null>(null);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const heading = headingRef.current;
    const right = rightRef.current;
    if (!section || !content || !heading || !right) return;

    const sRect = section.getBoundingClientRect();
    const cRect = content.getBoundingClientRect();
    const hRect = heading.getBoundingClientRect();
    const rRect = right.getBoundingClientRect();

    setGridPos({
      v1: cRect.left - sRect.left,
      v2: rRect.left - sRect.left,
      v3: cRect.right - sRect.left,
      h1: hRect.top,
      h2: hRect.bottom,
      h3: rRect.bottom,
      sectionTop: sRect.top,
      sectionHeight: sRect.height,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    const raf = requestAnimationFrame(measure);
    return () => { window.removeEventListener('resize', measure); cancelAnimationFrame(raf); };
  }, [measure]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-hero-text', {
        opacity: 0, y: 30, filter: 'blur(8px)',
        duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
        onComplete: measure,
      });
      gsap.from('.work-hero-badge', {
        opacity: 0, scale: 0.9, y: 15,
        duration: 0.8, ease: 'power4.out', stagger: 0.08, delay: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [measure]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#FAFAFA]">
      <NoiseOverlay />
      <ArchitecturalGrid positions={gridPos} />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-20 md:pb-32">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left — Text */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <div className="work-hero-text mb-6">
              <EyebrowHeading category="Portfolio" label="Our Work" />
            </div>

            <h1
              ref={headingRef}
              className="work-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
            >
              Proof beats
              <br />
              <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                  promises
                </span>
                <span
                  className="absolute inset-0 rounded-[6px] pointer-events-none"
                  style={{
                    zIndex: 2,
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    background: 'linear-gradient(to bottom, rgba(250,249,246,0.0) 0%, rgba(250,249,246,0.08) 25%, rgba(250,249,246,0.35) 50%, rgba(250,249,246,0.65) 72%, rgba(250,249,246,0.88) 100%)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,1) 100%)',
                  }}
                />
                <span
                  className="absolute inset-0 rounded-[6px] pointer-events-none"
                  style={{
                    zIndex: 3,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.0) 45%, rgba(255,255,255,0.06) 100%)',
                  }}
                />
              </span>
            </h1>

            <p className="work-hero-text font-mono text-sm text-[#1a1512]/50 leading-relaxed max-w-md uppercase tracking-wide">
              Every project is measured by outcomes, not just deliverables. Real results for real brands.
            </p>

            <div className="work-hero-text mt-8 flex flex-col items-start gap-2">
              <a
                href="https://cal.com"
                className="inline-flex items-center gap-3 bg-[#1a1512] text-white px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform group"
              >
                Talk to a Founder
                <ArrowRight size={16} className="text-[#ff5501] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </a>
              <span className="font-mono text-[10px] text-[#1a1512]/40 uppercase tracking-wider">
                2 spots left this month
              </span>
            </div>
          </div>

          {/* Right — Logo Scroll */}
          <div ref={rightRef} className="w-full lg:w-[45%] flex flex-col items-start lg:items-end gap-4 lg:pt-8">
            <span className="work-hero-badge font-mono text-[10px] text-[#1a1512]/30 uppercase tracking-wider mb-2">
              Trusted Partner Network
            </span>
            <LogoScroll />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Featured Projects Carousel ─── */

function FeaturedCarousel() {
  const featured = getFeaturedCaseStudies();
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (i: number) => {
    setActiveIndex(i);
  };

  const prev = () => setActiveIndex((p) => (p === 0 ? featured.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p === featured.length - 1 ? 0 : p + 1));

  const study = featured[activeIndex];

  return (
    <section className="w-full bg-[#FAFAFA] pt-8 md:pt-16 pb-24 md:pb-40 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="mb-6 w-full">
            <DecorativeShapeWithLine />
          </div>
          <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
            / Featured Projects
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#1a1512] tracking-tighter"
            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
          >
            Our latest work
          </h2>
        </div>

        {/* Featured card — separate image box + content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 lg:gap-6"
          >
            {/* Left — Image (separate box) */}
            <Link href={`/work/${study.slug}`} className="block group">
              <div
                className="relative h-[300px] md:h-[420px] lg:h-[480px] overflow-hidden rounded-2xl border border-[#1a1512]/5"
                style={{ boxShadow: '0 4px 20px rgba(26,21,18,0.04), 0 1px 3px rgba(26,21,18,0.06)' }}
              >
                <Image
                  src={study.heroImage}
                  alt={study.clientName}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  unoptimized
                />
              </div>
            </Link>

            {/* Right — Content Card (separate box) */}
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-[#1a1512]/5"
              style={{
                background: 'linear-gradient(160deg, #1a1512 0%, #2a2018 40%, #3d2c1a 70%, #ff5501 180%)',
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(26,21,18,0.08)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,85,1,0.15) 0%, transparent 60%)' }} />

              <div className="relative z-10">
                {/* Logo pill — standardized with rivets, less rounded */}
                <div className="mb-8">
                  <div
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[8px]"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
                      boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {study.logoSrc ? (
                      <div className="relative h-5 w-16">
                        <Image
                          src={study.logoSrc}
                          alt={study.clientName}
                          fill
                          className="object-contain object-left brightness-0 invert opacity-80"
                        />
                      </div>
                    ) : (
                      <span className="text-white/80 text-sm font-medium">{study.clientName}</span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                  {study.stats.slice(0, 2).map((stat, i) => (
                    <div key={i}>
                      <span
                        className="text-3xl md:text-4xl text-white block"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                      >
                        {stat.value}
                      </span>
                      <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Industry */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <span
                    className="text-base text-white block"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                  >
                    {study.industry}
                  </span>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                    Industry
                  </span>
                </div>
              </div>

              {/* CTA — tonal like CaseStudyCard overlay */}
              <Link href={`/work/${study.slug}`} className="relative z-10 mt-6 block">
                <span
                  className="inline-flex items-center justify-center w-full gap-2 bg-[#1a1512] text-[#ff5501] px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider border border-[#ff5501]/50 hover:scale-[1.02] transition-transform"
                >
                  Read case study
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation — dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#1a1512]/10 flex items-center justify-center hover:border-[#1a1512]/30 transition-colors"
          >
            <ChevronLeft size={18} className="text-[#1a1512]/50" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-1.5 bg-[#f3f4f6] rounded-full px-3 py-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2.5 bg-[#1a1512]'
                    : 'w-2.5 h-2.5 bg-[#1a1512]/15 hover:bg-[#1a1512]/25'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#1a1512]/10 flex items-center justify-center hover:border-[#1a1512]/30 transition-colors"
          >
            <ChevronRight size={18} className="text-[#1a1512]/50" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Filter + Grid ─── */

const FILTER_TABS = [
  'All',
  'Website Design',
  'SEO',
  'Email Marketing',
  'Marketing Automation',
  'Branding',
];

function matchesFilter(study: CaseStudy, filter: string): boolean {
  if (filter === 'All') return true;
  const normalizedFilter = filter.toLowerCase();
  return study.services.some((s) => {
    const normalized = s.toLowerCase();
    if (normalizedFilter === 'website design') return normalized.includes('website');
    if (normalizedFilter === 'seo') return normalized.includes('seo') || normalized.includes('aeo');
    if (normalizedFilter === 'email marketing') return normalized.includes('email');
    if (normalizedFilter === 'marketing automation') return normalized.includes('automation');
    if (normalizedFilter === 'branding') return normalized.includes('branding') || normalized.includes('brand');
    return normalized.includes(normalizedFilter);
  });
}

function FilterGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'case-studies' | 'live-websites'>('case-studies');

  const caseStudyList = caseStudies.filter((s) => matchesFilter(s, activeFilter));
  const liveWebsitesList = getLiveWebsites().filter((s) => matchesFilter(s, activeFilter));
  const filtered = viewMode === 'case-studies' ? caseStudyList : liveWebsitesList;

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="mb-6 w-full">
            <DecorativeShapeWithLine />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                / All Projects
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-[#1a1512] tracking-tighter"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
              >
                Browse our work
              </h2>
            </div>

            {/* View toggle — squared, depth (rivets) */}
            <div
              className="flex items-center p-1 rounded-[8px]"
              style={{
                background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
              }}
            >
              <button
                onClick={() => setViewMode('case-studies')}
                className={`px-5 py-2.5 rounded-[6px] font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'case-studies'
                    ? 'bg-[#1a1512] text-white shadow-sm'
                    : 'text-[#1a1512]/50 hover:text-[#1a1512]/70'
                }`}
              >
                Case studies
              </button>
              <button
                onClick={() => setViewMode('live-websites')}
                className={`px-5 py-2.5 rounded-[6px] font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'live-websites'
                    ? 'bg-[#1a1512] text-white shadow-sm'
                    : 'text-[#1a1512]/50 hover:text-[#1a1512]/70'
                }`}
              >
                See live websites
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === tab
                    ? 'bg-[#1a1512] text-white border-[#1a1512]'
                    : 'bg-transparent text-[#1a1512]/50 border-[#1a1512]/10 hover:border-[#1a1512]/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {viewMode === 'case-studies' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((study, index) => (
                  <CaseStudyCard key={study.slug} study={study} index={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((study, index) => (
                  <LiveWebsiteCard key={study.slug} study={study} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-[#1a1512]/40 uppercase tracking-wider">
              No projects found for this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LiveWebsiteCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <a
        href={study.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div
          className="rounded-2xl overflow-hidden bg-white border border-[#1a1512]/5 hover:shadow-lg transition-shadow duration-300"
          style={{ boxShadow: '0 4px 20px rgba(26,21,18,0.04), 0 1px 3px rgba(26,21,18,0.06)' }}
        >
          {/* Wider aspect ratio (laptop-like 16/10) */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-7 bg-[#f3f4f6] flex items-center px-3 z-10 border-b border-[#1a1512]/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
                <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
                <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
              </div>
              <div className="flex-1 mx-2 h-3.5 bg-white border border-[#1a1512]/5 rounded-sm flex items-center px-2">
                <span className="text-[7px] text-[#1a1512]/30 font-mono truncate">{study.websiteUrl.replace('https://', '')}</span>
              </div>
            </div>
            <Image
              src={study.heroImage}
              alt={study.clientName}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              {study.logoSrc && (
                <div className="relative h-7 w-20 flex-shrink-0">
                  <Image
                    src={study.logoSrc}
                    alt={study.clientName}
                    fill
                    className="object-contain object-left opacity-60"
                    style={{ filter: 'grayscale(100%) brightness(0.4)' }}
                  />
                </div>
              )}
              <ExternalLink size={14} className="text-[#1a1512]/20 group-hover:text-[#ff5501] transition-colors" strokeWidth={1.5} />
            </div>
            <p className="font-mono text-[11px] text-[#1a1512]/50 leading-relaxed">
              {study.shortDescription}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── Section 4: Testimonial Band ─── */

function TestimonialBand() {
  const testimonials = caseStudies
    .filter((s) => s.testimonial.quote.length > 80)
    .slice(0, 3);

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="mb-6 w-full">
            <DecorativeShapeWithLine />
          </div>
          <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
            / Hear it from our clients
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#1a1512] tracking-tighter"
            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
          >
            Hear it from the <span className="text-[#ff5501]">source</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-[#f6f5f6] border border-black/5 p-6 md:p-8 overflow-hidden"
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)',
              }}
            >
              {/* Rivets */}
              <div className="absolute top-4 left-4 w-[7px] h-[7px] rounded-full z-20" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
              <div className="absolute top-4 right-4 w-[7px] h-[7px] rounded-full z-20" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
              <div className="absolute bottom-4 left-4 w-[7px] h-[7px] rounded-full z-20" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
              <div className="absolute bottom-4 right-4 w-[7px] h-[7px] rounded-full z-20" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />

              <svg width="24" height="21" viewBox="0 0 24 21" fill="none" className="mb-4 relative z-10">
                <path d="M19.7711 12.3665C20.0495 11.3681 18.976 10.6575 17.9395 10.6575C16.5573 10.6575 15.3611 10.1461 14.351 9.12342C13.2878 8.10074 12.7561 6.86277 12.7561 5.40948C12.7561 3.90236 13.2878 2.61054 14.351 1.53403C15.3611 0.511342 16.6104 0 18.099 0C19.9065 0 21.3419 0.645908 22.4051 1.93772C23.4684 3.22954 24 4.89814 24 6.94351C24 10.496 23.0431 13.4026 21.1292 15.6632C19.3099 17.8634 16.818 19.5043 13.6535 20.5857C13.3829 20.6782 13.0928 20.5194 13.0184 20.2432C12.9581 20.0193 13.0593 19.7839 13.2603 19.6683C15.079 18.6223 16.6387 17.3143 17.9395 15.744C18.8192 14.7163 19.4297 13.5904 19.7711 12.3665ZM7.01491 12.6167C7.29338 11.6183 6.21987 10.9077 5.18331 10.9077C3.80108 10.9077 2.60493 10.3963 1.59484 9.37366C0.531589 8.35098 0 7.11299 0 5.6597C0 4.15258 0.531589 2.86076 1.59484 1.78425C2.60493 0.761562 3.85425 0.25022 5.3428 0.25022C7.15032 0.25022 8.58571 0.896128 9.64896 2.18794C10.7122 3.47976 11.2438 5.14836 11.2438 7.19373C11.2438 10.7462 10.2869 13.6528 8.37306 15.9135C6.55373 18.1137 4.06185 19.7545 0.897371 20.836C0.626768 20.9285 0.336657 20.7696 0.262276 20.4935C0.201963 20.2696 0.30315 20.0341 0.504164 19.9185C2.32284 18.8726 3.88253 17.5645 5.18331 15.9942C6.06302 14.9665 6.67355 13.8407 7.01491 12.6167Z" fill="url(#q_grad_archive)" />
                <defs>
                  <linearGradient id="q_grad_archive" x1="-4.65" y1="13.23" x2="27.28" y2="14.36" gradientUnits="userSpaceOnUse">
                    <stop offset="0.127" stopColor="#FF3407" />
                    <stop offset="0.227" stopColor="#FC964C" />
                    <stop offset="0.305" stopColor="#FC964C" />
                    <stop offset="0.491" stopColor="#F62F03" />
                    <stop offset="1" stopColor="#FD7C34" />
                  </linearGradient>
                </defs>
              </svg>

              <p className="font-mono text-xs text-[#1a1512]/70 leading-relaxed uppercase tracking-wide mb-6 line-clamp-6 relative z-10">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/5 relative z-10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={study.testimonial.avatarSrc}
                    alt={study.testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1512] text-sm">{study.testimonial.author}</p>
                  <p className="text-xs text-[#1a1512]/50">
                    {study.testimonial.role}, {study.testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Results Showcase (dark, matching SEO page) ─── */

const aggregateStats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', sublabel: 'Across all verticals' },
  { value: 312, suffix: '%', label: 'Avg. Traffic Increase', sublabel: 'Across all client campaigns' },
  { value: 8, suffix: 'x', label: 'Avg. Conversion Lift', sublabel: 'From organic & paid channels' },
  { value: 2, suffix: 'M+', label: 'Revenue Generated', sublabel: 'For clients collectively', prefix: '$' },
];

function ResultsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      aggregateStats.forEach((stat, index) => {
        const el = counterRefs.current[index];
        if (!el) return;
        const target = stat.value;
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              if (el) el.textContent = Math.floor(obj.val).toString();
            },
          }
        );
      });

      const cards = sectionRef.current?.querySelectorAll('.stat-card-work');
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 40,
          duration: 0.8, ease: 'power4.out', stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-32 px-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)' }}
    >
      <NoiseOverlay />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-mono text-sm tracking-wider text-white/30 uppercase block mb-4">
            / Results
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl mx-auto tracking-tighter"
            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
          >
            Numbers that speak<br />
            <span className="text-white/30">louder than promises.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aggregateStats.map((stat, index) => (
            <div
              key={index}
              className="stat-card-work rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-white/[0.03]"
              style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 40px -15px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-baseline gap-1 mb-4">
                {stat.prefix && (
                  <span className="text-3xl md:text-4xl text-[#ff5501]" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}>
                    {stat.prefix}
                  </span>
                )}
                <span
                  ref={(el) => { counterRefs.current[index] = el; }}
                  className="text-5xl md:text-6xl tracking-tighter bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'Nohemi, sans-serif',
                    fontWeight: 300,
                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ffffff 60%, rgba(255,85,1,0.35) 100%)',
                  }}
                >
                  0
                </span>
                <span className="text-3xl md:text-4xl text-[#ff5501]" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}>
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-base text-white mb-1" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}>
                {stat.label}
              </h3>
              <p className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: CTA ─── */

/* ─── Archive Page ─── */

export function WorkArchive() {
  return (
    <>
      <WorkHero />
      <FeaturedCarousel />
      <FilterGrid />
      <TestimonialBand />
      <ResultsBand />
      <CTASection />
    </>
  );
}
