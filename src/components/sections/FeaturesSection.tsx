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

                    {/* Header with Title and Button */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
                        <div className="line-mask overflow-hidden block">
                            <h2
                                ref={headingRef}
                                className="reveal-text block text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                <span className="text-black/50">We make great<br />design </span>
                                <span className="text-[#ff5501] font-medium">
                                    print money
                                    <span className="inline-block align-top text-3xl md:text-4xl lg:text-5xl ml-1 relative top-1">*</span>
                                </span>
                            </h2>
                        </div>

                        {/* THE BUTTON */}
                        <div className="mt-4 md:mt-0">
                            <CTAButton
                                variant="dark"
                                text="Book an intro call"
                                href="https://connect.captivedemand.com/meetings/spencer-donaldson/discovery-call"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}
                                ariaLabel="Book a Call"
                            />
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-8 relative">

                        {/* Vertical Divider */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />

                        {/* Left Column - Animation */}
                        <div className="flex flex-col justify-start">
                            <p className="font-mono text-sm md:text-base tracking-wider text-black/70 mb-8 uppercase">
                                / Your Business<br />Is Our Business
                            </p>

                            {/* Animated Dots Pattern - PERF FIX: HIDDEN ON MOBILE using hidden md:flex */}
                            <div className="hidden md:flex relative w-full h-48 items-center justify-center">
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
                        </div>

                        {/* Right Column - Features List */}
                        <div className="flex flex-col gap-8">

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
                    </div>

                </div>
            </div>
        </section>
    );
}