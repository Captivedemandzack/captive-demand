"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- GEOMETRY SHAPES (Solid Fills) ---

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

const ArrowIcon = ({ color = 'currentColor', className }: { color?: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className={className}>
        <path fill={color} d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
    </svg>
);

const CornerBracket = ({ className, position }: { className?: string; position: 'top-left' | 'bottom-right' }) => {
    const rotation = position === 'bottom-right' ? 'rotate(180deg)' : 'rotate(0deg)';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} style={{ transform: rotation }}>
            <path d="M0 0 L0 15 M0 0 L15 0" stroke="#ff5501" strokeWidth="3" strokeLinecap="square" />
        </svg>
    );
};

// --- SECONDARY BUTTON (GREY FILLED) ---
const OurStoryButton = () => (
    <a href="/about" className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none" aria-label="Our Story">

        {/* DESIGN LOGIC: "The Grey Tonal"
        - Normal: #e8e8e8 Background (Solid Grey), #1a1512 Text (Dark Grey)
        - Hover: #ff5501 Background (Orange), White Text
    */}

        {/* Label Container */}
        <span className="
        relative flex items-center h-12 pl-5 pr-2 mr-4
        rounded-l-xl font-mono text-sm uppercase tracking-normal
        transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        
        /* COLORS */
        bg-[#e8e8e8] text-[#1a1512]
        group-hover:bg-[#ff5501] group-hover:text-white
      ">
            <span className="z-10 relative">Our Story</span>

            {/* Decorative Corner (Matches Label BG) */}
            <div className="
        absolute top-0 right-[-16px] bottom-0 w-[18px] h-12
        transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        
        /* COLORS */
        text-[#e8e8e8]
        group-hover:text-[#ff5501]
      ">
                <CornerShape className="w-full h-full" />
            </div>
        </span>

        {/* Icon Container */}
        <i className="
        relative block w-[51px] h-12 
        transform-gpu
        transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      ">

            {/* Blob Shape Background */}
            <div className="
        absolute inset-0 z-0 
        transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        
        /* COLORS: Grey -> Orange on Hover */
        text-[#e8e8e8]
        group-hover:text-[#ff5501]
      ">
                <IconBlobShape className="w-full h-full" />
            </div>

            {/* The Sliding Arrows Container */}
            <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                {/* Arrow 1: Visible initially (Dark Grey) -> Slides Out */}
                <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            translate-x-0 group-hover:translate-x-[150%]
          ">
                    <ArrowIcon color="#1a1512" className="w-5 h-5" />
                </span>

                {/* Arrow 2: Enters on Hover (White) -> Slides In */}
                <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            -translate-x-[150%] group-hover:translate-x-0
          ">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>
            </span>
        </i>
    </a>
);

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const topBracketRef = useRef<HTMLDivElement>(null);
    const bottomBracketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !teamRef.current || !buttonRef.current || !topBracketRef.current || !bottomBracketRef.current) return;

        const words = textRef.current.querySelectorAll('.word');
        const elements = [teamRef.current, ...words, buttonRef.current];

        gsap.set(elements, { opacity: 0, filter: 'blur(10px)', y: 20 });
        gsap.set(topBracketRef.current, { opacity: 0, x: -60, y: -40 });
        gsap.set(bottomBracketRef.current, { opacity: 0, x: 60, y: 40 });

        gsap.to(teamRef.current, {
            opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8,
            scrollTrigger: { trigger: containerRef.current, start: 'center 80%', end: 'center 50%', scrub: 1 }
        });

        gsap.to(words, {
            opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, stagger: 0.05,
            scrollTrigger: { trigger: containerRef.current, start: 'center 80%', end: 'center 50%', scrub: 1 }
        });

        gsap.to(buttonRef.current, {
            opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8,
            scrollTrigger: { trigger: containerRef.current, start: 'center 80%', end: 'center 50%', scrub: 1 }
        });

        gsap.to([topBracketRef.current, bottomBracketRef.current], {
            opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'center 65%', end: 'center 50%', scrub: 1 }
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
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
                    <OurStoryButton />
                </div>

            </div>
        </section>
    );
}