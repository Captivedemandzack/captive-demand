"use client";

import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturesSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        // Masked Text Reveal Animation with hard cut-off
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

        // Scramble Animation for breadcrumb and numbers
        const scrambleElements = document.querySelectorAll('.scramble-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
        
        scrambleElements.forEach((element) => {
            const el = element as HTMLElement;
            
            // Get text from both text nodes and preserve the br structure
            const lines = el.innerHTML.split('<br>');
            let globalIndex = 0;
            
            // Wrap each character in a span, preserving line breaks
            const wrappedText = lines.map(line => {
                return line.split('').map(char => {
                    const span = `<span class="char" data-char="${char}" data-index="${globalIndex}">${char}</span>`;
                    globalIndex++;
                    return span;
                }).join('');
            }).join('<br>');
            
            el.innerHTML = wrappedText;
            const charElements = el.querySelectorAll('.char');
            
            const state = { progress: 0 };
            
            gsap.to(state, {
                progress: 1,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                onUpdate: () => {
                    charElements.forEach((charEl, index) => {
                        const char = charEl as HTMLElement;
                        const originalChar = char.getAttribute('data-char') || '';
                        
                        if (originalChar === ' ' || originalChar === '/') {
                            char.textContent = originalChar;
                            char.style.color = 'inherit';
                            return;
                        }
                        
                        const charProgress = Math.max(0, Math.min(1, (state.progress * 1.5) - (index / charElements.length) * 0.5));
                        
                        if (charProgress >= 0.8) {
                            char.textContent = originalChar;
                            char.style.color = 'inherit';
                        } else {
                            const randomChar = chars[Math.floor(Math.random() * chars.length)];
                            char.textContent = randomChar;
                            char.style.color = '#fafafa';
                        }
                    });
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Animated dots pattern - Asterisk shape
    const centerX = 90;
    const centerY = 90;
    const dots = [
        // Center dot
        { x: centerX, y: centerY },
        
        // Vertical line (up)
        { x: centerX, y: centerY - 20 },
        { x: centerX, y: centerY - 40 },
        { x: centerX, y: centerY - 60 },
        
        // Vertical line (down)
        { x: centerX, y: centerY + 20 },
        { x: centerX, y: centerY + 40 },
        { x: centerX, y: centerY + 60 },
        
        // Horizontal line (left)
        { x: centerX - 20, y: centerY },
        { x: centerX - 40, y: centerY },
        { x: centerX - 60, y: centerY },
        
        // Horizontal line (right)
        { x: centerX + 20, y: centerY },
        { x: centerX + 40, y: centerY },
        { x: centerX + 60, y: centerY },
        
        // Diagonal top-left to bottom-right
        { x: centerX - 15, y: centerY - 15 },
        { x: centerX - 30, y: centerY - 30 },
        { x: centerX - 45, y: centerY - 45 },
        { x: centerX + 15, y: centerY + 15 },
        { x: centerX + 30, y: centerY + 30 },
        { x: centerX + 45, y: centerY + 45 },
        
        // Diagonal top-right to bottom-left
        { x: centerX + 15, y: centerY - 15 },
        { x: centerX + 30, y: centerY - 30 },
        { x: centerX + 45, y: centerY - 45 },
        { x: centerX - 15, y: centerY + 15 },
        { x: centerX - 30, y: centerY + 30 },
        { x: centerX - 45, y: centerY + 45 },
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
                                className="reveal-text block text-4xl md:text-5xl lg:text-6xl tracking-tight text-black uppercase" 
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Why Choose<br />Captive Demand?
                            </h2>
                        </div>
                        <a 
                            href="https://connect.captivedemand.com/meetings/spencer-donaldson/discovery-call" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block font-mono text-sm tracking-wider text-black border border-black/20 px-6 py-2 rounded-full hover:bg-black/5 transition-colors"
                        >
                            [BOOK A CALL]
                        </a>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-8 relative">
                        
                        {/* Vertical Divider - Hidden on mobile */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />

                        {/* Left Column - Animation */}
                        <div className="flex flex-col justify-start">
                            <p className="scramble-text font-mono text-sm md:text-base tracking-wider text-black/70 mb-8 uppercase">
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
                                    <span className="scramble-text font-mono text-sm text-[#ff5501] tracking-wider block">01.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-wider text-black uppercase">
                                            / Built for Local Businesses.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        While others chase enterprise clients, we champion local businesses. Top-tier digital marketing that's accessible and affordable for the businesses that form the heart of our communities.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 02 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="scramble-text font-mono text-sm text-[#ff5501] tracking-wider block">02.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-wider text-black uppercase">
                                            / Entrepreneurial Approach.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        Founded by seasoned entrepreneurs and investors. We bring an ownership mindset to every project—treating your business with the vested interest of an owner, ensuring results.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 03 */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <span className="scramble-text font-mono text-sm text-[#ff5501] tracking-wider block">03.</span>
                                    <div className="line-mask overflow-hidden inline-block">
                                        <h3 className="reveal-text block font-mono text-lg md:text-xl tracking-wider text-black uppercase">
                                            / All-in-One Solutions.
                                        </h3>
                                    </div>
                                </div>
                                <div className="line-mask overflow-hidden block">
                                    <p className="reveal-text block font-mono text-sm text-black/60 leading-relaxed uppercase tracking-wide">
                                        From web design and SEO to marketing automation and analytics—everything you need under one roof. No juggling multiple vendors or piecing together your digital presence.
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

