'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

function GlassBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`relative rounded-[4px] border shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${className}`}
            style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
        >
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

const ICON_BRAIN = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,0,0,1,1,0],
    [1,1,0,1,1,0,1,1],
    [1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1],
    [1,1,0,1,1,0,1,1],
    [0,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,0,0],
];

const ICON_PLUG = [
    [0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
];

const ICON_CHECK = [
    [0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,1],
    [0,0,0,0,0,1,1,0],
    [0,0,0,0,1,1,0,0],
    [1,0,0,1,1,0,0,0],
    [1,1,1,1,0,0,0,0],
    [0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];

const ICON_CLOCK = [
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,0,0,1,0,0,0,1],
    [1,0,0,1,0,0,0,1],
    [1,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
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

function DashboardNode({ label, sublabel, icon, accent = false }: { label: string; sublabel?: string; icon: React.ReactNode; accent?: boolean }) {
    return (
        <div className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${accent ? 'bg-[#ff5501]/[0.06] border-[#ff5501]/20' : 'bg-white border-[#e5e5e5]'}`}>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${accent ? 'bg-[#ff5501]/10 text-[#ff5501]' : 'bg-[#f3f4f6] text-[#1a1512]/50'}`}>{icon}</div>
            <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] text-[#1a1512]/80 tracking-wide whitespace-nowrap leading-tight">{label}</span>
                {sublabel && <span className="font-mono text-[7px] sm:text-[8px] text-[#1a1512]/30 tracking-wider">{sublabel}</span>}
            </div>
            <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                <span className="relative flex h-1.5 w-1.5"><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#28c840]" /></span>
            </div>
        </div>
    );
}

const pulseKeyframes = `
@keyframes flowPulse {
    0% { offset-distance: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
}
`;

export function AutomationHero() {
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
            gsap.from('.auto-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
                onComplete: measure,
            });
            gsap.from('.auto-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.auto-badge', {
                opacity: 0, scale: 0.8, y: 20,
                duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 1.0,
            });
        }, containerRef);
        return () => ctx.revert();
    }, [measure]);

    return (
        <section ref={(el) => { sectionRef.current = el; (containerRef as React.MutableRefObject<HTMLElement | null>).current = el; }} className="relative w-full h-full min-h-screen overflow-hidden bg-[#FAFAFA]">
            <style dangerouslySetInnerHTML={{ __html: pulseKeyframes }} />
            <NoiseOverlay />
            <ArchitecturalGrid positions={gridPos} />

            <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-24 md:pb-36">
                <div ref={flexRowRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* LEFT — Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left pl-[10px] sm:pl-10 lg:pl-0">
                        <div className="auto-hero-text mb-6">
                            <EyebrowHeading category="Service" label="Marketing Automation" />
                        </div>
                        <h1
                            ref={headingRef}
                            className="auto-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            If it&apos;s boring,<AccentBr />
                            <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                                    we automate it.
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
                        <p ref={paragraphRef} className="auto-hero-text text-[15px] md:text-base text-[#1a1512]/60 font-mono mb-10 max-w-md leading-relaxed">
                            We build custom automation workflows that eliminate repetitive tasks, connect your tools, and keep your business running — without adding to your team&apos;s workload. From CRM pipelines to AI-powered agents, we design systems that work while you sleep.
                        </p>
                        <div className="auto-hero-text flex flex-col items-start">
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

                    {/* RIGHT — Automation Command Center */}
                    <div className="w-full lg:w-[62%] relative auto-hero-image pt-6 pb-16 px-0 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* MAIN FRAME — Automation Command Center */}
                            <div ref={editorFrameRef} className="absolute inset-0 rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_8px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 overflow-hidden flex flex-col">
                                {/* Header Bar */}
                                <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-3 flex items-center justify-between border-b border-[#e5e5e5]">
                                    <div className="flex items-center gap-3">
                                        <div className="font-mono text-[10px] sm:text-xs tracking-[0.15em] text-[#1a1512]/40 uppercase">Automation Hub</div>
                                        <div className="h-3 w-[1px] bg-[#e5e5e5]" />
                                        <div className="text-sm sm:text-base font-medium tracking-tight text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>Client Onboarding</div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#28c840]/10 border border-[#28c840]/20">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-40" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                                        </span>
                                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-[#28c840] font-medium">Live</span>
                                    </div>
                                </div>

                                {/* Branching Workflow — uses CSS grid for precise alignment */}
                                <div className="flex-1 relative px-4 sm:px-6 py-4 sm:py-5">
                                    {/* SVG lines drawn between grid cells via percentage coords */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#E8480C" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#E8480C" stopOpacity="0.3" />
                                            </linearGradient>
                                        </defs>
                                        {/* Trigger right-edge (30%, 50%) → HubSpot left-edge (52%, 18%) */}
                                        <path d="M 30 50 C 41 50, 41 18, 52 18" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" strokeLinecap="round" id="path1" />
                                        {/* Trigger right-edge (30%, 50%) → Email left-edge (52%, 50%) */}
                                        <path d="M 30 50 C 41 50, 41 50, 52 50" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" strokeLinecap="round" id="path2" />
                                        {/* Trigger right-edge (30%, 50%) → Slack left-edge (52%, 82%) */}
                                        <path d="M 30 50 C 41 50, 41 82, 52 82" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" strokeLinecap="round" id="path3" />

                                        {/* Animated dots */}
                                        <circle r="0.8" fill="#E8480C">
                                            <animateMotion dur="2.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                                                <mpath href="#path1" />
                                            </animateMotion>
                                            <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" />
                                        </circle>
                                        <circle r="0.8" fill="#E8480C">
                                            <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.4s" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                                                <mpath href="#path2" />
                                            </animateMotion>
                                            <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
                                        </circle>
                                        <circle r="0.8" fill="#E8480C">
                                            <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.8s" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                                                <mpath href="#path3" />
                                            </animateMotion>
                                            <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="0.8s" />
                                        </circle>

                                        {/* Glow */}
                                        <path d="M 30 50 C 41 50, 41 18, 52 18" fill="none" stroke="#E8480C" strokeWidth="1.5" strokeLinecap="round" opacity="0.08" />
                                        <path d="M 30 50 C 41 50, 41 50, 52 50" fill="none" stroke="#E8480C" strokeWidth="1.5" strokeLinecap="round" opacity="0.08" />
                                        <path d="M 30 50 C 41 50, 41 82, 52 82" fill="none" stroke="#E8480C" strokeWidth="1.5" strokeLinecap="round" opacity="0.08" />
                                    </svg>

                                    {/* Nodes positioned via grid to match SVG coords */}
                                    <div className="relative z-10 grid h-full" style={{ gridTemplateColumns: '30% 1fr 48%', gridTemplateRows: '1fr 1fr 1fr' }}>
                                        {/* Trigger — spans all 3 rows, centered vertically in the left column */}
                                        <div className="row-span-3 flex items-center pr-2">
                                            <DashboardNode
                                                label="New Lead Submitted"
                                                sublabel="Last run: 2m ago"
                                                accent
                                                icon={
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                    </svg>
                                                }
                                            />
                                        </div>

                                        {/* Spacer column for the bezier lines */}
                                        <div className="row-span-3" />

                                        {/* Action 1 — top row */}
                                        <div className="flex items-center">
                                            <DashboardNode
                                                label="Add to HubSpot"
                                                sublabel="CRM sync"
                                                icon={
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                }
                                            />
                                        </div>

                                        {/* Action 2 — middle row */}
                                        <div className="flex items-center">
                                            <DashboardNode
                                                label="Send Welcome Email"
                                                sublabel="Sequence #1"
                                                icon={
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                        <polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                }
                                            />
                                        </div>

                                        {/* Action 3 — bottom row */}
                                        <div className="flex items-center">
                                            <DashboardNode
                                                label="Create Slack Channel"
                                                sublabel="#client-onboard"
                                                icon={
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
                                                        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                                        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
                                                        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
                                                        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
                                                        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                                                        <path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z" />
                                                        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
                                                    </svg>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Stats Bar */}
                                <div className="border-t border-[#e5e5e5] px-5 sm:px-6 py-2.5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-[8px] sm:text-[9px] text-[#1a1512]/30 tracking-wider uppercase">3 actions</span>
                                        <span className="font-mono text-[8px] sm:text-[9px] text-[#1a1512]/30 tracking-wider uppercase">0 errors</span>
                                    </div>
                                    <span className="font-mono text-[8px] sm:text-[9px] text-[#1a1512]/30 tracking-wider">Last triggered 2m ago</span>
                                </div>
                            </div>

                            {/* GLASSMORPHIC BADGES */}

                            <div className="auto-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_BRAIN} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">AI-Powered</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            <div className="auto-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_CHECK} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Zero Manual Work</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            <div className="auto-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_CLOCK} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">24/7 Autopilot</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            <div className="auto-badge absolute top-[28%] -right-3 sm:-right-8 lg:-right-10 z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_PLUG} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Custom Integrations</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* OUTCOME CARD — bottom right, glassmorphic */}
                            <div className="auto-badge absolute -bottom-10 right-0 z-30 w-[44%] overflow-hidden rounded-[4px] bg-white/60 backdrop-blur-[12px] border border-white/50 shadow-[0_16px_42px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#d5d5d5]/40 sm:-bottom-14 sm:-right-3 sm:w-[50%] lg:-right-6">
                                <div className="absolute -top-[1px] -left-[1px] w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#d5d5d5] rounded-tl-[4px] pointer-events-none z-20" />
                                <div className="absolute -bottom-[1px] -right-[1px] w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#d5d5d5] rounded-br-[4px] pointer-events-none z-20" />
                                <div className="p-4 sm:p-5 relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                            <polyline points="17 6 23 6 23 12" />
                                        </svg>
                                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] text-[#28c840] uppercase">This Month</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                            42 hrs saved
                                        </span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2.5" className="flex-shrink-0">
                                            <path d="M7 17l5-5 5 5" />
                                            <path d="M7 11l5-5 5 5" />
                                        </svg>
                                    </div>
                                    <span className="font-mono text-[9px] sm:text-[10px] text-[#1a1512]/40 tracking-wide">
                                        127 workflows completed
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
