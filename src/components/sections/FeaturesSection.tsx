"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGsapScrollTrigger } from "@/hooks/useGsapScrollTrigger";

import { CTAButton } from '@/components/ui/CTAButton';

export function FeaturesSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGsapScrollTrigger(() => {
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
    }, [], containerRef);

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

                        {/* Row 1: headline only in col 1 (never crosses the mid divider); CTA in col 2 */}
                        <div className="mb-3 min-w-0 max-w-full pt-5 [container-type:inline-size] md:col-start-1 md:row-start-1 md:mb-0 md:max-w-full md:pr-2 md:pt-0">
                            <div className="line-mask w-full min-w-0 max-w-full overflow-hidden">
                                <h2
                                    ref={headingRef}
                                    className="reveal-text block w-full max-w-full font-nohemi font-light leading-[1.1] tracking-tight [font-size:clamp(1.0625rem,calc(0.5rem+5.35cqi+min(1.05vw,1.125rem)),3.625rem)]"
                                >
                                    <span className="block whitespace-nowrap text-black/50">
                                        We don&apos;t decorate.
                                    </span>
                                    <span className="block whitespace-nowrap text-[#ff5501] font-medium">
                                        We engineer demand.
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="hidden shrink-0 justify-end pt-5 md:col-start-2 md:row-start-1 md:flex md:mb-0 md:pt-0 md:pl-2">
                            <CTAButton
                                variant="dark"
                                text="Book an intro call"
                                href="/contact"
                                style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}
                                ariaLabel="Book a Call"
                            />
                        </div>

                        <p className="mb-10 font-mono text-sm tracking-wider text-black/70 uppercase md:mb-0 md:col-start-1 md:row-start-2 md:text-base">
                            / Your Portfolio<br />Is Our Priority
                        </p>

                        {/* Right column on md: spans mono + dots rows */}
                        <div className="mb-10 flex flex-col gap-6 md:mb-0 md:col-start-2 md:row-start-2 md:row-span-2 md:gap-8">

                            {/* Feature 01 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">01.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / IT&apos;S NOT ART. IT&apos;S MATH.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        &quot;Vibes&quot; don&apos;t drive returns. Conversion does. Every build runs on data from countless brands we&apos;ve grown for platform companies, engineered to move the metrics an owner underwrites: revenue, conversion, cost per outcome. Not design awards.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 02 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">02.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / ONE PLAYBOOK, EVERY COMPANY.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        Most agencies relearn the basics at every company you own. We don&apos;t. Every win at one portfolio company becomes the playbook for the next, so the whole portfolio compounds instead of starting from zero each time.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 03 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="font-mono text-sm text-[#ff5501] tracking-wider block">03.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-tighter text-black uppercase">
                                            / WE TREAT YOUR BUDGET LIKE OURS.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        Every decision runs through an owner&apos;s lens: will this create value? If not, it gets cut. We drive growth up and cost down at the same time, because that&apos;s how you actually move a portfolio, not one brand at a time.
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