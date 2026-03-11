'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

function GlassBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative rounded-[4px] bg-white/50 backdrop-blur-[10px] border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${className}`}>
            <div className="absolute -top-[1px] -left-[1px] w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#d5d5d5] rounded-tl-[4px] pointer-events-none z-20" />
            <div className="absolute -bottom-[1px] -right-[1px] w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#d5d5d5] rounded-br-[4px] pointer-events-none z-20" />
            <div className="px-3.5 py-2.5 relative z-10">{children}</div>
        </div>
    );
}

/* 8×8 bitmap icon renderer — renders a grid of filled/empty pixels for that chunky pixelated look */
function BitmapIcon({ grid, color = '#1a1512', size = 14 }: { grid: number[][]; color?: string; size?: number }) {
    const rows = grid.length;
    const cols = grid[0].length;
    const px = size / cols;
    return (
        <svg width={size} height={(size / cols) * rows} viewBox={`0 0 ${cols} ${rows}`} className="flex-shrink-0" style={{ imageRendering: 'pixelated' }}>
            {grid.map((row, y) =>
                row.map((cell, x) =>
                    cell ? <rect key={`${y}-${x}`} x={x} y={y} width={1} height={1} fill={color} fillOpacity={0.55} /> : null
                )
            )}
        </svg>
    );
}

const ICON_ROBOTS = [
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,0,0,1,0,0],
    [0,0,0,1,1,0,0,0],
];

const ICON_SEARCH = [
    [0,0,1,1,1,0,0,0],
    [0,1,0,0,0,1,0,0],
    [1,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,1,0],
    [0,1,0,0,0,1,0,0],
    [0,0,1,1,1,0,0,0],
    [0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,1,1],
];

const ICON_CHART = [
    [0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,1],
    [0,0,0,0,1,0,1,1],
    [0,0,0,1,1,0,1,1],
    [0,0,0,1,1,0,1,1],
    [0,1,0,1,1,0,1,1],
    [0,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
];

const ICON_TARGET = [
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,0,0,1,1,0,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,0,1,1,0,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
];

/* ─── Grid ─── */

interface GridPositions {
    v1: number; v2: number; v3: number;
    h1: number; h2: number; h3: number;
    sectionTop: number; sectionHeight: number;
}

function HLine({ y, opacity }: { y: number; opacity: number }) {
    return (
        <div className="absolute left-0 right-0 h-[1px]" style={{ top: y, opacity }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #e5e5e5 80px, #e5e5e5 calc(100% - 80px), transparent)' }} />
        </div>
    );
}

function VLine({ x, height, opacity }: { x: number; height: number; opacity: number }) {
    return (
        <div className="absolute top-0 w-[1px]" style={{ left: x, height, opacity }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #e5e5e5 80px, #e5e5e5 calc(100% - 80px), transparent)' }} />
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

/* ─── Hero ─── */

export function SEOHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const flexRowRef = useRef<HTMLDivElement>(null);
    const editorFrameRef = useRef<HTMLDivElement>(null);

    const [gridPos, setGridPos] = useState<GridPositions | null>(null);

    const measure = useCallback(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const heading = headingRef.current;
        const paragraph = paragraphRef.current;
        const flexRow = flexRowRef.current;
        const editor = editorFrameRef.current;
        if (!section || !content || !heading || !paragraph || !flexRow || !editor) return;

        const sRect = section.getBoundingClientRect();
        const cRect = content.getBoundingClientRect();
        const hRect = heading.getBoundingClientRect();
        const pRect = paragraph.getBoundingClientRect();
        const fRect = flexRow.getBoundingClientRect();
        const eRect = editor.getBoundingClientRect();

        setGridPos({
            v1: cRect.left - sRect.left,
            v2: eRect.left - sRect.left,
            v3: eRect.right - sRect.left,
            h1: hRect.top,
            h2: pRect.top,
            h3: fRect.bottom,
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
            gsap.from('.seo-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
                onComplete: measure,
            });
            gsap.from('.seo-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.seo-badge', {
                opacity: 0, scale: 0.8, y: 20,
                duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 1.0,
            });
        }, containerRef);
        return () => ctx.revert();
    }, [measure]);

    return (
        <section ref={(el) => { sectionRef.current = el; (containerRef as React.MutableRefObject<HTMLElement | null>).current = el; }} className="relative w-full h-full min-h-screen overflow-hidden bg-[#FAFAFA]">
            <NoiseOverlay />
            <ArchitecturalGrid positions={gridPos} />

            <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-24 md:pb-36">
                <div ref={flexRowRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* LEFT — Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left pl-[10px] sm:pl-10 lg:pl-0">
                        <div className="seo-hero-text mb-6">
                            <EyebrowHeading category="Service" label="SEO / AEO" />
                        </div>
                        <h1
                            ref={headingRef}
                            className="seo-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            Search clarity<AccentBr />
                            <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                                {/* Container border — thin, subtle */}
                                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                                {/* Text — darker weight to punch through the frost */}
                                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                                    for the AI era
                                </span>
                                {/* Glassmorphic frost — blurs the text, gradient from clear top to frosted bottom */}
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
                                {/* Diagonal sheen — glass highlight */}
                                <span
                                    className="absolute inset-0 rounded-[6px] pointer-events-none"
                                    style={{
                                        zIndex: 3,
                                        background: 'linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.0) 45%, rgba(255,255,255,0.06) 100%)',
                                    }}
                                />
                            </span>
                        </h1>
                        <p ref={paragraphRef} className="seo-hero-text text-[15px] md:text-base text-[#1a1512]/60 font-mono mb-10 max-w-md leading-relaxed">
                            Most websites need support in two areas today. Traditional SEO that helps you show up on Google. AEO that helps you appear in AI Overviews and AI search results. We build both into your site so search engines and AI models can read your content clearly and present it accurately.
                        </p>
                        <div className="seo-hero-text flex flex-col items-start">
                            <AnimatedCTAButton />
                            <div className="mt-4 flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5501] opacity-40" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5501]" />
                                </span>
                                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#1a1512]/50">
                                    2 Spots Available
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — SEO Visual Composition */}
                    <div className="w-full lg:w-[62%] relative seo-hero-image pt-6 pb-16 px-0 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* MAIN FRAME — Analytics Dashboard */}
                            <div ref={editorFrameRef} className="absolute inset-0 rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_8px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 overflow-hidden flex flex-col">
                                {/* Dashboard Header */}
                                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
                                    <div className="font-mono text-[10px] sm:text-xs tracking-[0.15em] text-[#1a1512]/40 uppercase mb-2">Organic Traffic</div>
                                    <div className="text-5xl sm:text-6xl font-medium tracking-tighter text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>+312%</div>
                                </div>

                                {/* Area Chart */}
                                <div className="flex-1 relative w-full mt-2 sm:mt-4">
                                    <svg viewBox="0 0 400 150" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="seoChartFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#E8480C" stopOpacity="0.25" />
                                                <stop offset="100%" stopColor="#E8480C" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0 150 L0 120 C 50 110, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 380 20, 400 10 L 400 150 Z"
                                            fill="url(#seoChartFill)"
                                        />
                                        <path
                                            d="M0 120 C 50 110, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 380 20, 400 10"
                                            fill="none"
                                            stroke="#E8480C"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* GLASSMORPHIC BADGES with pixelated bitmap icons */}

                            {/* Robots.txt — top right */}
                            <div className="seo-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_ROBOTS} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">robots.txt</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Keywords — left side */}
                            <div className="seo-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_SEARCH} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Keywords</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Competitor Research — bottom */}
                            <div className="seo-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_CHART} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Competitor Intel</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* AI Citations — right side */}
                            <div className="seo-badge absolute top-[28%] -right-3 sm:-right-8 lg:-right-10 z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2">
                                        <BitmapIcon grid={ICON_TARGET} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">AI Citations</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* SERP SKELETON — bottom right (same position as "finished site" on website hero) */}
                            <div className="seo-badge absolute -bottom-10 right-0 z-30 w-[44%] overflow-hidden rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_16px_42px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 sm:-bottom-14 sm:-right-3 sm:w-[55%] lg:-right-6">
                                {/* Browser Chrome */}
                                <div className="h-6 bg-[#f4f4f4] flex items-center px-2.5 gap-2 border-b border-black/[0.05]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="flex-1 flex items-center h-3.5 bg-white border border-black/[0.05] rounded px-2 mx-1">
                                        <span className="text-[6px] text-black/40 font-mono truncate">google.com/search?q=seo+agency+near+me</span>
                                    </div>
                                </div>

                                {/* Search Results Content */}
                                <div className="p-3 sm:p-4 bg-white space-y-3">
                                    {/* #1 Result label */}
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                                        <span className="text-[#1a1512]/50 font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase leading-none">#1 Result</span>
                                    </div>

                                    {/* Main Result */}
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="relative rounded-full w-4 h-4 overflow-hidden border border-[#e5e5e5] bg-[#f4f4f4]">
                                                <Image src="/CD.png" alt="Captive Demand" fill className="object-cover" />
                                            </div>
                                            <span className="text-[8px] sm:text-[9px] text-[#1a1512]/50 font-mono leading-none">captivedemand.com</span>
                                        </div>
                                        <div className="text-[#1a44d8] text-[10px] sm:text-[12px] font-medium leading-tight mb-1">
                                            Captive Demand — SEO & Web Design Agency
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-full h-1.5 bg-[#1a1512]/[0.06] rounded-full" />
                                            <div className="w-[85%] h-1.5 bg-[#1a1512]/[0.04] rounded-full" />
                                        </div>
                                    </div>

                                    {/* Faded competitor results */}
                                    <div className="space-y-2.5 opacity-30">
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="w-3.5 h-3.5 rounded-full bg-[#1a1512]/[0.06]" />
                                                <div className="w-16 h-1 bg-[#1a1512]/10 rounded-full" />
                                            </div>
                                            <div className="w-[65%] h-1.5 bg-[#1a1512]/10 rounded-full mb-0.5" />
                                            <div className="w-[80%] h-1 bg-[#1a1512]/[0.06] rounded-full" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="w-3.5 h-3.5 rounded-full bg-[#1a1512]/[0.06]" />
                                                <div className="w-14 h-1 bg-[#1a1512]/10 rounded-full" />
                                            </div>
                                            <div className="w-[55%] h-1.5 bg-[#1a1512]/10 rounded-full mb-0.5" />
                                            <div className="w-[70%] h-1 bg-[#1a1512]/[0.06] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
