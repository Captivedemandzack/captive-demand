"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { CTAButton } from '@/components/ui/CTAButton';

const CornerBracket = ({ className, position }: { className?: string; position: 'top-left' | 'bottom-right' }) => {
    const rotation = position === 'bottom-right' ? 'rotate(180deg)' : 'rotate(0deg)';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} style={{ transform: rotation }}>
            <path d="M0 0 L0 15 M0 0 L15 0" stroke="#ff5501" strokeWidth="3" strokeLinecap="square" />
        </svg>
    );
};

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const topBracketRef = useRef<HTMLDivElement>(null);
    const bottomBracketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !teamRef.current || !buttonRef.current || !topBracketRef.current || !bottomBracketRef.current) return;

        const ctx = gsap.context(() => {
            const words = textRef.current!.querySelectorAll('.word');
            const elements = [teamRef.current!, ...words, buttonRef.current!];

            gsap.set(elements, { opacity: 0, filter: 'blur(10px)', y: 20 });
            gsap.set(topBracketRef.current!, { opacity: 0, x: -60, y: -40 });
            gsap.set(bottomBracketRef.current!, { opacity: 0, x: 60, y: 40 });

            gsap.to(teamRef.current!, {
                opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8,
                scrollTrigger: { trigger: containerRef.current!, start: 'center 80%', end: 'center 50%', scrub: 1 }
            });

            gsap.to(words, {
                opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, stagger: 0.05,
                scrollTrigger: { trigger: containerRef.current!, start: 'center 80%', end: 'center 50%', scrub: 1 }
            });

            gsap.to(buttonRef.current!, {
                opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8,
                scrollTrigger: { trigger: containerRef.current!, start: 'center 80%', end: 'center 50%', scrub: 1 }
            });

            gsap.to([topBracketRef.current!, bottomBracketRef.current!], {
                opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: containerRef.current!, start: 'center 65%', end: 'center 50%', scrub: 1 }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const text = "The market is full, the timeline is tight, and the standard is high. We build the digital experience that bridges the gap between where you are and where you belong.";
    const words = text.split(' ');

    return (
        <section className="relative flex flex-col items-center justify-center bg-[#FAFAFA] pt-8 md:pt-12 pb-20 md:pb-32 px-4">
            <div ref={containerRef} className="container mx-auto max-w-4xl flex flex-col items-center">

                {/* Team Profile Images */}
                <div ref={teamRef} className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center">
                        {/* UPDATE: Using local images from public folder */}
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-md bg-gray-200 z-30">
                            <Image
                                src="/spencer-donaldson-2.png"
                                alt="Spencer Donaldson"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-md bg-gray-200 z-20 -ml-3">
                            <Image
                                src="/michael-turner-2.png"
                                alt="Michael Turner"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-md bg-gray-200 z-10 -ml-3">
                            <Image
                                src="/zack-creasy.png"
                                alt="Zack Creasy"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-left">
                        <p className="font-mono text-[14px] text-[#121212] leading-tight">The team<br />Generating <span className="font-semibold">$100M+</span> in revenue</p>
                    </div>
                </div>

                {/* Main Text */}
                <div className="relative mb-8 px-2 md:px-4 py-2 md:py-4">
                    <div ref={topBracketRef} className="absolute top-0 left-0"><CornerBracket position="top-left" /></div>
                    <div ref={bottomBracketRef} className="absolute bottom-0 right-0"><CornerBracket position="bottom-right" /></div>
                    <h2 ref={textRef} className="text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-mono font-normal leading-tight text-[#1a1512]">
                        {words.map((word, index) => <span key={index} className="word inline-block mr-[0.3em]">{word}</span>)}
                    </h2>
                </div>

                {/* Button Container */}
                <div ref={buttonRef}>
                    <CTAButton variant="grey" text="Our Story" href="/about" style={{ filter: 'drop-shadow(0px 1px 0px rgba(0,0,0,0.1)) drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }} ariaLabel="Our Story" />
                </div>

            </div>
        </section>
    );
}