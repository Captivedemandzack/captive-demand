'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

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

export function InsightHero() {
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
      gsap.from('.insight-hero-text', {
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
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
    >
      <NoiseOverlay />
      <ArchitecturalGrid positions={gridPos} />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-20 md:pb-32"
      >
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <div className="insight-hero-text mb-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1512]/40">
              [ RESOURCE: INSIGHTS ]
            </div>

            <h1
              ref={headingRef}
              className="insight-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#111]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
            >
              Perspectives that
              <AccentBr />
              <span className="font-light text-[#666] font-sans">
                move the needle.
              </span>
            </h1>

            <p
              ref={rightRef}
              className="insight-hero-text font-mono text-sm text-[#666] leading-relaxed max-w-md"
            >
              Strategy, craft, and hard-won lessons from building brands that
              actually grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
