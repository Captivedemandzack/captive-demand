"use client";

import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- SHAPES FOR THE BUTTON ---

const CornerShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 48" className={className} style={{ display: 'block' }}>
        <path d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" fill="currentColor" />
    </svg>
);

const IconBlobShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48" className={className} style={{ display: 'block' }}>
        <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
    </svg>
);

const ArrowIcon = ({ color = "currentColor", className = "" }: { color?: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10" fill="none" className={className}>
        <path fill={color} d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
    </svg>
);

// --- HERO BUTTON COMPONENT (FINAL POLISH) ---
const HeroButton = () => (
    <a
        href="https://connect.captivedemand.com/meetings/spencer-donaldson/discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none"
        aria-label="Book a Call"
    >

        {/* Label Container */}
        <span className="
        relative flex items-center h-12 pl-5 pr-2 mr-4
        rounded-l-xl font-mono text-sm uppercase tracking-normal
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        bg-[#f3f4f6] text-[#1a1512]
      ">
            <span className="z-10 relative">Book an intro call</span>

            {/* Decorative Corner: Matches Label Body (#f3f4f6) */}
            <div className="absolute top-0 right-[-16px] bottom-0 w-[18px] h-12 text-[#f3f4f6] transition-colors duration-300">
                <CornerShape className="w-full h-full" />
            </div>
        </span>

        {/* Icon Container */}
        <i className="
        relative block w-[51px] h-12 
        transform-gpu
        transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      ">
            {/* Blob Shape Background: Orange -> Light Gray on Hover */}
            <div className="
        absolute inset-0 z-0 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        text-[#ff5501] group-hover:text-[#f3f4f6]
      ">
                <IconBlobShape className="w-full h-full" />
            </div>

            {/* The Sliding Arrows Container */}
            <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                {/* Arrow 1: Visible initially (White) -> Slides Out */}
                <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            translate-x-0 group-hover:translate-x-[150%]
          ">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>

                {/* Arrow 2: Enters on Hover (Black) -> Slides In */}
                <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            -translate-x-[150%] group-hover:translate-x-0
          ">
                    <ArrowIcon color="#1a1512" className="w-5 h-5" />
                </span>
            </span>
        </i>
    </a>
);

export function FeaturesSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        // Masked Text Reveal Animation
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
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
        <section className="relative w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Large Card */}
                <div className="relative bg-[#E8E8E8] rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">

                    {/* Header with Title and Button */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
                        <div className="line-mask overflow-hidden block">
                            <h2
                                ref={headingRef}
                                className="reveal-text block text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                {/* UX FIX: Using black/50 for readability + hierarchy */}
                                <span className="text-black/50">We make great<br />design </span>

                                {/* EMPHASIS: Brand Orange + Asterisk (matches Hero star motif) */}
                                <span className="text-[#ff5501] font-medium">
                                    print money
                                    {/* The Asterisk acts as the period, connecting to the brand's 'Fast Builds * Real Results' motif */}
                                    <span className="inline-block align-top text-3xl md:text-4xl lg:text-5xl ml-1 relative top-1">*</span>
                                </span>
                            </h2>
                        </div>

                        {/* THE BUTTON */}
                        <div className="mt-4 md:mt-0">
                            <HeroButton />
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

                            {/* Animated Dots Pattern */}
                            <div className="relative w-full h-48 flex items-center justify-center">
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