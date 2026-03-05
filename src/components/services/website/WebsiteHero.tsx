'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

function GlassBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative rounded-[4px] bg-white/50 backdrop-blur-[10px] border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${className}`}>
            <div className="absolute -top-[1px] -left-[1px] w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#d5d5d5] rounded-tl-[4px] pointer-events-none z-20" />
            <div className="absolute -bottom-[1px] -right-[1px] w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#d5d5d5] rounded-br-[4px] pointer-events-none z-20" />
            <div className="px-3.5 py-2.5 relative z-10">{children}</div>
        </div>
    );
}

function BitmapIcon({ grid, color = '#1a1512', size = 14 }: { grid: number[][]; color?: string; size?: number }) {
    const rows = grid.length;
    const cols = grid[0].length;
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

// Pixel icons for badges
const ICON_BRACKETS = [
    [0,0,1,0,0,1,0,0],
    [0,1,1,0,0,1,1,0],
    [1,1,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,1],
    [1,1,0,0,0,0,1,1],
    [0,1,1,0,0,1,1,0],
    [0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0],
];

// Phone outline — wider vertical rectangle, earpiece at top, home button at bottom
const ICON_RESPONSIVE = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,0],
];


function SelectionHandle({ className }: { className: string }) {
    return <div className={`absolute w-[7px] h-[7px] bg-[#FF5501] ${className}`} />;
}

interface GridPositions {
    v1: number; v2: number; v3: number;
    h1: number; h2: number; h3: number;
    sectionTop: number; sectionHeight: number;
}

function HLine({ y, opacity }: { y: number; opacity: number }) {
    return (
        <div
            className="absolute left-0 right-0 h-[1px]"
            style={{ top: y, opacity }}
        >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #e5e5e5 80px, #e5e5e5 calc(100% - 80px), transparent)' }} />
        </div>
    );
}

