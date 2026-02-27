'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Workflow,
    FlaskConical,
    Users,
    DollarSign,
    Palette,
    ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

const features = [
    {
        icon: Workflow,
        title: 'Automated Drip Sequences',
        description: 'Welcome flows, nurture series, and re-engagement campaigns that run 24/7 without lifting a finger.',
    },
    {
        icon: FlaskConical,
        title: 'A/B Subject Line Testing',
        description: 'Data-driven subject line optimization. We test opens, not guesses, to maximize every send.',
    },
    {
        icon: Users,
        title: 'Advanced Segmentation',
        description: 'Behavioral, demographic, and lifecycle segments that deliver the right message to the right inbox.',
    },
    {
        icon: DollarSign,
        title: 'Revenue Attribution',
        description: 'Track every dollar back to the exact email that generated it. Know your true ROI per campaign.',
    },
    {
        icon: Palette,
        title: 'Template Design System',
        description: 'On-brand, mobile-first templates engineered for deliverability and visual consistency at scale.',
    },
    {
        icon: ShieldCheck,
        title: 'Deliverability Monitoring',
        description: 'SPF, DKIM, domain reputation tracking. We keep you out of spam and in the primary inbox.',
    },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const Icon = feature.icon;
    return (
        <div
            className="feature-card group relative rounded-2xl bg-[#f3f4f6] p-8 transition-all duration-300 cursor-default"
            style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03)',
            }}
        >
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.06)',
                    transform: 'translateY(-4px)',
                }}
            />
            <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="mb-6 w-12 h-12 rounded-xl bg-[#ff5501] flex items-center justify-center text-white"
                    style={{ boxShadow: '0 2px 0 0 rgba(204,51,0,0.8), 0 4px 12px rgba(255,85,1,0.3)' }}
                >
                    <Icon size={22} strokeWidth={1.5} />
                </div>
                <h4
                    className="text-lg text-[#1a1512] mb-2 font-medium"
                    style={{ fontFamily: 'Nohemi, sans-serif' }}
                >
                    {feature.title}
                </h4>
                <p className="text-sm text-[#1a1512]/60 font-mono leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </div>
    );
}

export function EmailFeatures() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
            gsap.set(cards, { opacity: 0, y: 40 });

            ScrollTrigger.batch(cards, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power4.out',
                        stagger: 0.08,
                    });
                },
                start: 'top 88%',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div>
                            <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                                / CAPABILITIES
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Every campaign,<br />
                                <span className="text-[#1a1512]/40">engineered.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                Full-stack email infrastructure from strategy to send. No fluff, just systems that convert.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
