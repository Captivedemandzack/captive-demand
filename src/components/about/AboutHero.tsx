'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

function CSSArchitecturalGrid() {
    const mask = 'radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%)';
    return (
        <>
            {/* Mobile: vertical lines at 20% and 80% (even farther apart) */}
            <div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden lg:hidden"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, transparent calc(20% - 0.5px), rgba(229,229,229,0.6) 20%, rgba(229,229,229,0.6) calc(20% + 0.5px), transparent calc(20% + 0.5px)),
                        linear-gradient(to right, transparent calc(80% - 0.5px), rgba(229,229,229,0.6) 80%, rgba(229,229,229,0.6) calc(80% + 0.5px), transparent calc(80% + 0.5px)),
                        repeating-linear-gradient(to bottom, transparent, transparent calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px))
                    `,
                    maskImage: mask,
                    WebkitMaskImage: mask,
                }}
            />
            {/* Desktop: 3 columns (33.33% each) */}
            <div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(to right, transparent, transparent calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px)),
                        repeating-linear-gradient(to bottom, transparent, transparent calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px))
                    `,
                    maskImage: mask,
                    WebkitMaskImage: mask,
                }}
            />
        </>
    );
}

export function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-eyebrow', {
                opacity: 0, y: 20,
                duration: 0.8, ease: 'power4.out', delay: 0.2,
            });
            gsap.from('.hero-headline', {
                opacity: 0, y: 30, filter: 'blur(6px)',
                duration: 1.2, ease: 'power4.out', delay: 0.35,
            });
            gsap.from('.hero-image', {
                opacity: 0, scale: 1.04,
                duration: 1.6, ease: 'power4.out', delay: 0.15,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-visible bg-[#FAFAFA]"
        >
            {/* Background image — grid is behind image/overlay, visible through overlay transparency */}
            <div className="hero-image absolute inset-0 z-0 pointer-events-none">
                <CSSArchitecturalGrid />
                <Image
                    src="/aboutbackground2.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    style={{ objectPosition: '50% 50%' }}
                    sizes="100vw"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, #FAFAFA 72%)',
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#FAFAFA] to-transparent" />
            </div>

            {/* Text — stays within grid cell: raised on desktop so eyebrow is within square; scales down on mobile */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
                <div className="flex flex-col items-center text-center w-full max-w-[min(58vw,400px)] sm:max-w-[min(40vw,420px)] lg:max-w-[min(33.33vw,480px)] lg:-translate-y-[6%]">
                    <div className="hero-eyebrow mb-4 sm:mb-6 origin-center scale-90 sm:scale-100">
                        <EyebrowHeading category="About" label="Our Mission" />
                    </div>

                    <h1
                        className="hero-headline text-[clamp(1.85rem,5vw+0.75rem,4.2rem)] sm:text-[clamp(1.75rem,4.5vw+0.5rem,4.2rem)] leading-[1.1] tracking-tighter text-[#1a1512]"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                    >
                        We build digital experiences that captivate and convert.
                    </h1>
                </div>
            </div>
        </section>
    );
}
