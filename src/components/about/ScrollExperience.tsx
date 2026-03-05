'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const STATEMENTS = [
    'High agency.',
    'Relentless curiosity.',
    'Scientific approach.',
    'Artistic execution.',
    'Built right the first time.',
];

function OrangeAsterisk() {
    return (
        <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="asteriskGradStatement" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF7A2E" />
                    <stop offset="100%" stopColor="#E8480C" />
                </linearGradient>
                <filter id="asteriskShadowStatement" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#E8480C" floodOpacity="0.45" />
                </filter>
            </defs>
            <g filter="url(#asteriskShadowStatement)">
                <path
                    d="M24 4L26.8 18.2L38 8L30.8 21.2L44 24L30.8 26.8L38 40L26.8 29.8L24 44L21.2 29.8L10 40L17.2 26.8L4 24L17.2 21.2L10 8L21.2 18.2L24 4Z"
                    fill="url(#asteriskGradStatement)"
                />
            </g>
        </svg>
    );
}

export function ScrollExperience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = sectionRef.current?.querySelectorAll('.statement-line');
            if (!lines) return;

            lines.forEach((line, i) => {
                gsap.from(line, {
                    opacity: 0,
                    y: 30,
                    filter: 'blur(6px)',
                    duration: 0.8,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    delay: i * 0.08,
                });
            });

            gsap.from('.statement-asterisk', {
                opacity: 0, scale: 0, rotation: -90,
                duration: 1.2, ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.statement-asterisk',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, #2a2520 0%, #1a1512 40%, #0a0a0a 100%)',
            }}
        >
            <NoiseOverlay />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 md:py-48 text-center">
                <div className="flex flex-col items-center gap-3 md:gap-4">
                    {STATEMENTS.map((text, i) => (
                        <h2
                            key={i}
                            className="statement-line text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-tighter text-white"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                        >
                            {text}
                        </h2>
                    ))}
                </div>

                <div className="statement-asterisk mt-16 flex justify-center">
                    <OrangeAsterisk />
                </div>
            </div>
        </section>
    );
}
