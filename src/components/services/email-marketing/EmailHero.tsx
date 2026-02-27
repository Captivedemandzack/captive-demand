'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import MockBrowserWindow from '@/components/ui/MockBrowserWindow';
import { Mail, TrendingUp, MousePointerClick, Users } from 'lucide-react';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

function EmailDashboardMockup() {
    return (
        <div className="w-full bg-[#1a1512] p-6 md:p-8 min-h-[320px] md:min-h-[420px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'OPEN RATE', value: '68.4%', icon: Mail, delta: '+12.3%' },
                    { label: 'CLICK RATE', value: '24.1%', icon: MousePointerClick, delta: '+8.7%' },
                    { label: 'SUBSCRIBERS', value: '12,847', icon: Users, delta: '+342' },
                    { label: 'REVENUE', value: '$48.2k', icon: TrendingUp, delta: '+22.1%' },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl"
                        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.2)' }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <stat.icon size={14} strokeWidth={1.5} className="text-white/40" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{stat.label}</span>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                            {stat.value}
                        </div>
                        <span className="font-mono text-[10px] text-[#ff5501]">{stat.delta}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { subject: 'Welcome to the family', status: 'SENT', opens: '72%' },
                    { subject: 'Your cart misses you', status: 'ACTIVE', opens: '61%' },
                    { subject: 'Exclusive: Early access', status: 'SCHEDULED', opens: '--' },
                ].map((campaign, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-white/[0.03] border border-white/10 p-4"
                        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08)' }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                campaign.status === 'ACTIVE'
                                    ? 'bg-[#ff5501]/20 text-[#ff5501]'
                                    : campaign.status === 'SENT'
                                        ? 'bg-white/10 text-white/60'
                                        : 'bg-white/5 text-white/40'
                            }`}>
                                {campaign.status}
                            </span>
                            <span className="font-mono text-[10px] text-white/30">{campaign.opens} open</span>
                        </div>
                        <p className="text-sm text-white/80 font-medium leading-snug">{campaign.subject}</p>
                        <div className="mt-3 w-full h-1 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#ff5501] to-[#ff5501]/60"
                                style={{ width: campaign.opens === '--' ? '0%' : campaign.opens }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function EmailHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const targets = [
                labelRef.current,
                headlineRef.current,
                subtextRef.current,
                ctaRef.current,
                trustRef.current,
            ].filter(Boolean);

            gsap.set(targets, { opacity: 0, y: 30, filter: 'blur(8px)' });
            gsap.set(mockupRef.current, { opacity: 0, y: 60 });

            gsap.to(targets, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power4.out',
                stagger: 0.08,
            });

            gsap.to(mockupRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.4,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-[#FAFAFA] pt-36 md:pt-52 pb-20 md:pb-32 px-4 overflow-hidden">
            <NoiseOverlay opacity={0.02} className="z-50" />
            <div className="container mx-auto max-w-5xl text-center relative z-10">
                <div ref={labelRef} className="inline-block mb-6">
                    <EyebrowHeading category="Service:" label="Email Marketing" />
                </div>

                <h1
                    ref={headlineRef}
                    className="text-5xl md:text-7xl lg:text-[5.5rem] text-[#1a1512] mb-8 tracking-tighter leading-[0.95]"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                >
                    They open your emails.<br />
                    <span className="text-[#1a1512]/40">You close the deals.</span>
                </h1>

                <p
                    ref={subtextRef}
                    className="font-mono text-sm md:text-base text-[#1a1512]/60 max-w-xl mx-auto mb-10 leading-relaxed uppercase tracking-wide"
                >
                    Automated flows and campaigns engineered to convert subscribers into revenue, on autopilot.
                </p>

                <div ref={ctaRef} className="flex justify-center mb-10">
                    <AnimatedCTAButton />
                </div>

                <div ref={trustRef} className="flex items-center justify-center gap-3 mb-16 md:mb-24">
                    <div className="flex -space-x-2">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-8 h-8 rounded-full border-2 border-[#FAFAFA] bg-gradient-to-br from-[#ff5501]/80 to-[#1a1512]"
                                style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15)' }}
                            />
                        ))}
                    </div>
                    <span className="font-mono text-xs text-[#1a1512]/50 uppercase tracking-wider">
                        Trusted by 50+ brands
                    </span>
                </div>

                <div ref={mockupRef} className="w-full max-w-4xl mx-auto">
                    <MockBrowserWindow>
                        <EmailDashboardMockup />
                    </MockBrowserWindow>
                </div>
            </div>
        </section>
    );
}
