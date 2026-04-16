"use client";

import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { CTAButton } from '@/components/ui/CTAButton';

export function FeaturesSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // PERF FIX: Use gsap.context() for safe cleanup
        let ctx = gsap.context(() => {
            const lineMasks = document.querySelectorAll('.line-mask');

            lineMasks.forEach((mask) => {
                const revealText = mask.querySelector('.reveal-text');
                if (revealText) {
                    gsap.from(revealText, {
                        y: '100%',
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: mask,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Animated dots pattern
    const centerX = 90;
    const centerY = 90;
    const dots = [
        { x: centerX, y: centerY },
        { x: centerX, y: centerY - 20 }, { x: centerX, y: centerY - 40 }, { x: centerX, y: centerY - 60 },
        { x: centerX, y: centerY + 20 }, { x: centerX, y: centerY + 40 }, { x: centerX, y: centerY + 60 },
        { x: centerX - 20, y: centerY }, { x: centerX - 40, y: centerY }, { x: centerX - 60, y: centerY },
        { x: centerX + 20, y: centerY }, { x: centerX + 40, y: centerY }, { x: centerX + 60, y: centerY },
        { x: centerX - 15, y: centerY - 15 }, { x: centerX - 30, y: centerY - 30 }, { x: centerX - 45, y: centerY - 45 },
        { x: centerX + 15, y: centerY + 15 }, { x: centerX + 30, y: centerY + 30 }, { x: centerX + 45, y: centerY + 45 },
        { x: centerX + 15, y: centerY - 15 }, { x: centerX + 30, y: centerY - 30 }, { x: centerX + 45, y: centerY - 45 },
        { x: centerX - 15, y: centerY + 15 }, { x: centerX - 30, y: centerY + 30 }, { x: centerX - 45, y: centerY + 45 },
    ];

    return (
        <section ref={containerRef} className="relative w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Large Card */}
                <div className="relative bg-[#E8E8E8] rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)' }}>

                    {/* Corner Rivets */}
                    <div className="absolute top-5 left-5 w-[7px] h-[7px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                    <div className="absolute top-5 right-5 w-[7px] h-[7px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                    <div className="absolute bottom-5 left-5 w-[7px] h-[7px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                    <div className="absolute bottom-5 right-5 w-[7px] h-[7px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />

                    {/* Mobile: h2 → mono → features → CTA. Desktop: header row; cols = mono+dots | features */}
                    <div className="relative grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-x-8 md:gap-y-8">
                        {/* Vertical Divider (desktop) */}
                        <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-black/10" />

                        {/* Row 1 (desktop): full width — h2 + CTA */}
                        <div className="mb-3 flex flex-col gap-3 pt-5 md:mb-0 md:pt-0 md:flex-row md:col-span-2 md:items-center md:justify-between md:gap-4">
                            <div className="line-mask w-full min-w-0 max-w-full overflow-hidden">
                                <h2
                                    ref={headingRef}
                                    className="reveal-text block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-balance"
                                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                                >
                                    <span className="text-black/50">We don&apos;t decorate.</span>
                                    <br />
                                    <span className="text-[#ff5501] font-medium md:whitespace-nowrap">
                                        We engineer demand.
                                    </span>
                                </h2>
                            </div>
                            <div className="hidden shrink-0 md:block">
                                <CTAButton
                                    variant="dark"
                                    text="Book an intro call"
                                    href="/contact"
                                    style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}
                                    ariaLabel="Book a Call"
                                />
                            </div>
                        </div>

                        <p className="mb-10 font-mono text-sm tracking-wider text-black/70 uppercase md:mb-0 md:col-start-1 md:row-start-2 md:text-base">
                            / Your Business<br />Is Our Business
                        </p>

                        {/* Right column on md: spans mono + dots rows */}
                        <div className="mb-10 flex flex-col gap-6 md:mb-0 md:col-start-2 md:row-start-2 md:row-span-2 md:gap-8">

                            {/* Feature 01 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">01.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / IT'S NOT ART. IT'S MATH.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        "Vibes" don't pay the bills. Conversion does. Using data from our 50+ previous builds, every layout is engineered to force specific user actions. The focus is on tracking eyes, clicks, and revenue—not chasing design awards.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 02 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">02.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / WE DON'T COPY YOUR RIVALS.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        Niche agencies tend to recycle the same playbook for everyone. It’s time to break the pattern. By stealing winning tactics from outside sectors (like SaaS and Luxury), you get a strategic edge your competitors won't even understand.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 03 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">03.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / PROFIT OVER PIXELS.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        Founders see things differently than creatives. Every design decision gets filtered through the lens of an owner: "Will this make money?" If the answer is no, it gets cut. Treating your budget like our own is the only way to operate.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Animated dots — desktop left column below mono */}
                        <div className="relative hidden h-48 w-full items-center justify-center md:col-start-1 md:row-start-3 md:flex">
                            {dots.map((dot, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute w-3 h-3 bg-[#ff5501] rounded-full"
                                    style={{
                                        left: `${dot.x}px`,
                                        top: `${dot.y}px`,
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.1,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>

                        <div className="pb-5 md:hidden">
                            <CTAButton
                                variant="dark"
                                text="Book an intro call"
                                href="/contact"
                                style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}
                                ariaLabel="Book a Call"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}