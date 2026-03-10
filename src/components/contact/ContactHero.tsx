'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Clock, Video, Calendar, Linkedin, Instagram } from 'lucide-react';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ContactFormCard } from './ContactFormCard';

gsap.registerPlugin();

interface GridPositions {
  v1: number;
  v2: number;
  v3: number;
  h1: number;
  h2: number;
  h3: number;
  sectionTop: number;
  sectionHeight: number;
}

const GRID_FADE = 140;

function HLine({ y, opacity }: { y: number; opacity: number }) {
  return (
    <div className="absolute left-0 right-0 h-[1px]" style={{ top: y, opacity }}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, #e5e5e5 ${GRID_FADE}px, #e5e5e5 calc(100% - ${GRID_FADE}px), transparent)`,
        }}
      />
    </div>
  );
}

function VLine({
  x,
  height,
  opacity,
}: {
  x: number;
  height: number;
  opacity: number;
}) {
  return (
    <div
      className="absolute top-0 w-[1px]"
      style={{ left: x, height, opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, #e5e5e5 ${GRID_FADE}px, #e5e5e5 calc(100% - ${GRID_FADE}px), transparent)`,
        }}
      />
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

export function ContactHero() {
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
    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-text', {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.3,
        onComplete: measure,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [measure]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAFAFA]"
    >
      <NoiseOverlay />
      <ArchitecturalGrid positions={gridPos} />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-20 md:pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col">
            <div className="contact-hero-text mb-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1512]/40">
              [ CONTACT: START YOUR BUILD ]
            </div>

            <h1
              ref={headingRef}
              className="contact-hero-text text-[clamp(2.25rem,4vw+1rem,3.25rem)] leading-[1.1] tracking-tighter mb-6"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
            >
              <span className="text-[#111]">Let&apos;s build</span>
              <br />
              <span className="font-light text-[#666]">something real.</span>
            </h1>

            <p
              ref={rightRef}
              className="contact-hero-text font-mono text-sm text-[#666] leading-relaxed max-w-[360px] mb-6"
            >
              Tell us about your project. We respond to every inquiry within 24
              hours and only take on work we can genuinely move the needle on.
            </p>

            {/* Availability badge */}
            <div className="contact-hero-text flex items-center gap-2 px-4 py-2 rounded-[8px] mb-4 w-fit bg-white/80 border border-[#e8e8e8] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#E8480C]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1512]/80">
                2 SPOTS AVAILABLE THIS MONTH
              </span>
            </div>

            <p className="contact-hero-text font-mono text-[12px] text-[#888] mb-8 flex items-center gap-2">
              <Clock size={14} strokeWidth={1.5} />
              TYPICALLY RESPOND WITHIN 24 HOURS
            </p>

            {/* What happens next card */}
            <div className="contact-hero-text rounded-xl p-5 md:p-6 bg-[#1a1a1a] mb-8">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#E8480C] block mb-3">
                / THE PLAN
              </span>
              <h3 className="font-sans text-base font-bold text-white mb-4">
                What happens next?
              </h3>
              <ul className="space-y-2 font-mono text-[13px] text-[#aaa]">
                <li className="flex items-start gap-2">
                  <span className="text-[#E8480C]">+</span>
                  We review your inquiry and respond within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E8480C]">+</span>
                  If it&apos;s a fit, we&apos;ll schedule a 30-min strategy call
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E8480C]">+</span>
                  We&apos;ll scope the project and send a proposal
                </li>
              </ul>
            </div>

            {/* Direct contact */}
            <div className="contact-hero-text mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#999] block mb-2">
                / PREFER EMAIL?
              </span>
              <a
                href="mailto:hello@captivedemand.com"
                className="font-mono text-sm text-[#E8480C] hover:underline"
              >
                hello@captivedemand.com
              </a>
            </div>

            {/* Social links */}
            <div className="contact-hero-text">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#999] block mb-3">
                / FIND US
              </span>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888] hover:text-[#111] transition-colors"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888] hover:text-[#111] transition-colors"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — tabbed card */}
          <div className="lg:sticky lg:top-32">
            <ContactFormCard />
          </div>
        </div>
      </div>
    </section>
  );
}
