'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

function CSSArchitecturalGrid() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                backgroundImage: `
                    repeating-linear-gradient(to right, transparent, transparent calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px)),
                    repeating-linear-gradient(to bottom, transparent, transparent calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% - 0.5px), rgba(229,229,229,0.6) calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px))
                `,
                maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 70%)',
            }}
        />
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
            <CSSArchitecturalGrid />
            {/* Background image */}
            <div className="hero-image absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/aboutbackground2.png"
                    alt=""
                    fill
                    className="object-cover object-center"
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

            {/* Text — centered in the frame */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
                <div className="flex flex-col items-center text-center max-w-xl">
                    <div className="hero-eyebrow mb-6">
                        <EyebrowHeading category="About" label="Our Mission" />
                    </div>

                    <h1
                        className="hero-headline text-[clamp(2.2rem,5vw+0.5rem,4.2rem)] leading-[1.1] tracking-tighter text-[#1a1512]"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                    >
                        We build digital experiences that captivate and convert.
                    </h1>
                </div>
            </div>
        </section>
    );
}
