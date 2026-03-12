'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 312, suffix: '%', label: 'Avg. Traffic Increase', sublabel: 'Across all client campaigns' },
    { value: 47, suffix: '%', label: 'More Conversions', sublabel: 'From organic search traffic' },
    { value: 3, suffix: 'x', label: 'AI Citation Rate', sublabel: 'vs. industry average' },
    { value: 90, suffix: '+', label: 'Keywords in Top 10', sublabel: 'Per client on average' },
];

export function ResultsShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            counterRefs.current.forEach((el, index) => {
                if (!el) return;

                const target = stats[index].value;

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
                                el.textContent = Math.floor(this.targets()[0].val).toString();
                            }
                        },
                    }
                );
            });

            const cards = sectionRef.current?.querySelectorAll('.stat-card');
            if (cards) {
                gsap.from(cards, {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power4.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 px-4 relative overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)',
            }}
        >
            <NoiseOverlay />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="font-mono text-sm tracking-wider text-white/30 uppercase block mb-4">
                        / RESULTS
                    </span>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl mx-auto tracking-tighter"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        Numbers that speak<AccentBr />
                        <span className="text-white/30">louder than promises.</span>
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-white/[0.03]"
                            style={{
                                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 40px -15px rgba(0,0,0,0.3)',
                            }}
                        >
                            <div className="flex items-baseline gap-1 mb-4">
                                <span
                                    ref={(el) => { counterRefs.current[index] = el; }}
                                    className="text-5xl md:text-6xl text-white tracking-tighter"
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
                            <h3 className="text-base text-white mb-1" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}>
                                {stat.label}
                            </h3>
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