function VLine({ x, height, opacity }: { x: number; height: number; opacity: number }) {
    return (
        <div
            className="absolute top-0 w-[1px]"
            style={{ left: x, height, opacity }}
        >
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

export function WebsiteHero() {
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
        return () => {
            window.removeEventListener('resize', measure);
            cancelAnimationFrame(raf);
        };
    }, [measure]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.ws-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
                onComplete: measure,
            });
            gsap.from('.ws-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.ws-badge', {
                opacity: 0, scale: 0.8, y: 20,
                duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 1.0,
            });
        }, containerRef);
        return () => ctx.revert();
    }, [measure]);

    return (
        <section ref={(el) => { sectionRef.current = el; (containerRef as React.MutableRefObject<HTMLElement | null>).current = el; }} className="relative w-full h-full min-h-screen overflow-hidden bg-[#FAFAFA]">
            <ArchitecturalGrid positions={gridPos} />

            {/* Content */}
            <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-24 md:pb-36">
                <div ref={flexRowRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* LEFT — Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left pl-[10px] sm:pl-10 lg:pl-0">
                        <div className="ws-hero-text mb-6">
                            <EyebrowHeading category="Service" label="Website Design/Development" />
                        </div>
                        <h1
                            ref={headingRef}
                            className="ws-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            Design that<br />
                            <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                                    prints money
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
                        <p ref={paragraphRef} className="ws-hero-text text-[15px] md:text-base text-[#1a1512]/60 font-mono mb-10 max-w-md leading-relaxed">
                        Your website should produce ROI. We are conversion-obsessed and take your business's performance personally. Every pixel is optimized to do one thing: generate cash flow. If it doesn't align with your goals, it doesn't make it into production.
                        </p>
                        <div className="ws-hero-text flex flex-col items-start">
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

                    {/* RIGHT — Editor Composition */}
                    <div className="w-full lg:w-[62%] relative ws-hero-image pt-6 pb-16 px-0 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* EDITOR FRAME */}
                            <div ref={editorFrameRef} className="absolute inset-0 rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_8px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden rounded-[3px]">
                                    {/* Rossi website screenshot */}
                                    <Image
                                        src="/eosblank3.png"
                                        alt="Website in development"
                                        fill
                                        className="object-cover"
                                        style={{ objectPosition: 'left top' }}
                                        priority
                                    />

                                    {/* ADD SECTION banner */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                                        <div className="bg-[#FF5501] text-white text-[7px] sm:text-[8px] font-mono tracking-[0.15em] uppercase px-4 py-[3px] rounded-b-sm shadow-sm">
                                            ADD SECTION
                                        </div>
                                    </div>

                                    {/* TEXT selection box — over the heading */}
                                    <div className="absolute top-[26%] left-[2%] w-[47%] h-[17%] border-[1.5px] border-[#FF5501]/50 z-20 pointer-events-none">
                                        <div className="absolute -top-[14px] left-0 bg-[#FF5501] text-white text-[7px] font-mono tracking-[0.12em] px-2 py-[2px] rounded-t-sm uppercase">
                                            TEXT
                                        </div>
                                        <SelectionHandle className="-top-[3px] -left-[3px]" />
                                        <SelectionHandle className="-top-[3px] -right-[3px]" />
                                        <SelectionHandle className="-bottom-[3px] -left-[3px]" />
                                        <SelectionHandle className="-bottom-[3px] -right-[3px]" />
                                        <SelectionHandle className="-top-[3px] left-1/2 -translate-x-1/2" />
                                        <SelectionHandle className="-bottom-[3px] left-1/2 -translate-x-1/2" />
                                        <SelectionHandle className="top-1/2 -translate-y-1/2 -left-[3px]" />
                                        <SelectionHandle className="top-1/2 -translate-y-1/2 -right-[3px]" />
                                    </div>

                                    {/* ADD BLOCK — below the CTA button */}
                                    <div className="absolute top-[85%] left-[4%] z-20">
                                        <div className="bg-transparent rounded border border-dotted border-[#FF5501] px-1.5 sm:px-2 py-1.5 flex items-center gap-1 hover:bg-[#FF5501]/10 transition-colors">
                                            <span className="text-[#FF5501] text-[10px] leading-none font-medium">+</span>
                                            <span className="text-[#FF5501] text-[7px] sm:text-[8px] font-mono tracking-wider uppercase">ADD BLOCK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GLASSMORPHIC BADGES */}

                            {/* Custom Icons — top right */}
                            <div className="ws-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_BRACKETS} color="#1a1512" size={14} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Custom Icons</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Site Typography — left side */}
                            <div className="ws-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[#1a1512] text-[28px] leading-none font-serif italic">
                                            Aa
                                        </span>
                                        <span className="text-[#1a1512]/50 font-mono text-[9px] tracking-[0.12em]">
                                            Site Typography
                                        </span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Color Palette — hanging off bottom edge */}
                            <div className="ws-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-[#0d1617] ring-1 ring-black/[0.08]" />
                                        <div className="w-5 h-5 rounded-full bg-[#2d3e50] ring-1 ring-black/[0.08]" />
                                        <div className="w-5 h-5 rounded-full bg-[#fbf5f3] ring-1 ring-black/[0.08]" />
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Responsive — right side, above finished site */}
                            <div className="ws-badge absolute top-[28%] -right-3 sm:-right-8 lg:-right-10 z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2">
                                        <BitmapIcon grid={ICON_RESPONSIVE} color="#1a1512" size={14} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Responsive</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* FINISHED WEBSITE — bottom right */}
                            <div className="ws-badge absolute -bottom-10 right-0 z-30 w-[44%] overflow-hidden rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_16px_42px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 sm:-bottom-14 sm:-right-3 sm:w-[55%] lg:-right-6">
                                <div className="h-6 bg-[#f4f4f4] flex items-center px-2.5 gap-2 border-b border-black/[0.05]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="flex-1 flex items-center h-3.5 bg-white border border-black/[0.05] rounded px-2 mx-1">
                                        <span className="text-[6px] text-black/40 font-mono truncate">eos615.com</span>
                                    </div>
                                </div>
                                <Image
                                    src="/eos6152.png"
                                    alt="Finished website"
                                    width={500}
                                    height={350}
                                    className="object-cover object-top w-full h-auto"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
