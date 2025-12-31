'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { AnimatedCTAButton } from '@/components/sections/Hero';

export function WebsiteHero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple fade-in for the video and text
            gsap.from(videoRef.current, {
                opacity: 0,
                x: -50,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.hero-text', {
                opacity: 0,
                x: 50,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.4,
                stagger: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-[#FAFAFA] pt-32 md:pt-48 pb-20 md:pb-32 px-4 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* LEFT: Video (Replacing the image from reference) */}
                    <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/Websitehero.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* RIGHT: Text Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                        <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-[600] leading-[0.9] tracking-tight text-[#1a1512] mb-8" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                            WE BUILD<br />
                            BRANDS<br />
                            WITH<br />
                            IMPACT.
                        </h1>

                        <p className="hero-text text-lg md:text-xl text-[#1a1512]/70 font-nohemi-custom mb-10 max-w-md leading-relaxed">
                            Seamless design solutions that connect vision, function, and emotion.
                        </p>

                        <div className="hero-text">
                            <AnimatedCTAButton />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
