'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
    year: string;
    title: string;
    description: string;
    isCurrent?: boolean;
}

const MILESTONES: Milestone[] = [
    {
        year: '2023',
        title: 'Founded in Nashville',
        description: 'Spencer Donaldson launches Captive Demand from Nashville, TN, with a mission to build high-agency digital experiences for local businesses.',
    },
    {
        year: '2023',
        title: 'First 10 Clients',
        description: 'Within the first six months, we delivered websites, SEO strategies, and email campaigns to 10 businesses across Tennessee.',
    },
    {
        year: '2024',
        title: 'Service Expansion',
        description: 'Added custom software development and marketing automation to our service offerings. Hired our first full-time team members.',
    },
    {
        year: '2025',
        title: 'Crossed $2M in Client Revenue',
        description: 'Our clients collectively crossed $2M in revenue generated through the campaigns, sites, and funnels we built for them.',
    },
    {
        year: '2026',
        title: 'What\'s Next',
        description: 'Expanding our team, launching a product studio, and continuing to prove that small teams with high agency outperform large agencies with low conviction.',
        isCurrent: true,
    },
];

export function Timeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.timeline-header', {
                opacity: 0, y: 30,
                duration: 0.8, ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                            end: 'bottom 40%',
                            scrub: true,
                        },
                    }
                );
            }

            const entries = sectionRef.current?.querySelectorAll('.timeline-entry');
            entries?.forEach((entry) => {
                gsap.from(entry, {
                    opacity: 0, y: 40,
                    duration: 0.8, ease: 'power4.out',
                    scrollTrigger: {
                        trigger: entry,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="timeline-header mb-12 md:mb-16">
                    <EyebrowHeading category="Journey" label="Our Timeline" />
                    <h2
                        className="text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-[1.1] tracking-tighter mt-6"
                        style={{ fontFamily: 'Nohemi, sans-serif' }}
                    >
                        <span className="text-[#1a1512] font-medium block">From idea</span>
                        <span className="text-[#d5d5d5] font-light block">to impact.</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#e8e8e8]">
                        <div
                            ref={lineRef}
                            className="absolute inset-0 bg-[#E8480C] origin-top"
                            style={{ transformOrigin: 'top center' }}
                        />
                    </div>

                    {/* Entries */}
                    <div className="flex flex-col gap-12 md:gap-16">
                        {MILESTONES.map((milestone, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className="timeline-entry relative flex items-start"
                                >
                                    {/* Node */}
                                    <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full border-2 ${milestone.isCurrent ? 'bg-[#E8480C] border-[#E8480C] shadow-[0_0_8px_rgba(232,72,12,0.4)]' : 'bg-white border-[#E8480C]'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className={`w-full pl-14 md:pl-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                                        <span
                                            className={`inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-3 ${
                                                milestone.isCurrent
                                                    ? 'bg-[#E8480C] text-white'
                                                    : 'bg-[#f3f4f6] text-[#1a1512]/50'
                                            }`}
                                        >
                                            {milestone.year}
                                        </span>
                                        <h3
                                            className="text-[20px] md:text-[22px] text-[#1a1512] tracking-tight mb-2"
                                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                                        >
                                            {milestone.title}
                                        </h3>
                                        <p className="text-[14px] md:text-[15px] leading-relaxed text-[#1a1512]/50">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
