'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
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

const ICON_ARCH = [
    [0,0,0,1,1,0,0,0],
    [0,0,1,0,0,1,0,0],
    [0,1,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,0,0,0,0,1,1],
];

const ICON_SYNC = [
    [0,0,0,1,1,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,0],
    [0,0,0,0,0,1,0,0],
    [0,0,0,1,1,0,0,0],
];

const ICON_LOGIC = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1],
    [1,0,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1],
];

const ICON_CROSS = [
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
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

function DashboardSkeleton() {
    return (
        <div className="flex h-full w-full bg-[#111010] text-white/80 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden sm:flex w-[42px] flex-shrink-0 flex-col items-center pt-4 pb-3 gap-4 border-r border-white/[0.06] bg-[#0c0b0b]">
                <div className="w-5 h-5 rounded bg-[#ff5501]/20 mb-2" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-[3px] ${i === 0 ? 'bg-white/20' : 'bg-white/[0.06]'}`} />
                ))}
                <div className="mt-auto w-4 h-4 rounded-full bg-white/[0.08]" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Command Bar */}
                <div className="h-8 flex items-center px-3 gap-2 border-b border-white/[0.06] shrink-0">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.04] flex-1 max-w-[200px]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full" />
                    </div>
                    <div className="ml-auto flex gap-1.5">
                        <div className="w-5 h-5 rounded bg-white/[0.04]" />
                        <div className="w-5 h-5 rounded bg-white/[0.04]" />
                    </div>
                </div>

                {/* Dashboard Area */}
                <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-hidden">
                    {/* KPI Row */}
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'ACTIVE USERS', value: '24.8K', change: '+12%' },
                            { label: 'REQUESTS/S', value: '1,847', change: '+8%' },
                            { label: 'UPTIME', value: '99.98%', change: '' },
                        ].map((kpi, i) => (
                            <div key={i} className="rounded-md bg-white/[0.03] border border-white/[0.05] p-2">
                                <div className="font-mono text-[6px] sm:text-[7px] text-white/30 uppercase tracking-wider">{kpi.label}</div>
                                <div className="text-[11px] sm:text-sm font-medium text-white/90 leading-tight" style={{ fontFamily: 'Nohemi, sans-serif' }}>{kpi.value}</div>
                                {kpi.change && <span className="text-[6px] sm:text-[7px] text-[#28c840] font-mono">{kpi.change}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div className="rounded-md bg-white/[0.03] border border-white/[0.05] p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-wider">Performance Overview</div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5501]" /><span className="text-[6px] text-white/30 font-mono">CPU</span></div>
                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" /><span className="text-[6px] text-white/30 font-mono">Memory</span></div>
                            </div>
                        </div>
                        <svg viewBox="0 0 300 80" className="w-full h-auto" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="swChartOrange" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ff5501" stopOpacity="0.20" />
                                    <stop offset="100%" stopColor="#ff5501" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="swChartBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0 80 L0 55 C30 50,60 60,90 42 C120 24,150 35,180 20 C210 5,240 15,270 10 L300 8 L300 80Z" fill="url(#swChartOrange)" />
                            <path d="M0 55 C30 50,60 60,90 42 C120 24,150 35,180 20 C210 5,240 15,270 10 L300 8" fill="none" stroke="#ff5501" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M0 80 L0 65 C30 62,60 58,90 55 C120 52,150 48,180 44 C210 40,240 38,270 36 L300 35 L300 80Z" fill="url(#swChartBlue)" />
                            <path d="M0 65 C30 62,60 58,90 55 C120 52,150 48,180 44 C210 40,240 38,270 36 L300 35" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        </svg>
                    </div>

                    {/* Data Table */}
                    <div className="rounded-md bg-white/[0.03] border border-white/[0.05] overflow-hidden">
                        <div className="grid grid-cols-4 gap-0 text-[6px] sm:text-[7px] font-mono text-white/25 uppercase tracking-wider border-b border-white/[0.05] px-2 sm:px-3 py-1.5">
                            <span>Endpoint</span><span>Status</span><span>Latency</span><span>Requests</span>
                        </div>
                        {[
                            { ep: '/api/users', status: 'Healthy', latency: '12ms', req: '45.2K', color: '#28c840' },
                            { ep: '/api/payments', status: 'Healthy', latency: '34ms', req: '12.8K', color: '#28c840' },
                            { ep: '/api/analytics', status: 'Warning', latency: '210ms', req: '8.1K', color: '#febc2e' },
                            { ep: '/api/webhooks', status: 'Healthy', latency: '8ms', req: '92.4K', color: '#28c840' },
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-4 gap-0 text-[7px] sm:text-[8px] font-mono text-white/50 px-2 sm:px-3 py-1.5 border-b border-white/[0.03] last:border-b-0">
                                <span className="text-white/70 truncate">{row.ep}</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: row.color }} />
                                    {row.status}
                                </span>
                                <span>{row.latency}</span>
                                <span>{row.req}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileAppSkeleton() {
    return (
        <div className="bg-white p-3 sm:p-4 space-y-3 h-full flex flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[7px] sm:text-[8px] font-mono text-[#1a1512]/40 uppercase tracking-wider">Dashboard</div>
                    <div className="text-[11px] sm:text-[13px] font-medium text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>Overview</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#ff5501]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#ff5501]/30" />
                </div>
            </div>

            {/* Mini Stat */}
            <div className="rounded-lg bg-[#FAFAFA] border border-[#1a1512]/[0.05] p-2.5">
                <div className="text-[6px] sm:text-[7px] font-mono text-[#1a1512]/40 uppercase tracking-wider mb-0.5">Active Users</div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-[14px] sm:text-[16px] font-medium text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>24.8K</span>
                    <span className="text-[7px] font-mono text-[#28c840]">+12%</span>
                </div>
                {/* Mini Sparkline */}
                <svg viewBox="0 0 80 20" className="w-full h-3 mt-1">
                    <path d="M0 18 C10 16,20 14,30 10 C40 6,50 8,60 4 C70 2,75 3,80 1" fill="none" stroke="#ff5501" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-1.5">
                {['Deploy', 'Monitor'].map((action) => (
                    <div key={action} className="rounded-md bg-[#FAFAFA] border border-[#1a1512]/[0.05] px-2 py-1.5 text-center">
                        <span className="text-[7px] sm:text-[8px] font-mono text-[#1a1512]/60">{action}</span>
                    </div>
                ))}
            </div>

            {/* Primary CTA */}
            <div className="mt-auto">
                <div className="w-full rounded-md bg-[#ff5501] py-1.5 text-center">
                    <span className="text-[7px] sm:text-[8px] font-mono text-white uppercase tracking-wider font-medium">View All Metrics</span>
                </div>
            </div>
        </div>
    );
}

export function SoftwareHero() {
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
            gsap.from('.sw-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
                onComplete: measure,
            });
            gsap.from('.sw-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.sw-badge', {
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

                    {/* LEFT -- Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left pl-[10px] sm:pl-10 lg:pl-0">
                        <div className="sw-hero-text mb-6">
                            <EyebrowHeading category="Service" label="Software Development" />
                        </div>
                        <h1
                            ref={headingRef}
                            className="sw-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 text-[#1a1512]"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            Software that<br />
                            <span className="relative inline-flex items-center justify-center px-5 pt-[0.12em] pb-[0.08em] -mx-5 z-10 overflow-hidden whitespace-nowrap rounded-[6px]">
                                <span className="absolute inset-0 rounded-[6px] bg-white/55 border border-[#d5d5d5]/40 shadow-[0_6px_20px_rgba(15,15,15,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                                <span className="relative text-[#0f0d0a]" style={{ zIndex: 1 }}>
                                    scales with you
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
                        <p ref={paragraphRef} className="sw-hero-text text-[15px] md:text-base text-[#1a1512]/60 font-mono mb-10 max-w-md leading-relaxed">
                            From MVPs to enterprise platforms. We architect, build, and ship production-grade software — custom APIs, dashboards, and full-stack applications engineered for performance at any scale.
                        </p>
                        <div className="sw-hero-text flex flex-col items-start">
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

                    {/* RIGHT -- Dashboard Composition */}
                    <div className="w-full lg:w-[62%] relative sw-hero-image pt-6 pb-16 px-0 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* MAIN FRAME -- SaaS Dashboard */}
                            <div ref={editorFrameRef} className="absolute inset-0 rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_8px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 overflow-hidden">
                                <DashboardSkeleton />
                            </div>

                            {/* GLASSMORPHIC BADGES */}

                            {/* Badge 1: Scalable Architecture -- top left, near sidebar/nav */}
                            <div className="sw-badge absolute -top-5 left-[8%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_ARCH} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Scalable Architecture</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Badge 2: Real-Time Sync -- top right, near chart */}
                            <div className="sw-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_SYNC} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Real-Time Sync</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Badge 3: Custom Logic -- left side, near data table */}
                            <div className="sw-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_LOGIC} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Custom Logic</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Badge 4: Cross-Platform -- bottom left, below main frame */}
                            <div className="sw-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <BitmapIcon grid={ICON_CROSS} />
                                        <span className="text-[#1a1512]/70 font-mono text-[10px] tracking-[0.1em] uppercase">Cross-Platform</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* MOBILE APP CARD -- bottom right, overlapping */}
                            <div className="sw-badge absolute -bottom-10 right-0 z-30 w-[38%] overflow-hidden rounded-[4px] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.78),rgba(255,255,255,0.46))] shadow-[0_16px_42px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(213,213,213,0.5)] backdrop-blur-[12px] ring-1 ring-[#d5d5d5]/70 sm:-bottom-14 sm:-right-3 sm:w-[44%] lg:-right-6">
                                {/* Phone Notch */}
                                <div className="h-5 bg-[#f4f4f4] flex items-center justify-center border-b border-black/[0.05]">
                                    <div className="w-12 h-1.5 rounded-full bg-black/[0.08]" />
                                </div>
                                <MobileAppSkeleton />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
