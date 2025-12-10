'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedCTAButton } from '../sections/Hero';

// Optimized Video Component for Footer Marquee
const FooterVideo = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Desktop: Always play
        if (window.matchMedia("(min-width: 768px)").matches) {
            video.play().catch(() => { });
            return;
        }

        // Mobile: Only play when visible to save GPU/Memory
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.1 } // Play when 10% visible
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
        >
            <source src="/videoExport-2025-12-02@02-44-03.854-540x540@60fps.mp4" type="video/mp4" />
        </video>
    );
};

export default function Footer() {
    return (
        <>
            {/* INJECTED STYLES */}
            <style jsx global>{`
                /* CRITICAL FIX: Forces body to be transparent so the footer (at z-index -10) is visible */
                body, html {
                    background-color: transparent !important;
                }
                
                @font-face {
                    font-family: 'Nohemi';
                    src: url('/fonts/Nohemi-Light.ttf') format('truetype');
                    font-weight: 300;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'Nohemi';
                    src: url('/fonts/Nohemi-Regular.ttf') format('truetype');
                    font-weight: 400;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'Nohemi';
                    src: url('/fonts/Nohemi-SemiBold.ttf') format('truetype');
                    font-weight: 600;
                    font-style: normal;
                }
                .font-nohemi-custom {
                    font-family: 'Nohemi', sans-serif !important;
                }
            `}</style>

            {/* 1. THE SPACER:
               This invisible div sits in the normal document flow at the bottom.
               It acts as a "window" that you scroll into to see the fixed footer behind.
            */}
            <div className="relative w-full h-screen bg-transparent pointer-events-none" />

            {/* 2. THE REVEAL FOOTER:
               - fixed: Locks it to the viewport.
               - bottom-0: Sticks to the bottom.
               - -z-10: Puts it BEHIND the rest of your content (Hero, About, etc).
            */}
            <footer className="fixed bottom-0 left-0 w-full h-screen bg-[#fafafa] text-brand-dark flex flex-col -z-10 pt-24 md:pt-32 font-nohemi-custom overflow-y-auto overflow-x-hidden">

                {/* 1. Marquee Section */}
                <div className="w-full py-4 relative z-20 shrink-0">
                    <motion.div
                        className="flex whitespace-nowrap items-center"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                        }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12">
                                <span className="text-[14vw] md:text-[11vw] font-[600] leading-none tracking-tighter text-brand-dark font-nohemi-custom">
                                    CAPTIVE DEMAND
                                </span>

                                <div className="relative w-[10vw] h-[10vw] md:w-[7vw] md:h-[7vw] rounded-full overflow-hidden shrink-0">
                                    <FooterVideo />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* 2. Main Content Area */}
                <div className="flex-1 container mx-auto px-4 md:px-8 w-full flex flex-col">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mt-8 md:mt-12 mb-auto">

                        {/* Left Side */}
                        <div className="flex-1 max-w-2xl">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-[300] leading-[1.2] mb-10 md:mb-14 tracking-wide text-brand-dark/90 font-nohemi-custom">
                                We bring the "Owner Mentality" because we are owners. 50+ times over. We apply that same obsession to your business, treating your budget exactly like we treat our own.
                            </p>

                            <div className="transform origin-left scale-100 md:scale-110">
                                <AnimatedCTAButton />
                            </div>
                        </div>

                        {/* Right Side */}
                        {/* UPDATE: Added 'py-12' for equal top/bottom padding on mobile, reset to 'lg:py-0' on desktop */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 w-full max-w-xl lg:ml-auto border-t lg:border-t-0 border-brand-dark/10 lg:border-none py-12 lg:py-0">

                            <div className="flex flex-col gap-6">
                                <h4 className="text-sm md:text-base font-[600] uppercase tracking-widest text-brand-dark/50 font-nohemi-custom">Explore</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><Link href="/services" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Services</Link></li>
                                    <li><Link href="/work" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Work</Link></li>
                                    <li><Link href="/about" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">About</Link></li>
                                    <li><Link href="/insights" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Insights</Link></li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h4 className="text-sm md:text-base font-[600] uppercase tracking-widest text-brand-dark/50 font-nohemi-custom">Connect</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><a href="https://linkedin.com" target="_blank" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">LinkedIn</a></li>
                                    <li><a href="https://instagram.com" target="_blank" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Instagram</a></li>
                                    <li><a href="mailto:info@captivedemand.com" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors truncate font-nohemi-custom">Email</a></li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h4 className="text-sm md:text-base font-[600] uppercase tracking-widest text-brand-dark/50 font-nohemi-custom">Legal</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><Link href="/privacy" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Privacy Policy</Link></li>
                                    <li><Link href="/terms" className="text-lg md:text-xl hover:text-[#ff5500] transition-colors font-nohemi-custom">Terms</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Bottom Copyright Bar */}
                <div className="border-t border-brand-dark/10 py-6 bg-[#fafafa] mt-auto shrink-0">
                    {/* UPDATE: Changed to flex-col for mobile stacking, added gap-6 for spacing */}
                    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-sm md:text-base text-brand-dark/60 font-nohemi-custom">

                        {/* Logo - Order 1 on mobile */}
                        <div className="relative w-[120px] h-[30px] opacity-80 hover:opacity-100 transition-opacity order-1 md:order-none">
                            <Image
                                src="/captive-demand-logo.png"
                                alt="Captive Demand"
                                fill
                                className="object-contain object-center md:object-left"
                            />
                        </div>

                        {/* Rights Text - Order 2 on mobile, unhidden */}
                        <div className="text-center order-2 md:order-none block">
                            All rights reserved by Captive Demand, 2025
                        </div>

                        {/* Support Text - Order 3 on mobile */}
                        <div className="text-center md:text-right text-xs md:text-sm max-w-[250px] md:max-w-none order-3 md:order-none">
                            Supporting innovative companies with Web Development and Marketing Services
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}