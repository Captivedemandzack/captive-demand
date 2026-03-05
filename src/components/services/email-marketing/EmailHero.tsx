'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

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

const ICON_DYNAMIC = [
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,0,0,1,1,0,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
];

const ICON_AB = [
    [1,1,1,0,1,1,1,0],
    [1,0,0,1,1,0,0,1],
    [1,0,0,1,1,0,0,1],
    [1,1,1,1,1,1,1,0],
    [1,0,0,1,1,0,0,1],
    [1,0,0,1,1,0,0,1],
    [1,0,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0],
];

const ICON_FLOW = [
    [0,0,0,1,1,0,0,0],
    [0,0,1,0,0,1,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,0],
    [1,0,0,0,0,0,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
];

const ICON_RATE = [
    [0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,1],
    [0,0,0,0,1,0,1,1],
    [0,0,0,1,1,0,1,1],
    [0,0,0,1,1,0,1,1],
    [0,1,0,1,1,0,1,1],
    [0,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
];

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

function DashedConnector({ className }: { className?: string }) {
    return (
        <div
            className={`absolute pointer-events-none z-30 ${className}`}
            style={{
                borderTop: '1.5px dashed rgba(26,21,18,0.12)',
            }}
        />
    );
}

export function EmailHero() {
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
            gsap.from('.em-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
                onComplete: measure,
            });
            gsap.from('.em-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.em-badge', {
                opacity: 0, scale: 0.8, y: 20,
                duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 1.0,
            });
        }, containerRef);
        return () => {
            try {
                ctx.revert();
            } catch {
                // DOM may already be torn down by React; ignore removeChild errors
            }
        };
    }, [measure]);

    return (
        <section ref={(el) => { sectionRef.current = el; (containerRef as React.MutableRefObject<HTMLElement | null>).current = el; }} className="relative w-full h-full min-h-screen overflow-hidden bg-[#FAFAFA]">
            <NoiseOverlay />
            <ArchitecturalGrid positions={gridPos} />

            <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-24 md:pb-36">
                <div ref={flexRowRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* LEFT — Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left pl-[10px] sm:pl-10 lg:pl-0">
                        <div className="em-hero-text mb-6">
                            <EyebrowHeading category="Service" label="Email Marketing" />
                        </div>
                        <h1
                            ref={headingRef}
                            className="em-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            <span className="whitespace-nowrap">Opened emails,</span>
                            <br />
                            <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                                    lead to deals.
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
                        <p ref={paragraphRef} className="em-hero-text text-[15px] md:text-base text-[#1a1512]/60 font-mono mb-10 max-w-md leading-relaxed">
                            Automated flows and campaigns engineered to convert subscribers into revenue, on autopilot. We build email systems that nurture, convert, and scale — without adding to your workload.
                        </p>
                        <div className="em-hero-text flex flex-col items-start">
                            <AnimatedCTAButton />
                        </div>
                    </div>

                    {/* RIGHT — Email Builder Visual Composition */}
                    <div className="w-full lg:w-[62%] relative em-hero-image pt-6 pb-16 px-0 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* MAIN CARD — Skeleton Email Builder */}
                            <div ref={editorFrameRef} className="absolute inset-0 rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_8px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 overflow-hidden flex">

                                {/* Left Sidebar — Draggable Element Blocks */}
                                <div className="w-[22%] border-r border-[#1a1512]/[0.06] bg-white/30 flex flex-col p-3 sm:p-4 gap-2 sm:gap-2.5 flex-shrink-0">
                                    <div className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] text-[#1a1512]/30 uppercase mb-1 sm:mb-2">Elements</div>
                                    {[
                                        { label: 'Image', h: 'h-6 sm:h-8' },
                                        { label: 'Headline', h: 'h-4 sm:h-5' },
                                        { label: 'Text', h: 'h-5 sm:h-7' },
                                        { label: 'Button', h: 'h-4 sm:h-5' },
                                        { label: 'Divider', h: 'h-2 sm:h-3' },
                                        { label: 'Columns', h: 'h-5 sm:h-7' },
                                    ].map((block, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <span className="font-mono text-[6px] sm:text-[7px] text-[#1a1512]/25 uppercase tracking-wider">{block.label}</span>
                                            <div className={`w-full ${block.h} rounded-[3px] bg-[#1a1512]/[0.04] border border-dashed border-[#1a1512]/[0.08]`} />
                                        </div>
                                    ))}
                                </div>

                                {/* Main Canvas — Skeleton Email Template */}
                                <div className="flex-1 flex flex-col items-center p-4 sm:p-6 overflow-hidden bg-[#f8f7f6]/50">
                                    {/* Canvas Header */}
                                    <div className="w-full flex items-center justify-between mb-3 sm:mb-4">
                                        <div className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] text-[#1a1512]/30 uppercase">Email Canvas</div>
                                        <div className="flex gap-1.5">
                                            <div className="w-4 sm:w-5 h-3 sm:h-3.5 rounded-[2px] bg-[#1a1512]/[0.06] border border-[#1a1512]/[0.06]" />
                                            <div className="w-4 sm:w-5 h-3 sm:h-3.5 rounded-[2px] bg-[#1a1512]/[0.04] border border-[#1a1512]/[0.06]" />
                                        </div>
                                    </div>

                                    {/* Email Template Body */}
                                    <div className="w-full max-w-[85%] bg-white rounded-[4px] border border-[#1a1512]/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
                                        {/* Hero Image Placeholder */}
                                        <div className="w-full aspect-[16/7] bg-gradient-to-br from-[#1a1512]/[0.05] to-[#1a1512]/[0.02] relative flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#1a1512]/15">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="M21 15l-5-5L5 21" />
                                            </svg>
                                        </div>

                                        {/* Email Content */}
                                        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-2.5 sm:gap-3">
                                            {/* Brand Logo Placeholder */}
                                            <div className="w-16 sm:w-20 h-3 sm:h-3.5 bg-[#1a1512]/[0.08] rounded-[2px]" />

                                            {/* Headline */}
                                            <div className="flex flex-col gap-1">
                                                <div className="w-[90%] h-3 sm:h-3.5 bg-[#1a1512]/[0.14] rounded-[2px]" />
                                                <div className="w-[60%] h-3 sm:h-3.5 bg-[#1a1512]/[0.14] rounded-[2px]" />
                                            </div>

                                            {/* Body Text */}
                                            <div className="flex flex-col gap-1 mt-1">
                                                <div className="w-full h-1.5 sm:h-2 bg-[#1a1512]/[0.05] rounded-full" />
                                                <div className="w-[95%] h-1.5 sm:h-2 bg-[#1a1512]/[0.05] rounded-full" />
                                                <div className="w-[70%] h-1.5 sm:h-2 bg-[#1a1512]/[0.05] rounded-full" />
                                            </div>

                                            {/* CTA Button */}
                                            <div className="mt-1 sm:mt-2">
                                                <div className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-[6px] bg-[#ff5501] shadow-[0_2px_0_0_rgba(204,51,0,0.8),0_4px_12px_rgba(255,85,1,0.25)]">
                                                    <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] text-white uppercase font-medium">Shop Now →</span>
                                                </div>
                                            </div>

                                            {/* Footer Skeleton */}
                                            <div className="flex flex-col gap-1 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#1a1512]/[0.04]">
                                                <div className="w-[45%] h-1 bg-[#1a1512]/[0.04] rounded-full" />
                                                <div className="w-[30%] h-1 bg-[#1a1512]/[0.03] rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BADGES */}

                            {/* DYNAMIC CONTENT — top left, pointing to sidebar */}
                            <div className="em-badge absolute -top-5 left-[2%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_DYNAMIC} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Dynamic Content</span>
                                    </div>
                                </GlassBadge>
                                <DashedConnector className="w-8 top-full left-4 mt-1 rotate-[60deg] origin-top-left" />
                            </div>

                            {/* A/B TESTING — top right, pointing to email CTA */}
                            <div className="em-badge absolute -top-5 right-[5%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_AB} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">A/B Testing</span>
                                    </div>
                                </GlassBadge>
                                <DashedConnector className="w-10 top-full right-6 mt-1 rotate-[120deg] origin-top-right" />
                            </div>

                            {/* KLAVIYO FLOWS — left side, pointing to builder canvas */}
                            <div className="em-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_FLOW} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Klaviyo Flows</span>
                                    </div>
                                </GlassBadge>
                                <DashedConnector className="w-6 sm:w-8 top-1/2 -translate-y-1/2 left-full ml-1" />
                            </div>

                            {/* OPEN RATE — bottom left, near inbox card */}
                            <div className="em-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_RATE} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Open Rate</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* MOBILE INBOX PREVIEW — bottom right overlap */}
                            <div className="em-badge absolute -bottom-10 right-0 z-30 w-[44%] overflow-hidden rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_16px_42px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 sm:-bottom-14 sm:-right-3 sm:w-[55%] lg:-right-6">
                                {/* Mobile Status Bar */}
                                <div className="h-5 sm:h-6 bg-[#f4f4f4] flex items-center justify-between px-2.5 border-b border-black/[0.05]">
                                    <span className="text-[6px] sm:text-[7px] text-black/40 font-mono">9:41</span>
                                    <span className="text-[6px] sm:text-[7px] text-black/40 font-mono tracking-wider uppercase">Inbox</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-1.5 bg-black/20 rounded-[1px]" />
                                        <div className="w-2 h-1.5 bg-black/20 rounded-[1px]" />
                                    </div>
                                </div>

                                {/* Inbox Content */}
                                <div className="p-3 sm:p-4 bg-white space-y-2.5 sm:space-y-3">
                                    {/* Primary Email — New, from brand */}
                                    <div className="relative">
                                        <div className="flex items-start gap-2.5">
                                            <div className="relative flex-shrink-0 mt-0.5">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ff5501] to-[#cc3300] flex items-center justify-center">
                                                    <span className="text-white text-[8px] sm:text-[9px] font-bold">FW</span>
                                                </div>
                                                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#28c840] border-[1.5px] border-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <span className="text-[10px] sm:text-[11px] text-[#1a1512] font-semibold truncate">Fox Wellness</span>
                                                    <span className="text-[7px] sm:text-[8px] text-[#1a1512]/30 font-mono ml-2 flex-shrink-0">2m ago</span>
                                                </div>
                                                <div className="text-[9px] sm:text-[10px] text-[#1a1512]/80 font-medium leading-tight mb-0.5 truncate">
                                                    Your exclusive early access is here
                                                </div>
                                                <div className="text-[8px] sm:text-[9px] text-[#1a1512]/40 leading-tight truncate">
                                                    Hey Sarah, we saved something special for you. Your personalized...
                                                </div>
                                            </div>
                                        </div>
                                        {/* Revenue Indicator */}
                                        <div className="mt-2 inline-flex items-center gap-1.5 bg-[#28c840]/[0.08] rounded-[3px] px-2 py-1">
                                            <div className="w-1 h-1 rounded-full bg-[#28c840]" />
                                            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.1em] uppercase text-[#28c840]/80 font-medium">$48.2k Revenue</span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-[1px] bg-[#1a1512]/[0.05]" />

                                    {/* Faded older emails */}
                                    <div className="opacity-30 space-y-2.5">
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a1512]/[0.06] flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="w-20 h-2 bg-[#1a1512]/10 rounded-full mb-1" />
                                                <div className="w-[80%] h-1.5 bg-[#1a1512]/[0.06] rounded-full mb-0.5" />
                                                <div className="w-[60%] h-1.5 bg-[#1a1512]/[0.04] rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a1512]/[0.06] flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="w-16 h-2 bg-[#1a1512]/10 rounded-full mb-1" />
                                                <div className="w-[70%] h-1.5 bg-[#1a1512]/[0.06] rounded-full mb-0.5" />
                                                <div className="w-[50%] h-1.5 bg-[#1a1512]/[0.04] rounded-full" />
                                            </div>
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
