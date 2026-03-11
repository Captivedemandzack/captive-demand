'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
}

const STATS: Stat[] = [
    { value: 50, suffix: '+', label: 'Projects Delivered', sublabel: 'Across industries' },
    { value: 8, suffix: '+', label: 'Industries Served', sublabel: 'Deep sector knowledge' },
    { value: 2, suffix: 'M+', label: 'Revenue Generated', sublabel: 'For our clients' },
    { value: 3, suffix: '+', label: 'Years in Business', sublabel: 'And counting' },
];

export function AboutStats() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll('.stat-card');
            if (!cards) return;

            gsap.from(cards, {
                opacity: 0, y: 40,
                duration: 0.8, ease: 'power4.out', stagger: 0.08,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            const counters = sectionRef.current?.querySelectorAll('.stat-counter');
            counters?.forEach((el) => {
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                gsap.fromTo(
                    { val: 0 },
                    { val: target },
                    {
                        val: target,
                        duration: 2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                        onUpdate: function () {
                            if (el) {
                                (el as HTMLElement).textContent = Math.floor(this.targets()[0].val).toString();
                            }
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 md:py-32 px-4 relative overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)',
            }}
        >
            <NoiseOverlay />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-mono text-sm tracking-wider text-white/30 uppercase block mb-4">
                        / Results
                    </span>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl mx-auto tracking-tighter"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        Numbers that speak<AccentBr />
                        <span className="text-white/30">louder than promises.</span>
                    </h2>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-card rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-white/[0.03]"
                            style={{
                                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 40px -15px rgba(0,0,0,0.3)',
                            }}
                        >
                            <div className="flex items-baseline gap-1 mb-3">
                                <span
                                    className="stat-counter text-5xl md:text-6xl text-white tracking-tighter"
                                    data-target={stat.value}
                                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                                >
                                    0
                                </span>
                                <span
                                    className="text-3xl md:text-4xl text-[#ff5501]"
                                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                                >
                                    {stat.suffix}
                                </span>
                            </div>
                            <p
                                className="text-base text-white mb-1"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                            >
                                {stat.label}
                            </p>
                            <p className="font-mono text-[11px] text-white/30 uppercase tracking-wider">
                                {stat.sublabel}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
