'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface PartnerLogo {
    name: string;
    src: string;
}

const LOGOS: PartnerLogo[] = [
    { name: 'Client 1', src: '/partner-logo-1.png' },
    { name: 'Client 2', src: '/partner-logo-2.png' },
    { name: 'Client 3', src: '/partner-logo-3.png' },
    { name: 'Client 4', src: '/partner-logo-4.png' },
    { name: 'Client 5', src: '/partner-logo-5.png' },
    { name: 'Client 6', src: '/partner-logo-6.png' },
    { name: 'Client 7', src: '/partner-logo-7.png' },
    { name: 'Client 8', src: '/partner-logo-8.png' },
];

const BADGES = [
    'Clutch Top Agency 2025',
    'Clutch Top Web Developer',
    'Clutch Top SEO Company',
];

export function ClientLogos() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.logos-header', {
                opacity: 0, y: 30,
                duration: 0.8, ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
            gsap.from('.logo-cell', {
                opacity: 0, y: 20, scale: 0.95,
                duration: 0.6, ease: 'power4.out', stagger: 0.06,
                scrollTrigger: {
                    trigger: '.logo-cell',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="logos-header mb-12 md:mb-16">
                    <EyebrowHeading category="Trust" label="Brands We've Worked With" />
                    <h2
                        className="text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-[1.1] tracking-tighter mt-6"
                        style={{ fontFamily: 'Nohemi, sans-serif' }}
                    >
                        <span className="text-[#1a1512] font-medium block">Brands we&apos;ve helped</span>
                        <span className="text-[#d5d5d5] font-light block">grow.</span>
                    </h2>
                </div>

                {/* Logo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {LOGOS.map((logo, i) => (
                        <div
                            key={i}
                            className="logo-cell group relative flex items-center justify-center h-24 md:h-28 rounded-2xl border border-dashed border-[#d5d5d5]/60 bg-white/60 transition-all duration-300 hover:border-[#d5d5d5] hover:bg-white hover:shadow-sm"
                        >
                            <div className="relative w-[60%] h-[40%] grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Clutch Badges */}
                <div className="flex flex-wrap justify-center gap-3">
                    {BADGES.map((badge) => (
                        <span
                            key={badge}
                            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase text-[#1a1512]/50 px-4 py-2 rounded-full border border-[#e8e8e8] bg-white transition-colors hover:border-[#d5d5d5]"
                            style={{
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.03)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8480C]" />
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
