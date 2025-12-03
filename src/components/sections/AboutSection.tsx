"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper Shapes (reused from Hero)
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
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      className={className}
      style={{ transform: rotation }}
    >
      <path d="M0 0 L0 15 M0 0 L15 0" stroke="#ff5501" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  );
};

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const topBracketRef = useRef<HTMLDivElement>(null);
    const bottomBracketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !teamRef.current || !buttonRef.current || !topBracketRef.current || !bottomBracketRef.current) return;

        const words = textRef.current.querySelectorAll('.word');
        const teamElements = [teamRef.current];
        const buttonElement = [buttonRef.current];
        
        // Set initial state for all elements
        gsap.set([...teamElements, ...words, ...buttonElement], {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
        });

        // Set initial state for brackets - off screen and transparent
        gsap.set(topBracketRef.current, {
            opacity: 0,
            x: -60,
            y: -40,
        });

        gsap.set(bottomBracketRef.current, {
            opacity: 0,
            x: 60,
            y: 40,
        });

        // Animate team section
        gsap.to(teamElements, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center 80%',
                end: 'center 50%',
                scrub: 1,
            },
        });

        // Animate text words with stagger
        gsap.to(words, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center 80%',
                end: 'center 50%',
                scrub: 1,
            },
        });

        // Animate button
        gsap.to(buttonElement, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center 80%',
                end: 'center 50%',
                scrub: 1,
            },
        });

        // Animate brackets - "bolt on" near the end
        gsap.to([topBracketRef.current, bottomBracketRef.current], {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center 65%',
                end: 'center 50%',
                scrub: 1,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Split text into words
    const text = "The market is full, the timeline is tight, and the standard is high. We build the digital experience that bridges the gap between where you are and where you belong.";
    const words = text.split(' ');

    return (
        <section className="relative flex flex-col items-center justify-center bg-[#FAFAFA] pt-8 md:pt-12 pb-20 md:pb-32 px-4">
            <div ref={containerRef} className="container mx-auto max-w-4xl flex flex-col items-center">
                
                {/* Team Profile Images with Text */}
                <div ref={teamRef} className="flex items-center justify-center gap-4 mb-8">
                    {/* Overlapping Images */}
                    <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-[1px] border-white shadow-md bg-gray-200 z-30">
                            <Image 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" 
                                alt="Team Member 1" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-[1px] border-white shadow-md bg-gray-200 z-20 -ml-3">
                            <Image 
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" 
                                alt="Team Member 2" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-[1px] border-white shadow-md bg-gray-200 z-10 -ml-3">
                            <Image 
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" 
                                alt="Team Member 3" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* Text */}
                    <div className="text-left">
                        <p className="font-mono text-[14px] text-[#121212] leading-tight">
                            The team<br />
                            Generating <span className="font-semibold">$100M+</span> in revenue
                        </p>
                    </div>
                </div>

                {/* Main Text with Corner Brackets */}
                <div className="relative mb-8 px-2 md:px-4 py-2 md:py-4">
                    {/* Top Left Bracket */}
                    <div ref={topBracketRef} className="absolute top-0 left-0">
                        <CornerBracket position="top-left" />
                    </div>
                    
                    {/* Bottom Right Bracket */}
                    <div ref={bottomBracketRef} className="absolute bottom-0 right-0">
                        <CornerBracket position="bottom-right" />
                    </div>
                    
                    <h2 
                        ref={textRef}
                        className="text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-mono font-normal leading-tight text-[#1a1512]"
                    >
                        {words.map((word, index) => (
                            <span key={index} className="word inline-block mr-[0.3em]">
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Our Story Button - Same as Hero but with Orange body and Grey arrow */}
                <a ref={buttonRef} href="/about" className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none" aria-label="Our Story">
                    {/* Label Container (Orange Background) */}
                    <span className="relative flex items-center h-12 pl-5 pr-2 mr-4 bg-[#ff5501] text-white rounded-l-xl font-mono text-sm uppercase tracking-normal transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        <span className="z-10 relative">Our Story</span>

                        {/* Decorative Corner that connects label to icon */}
                        <div className="absolute top-0 right-[-16px] bottom-0 w-[18px] h-12 text-[#ff5501]">
                            <CornerShape className="w-full h-full transition-colors duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                        </div>
                    </span>

                    {/* Icon Container (Grey Background) */}
                    <i className="relative block w-[51px] h-12 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        {/* Blob Shape Background */}
                        <div className="absolute inset-0 z-0 text-[#f3f4f6] group-hover:text-[#ff5501] transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
                            <IconBlobShape className="w-full h-full" />
                        </div>

                        {/* The Sliding Arrows Container */}
                        <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                            {/* Default Dark Arrow (Visible initially) */}
                            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] translate-x-0 group-hover:translate-x-[150%]">
                                <ArrowIcon color="#1a1512" className="w-5 h-5" />
                            </span>
                            {/* Hover White Arrow (Coming from left) */}
                            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-x-[150%] group-hover:translate-x-0">
                                <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                            </span>
                        </span>
                    </i>
                </a>

            </div>
        </section>
    );
}

