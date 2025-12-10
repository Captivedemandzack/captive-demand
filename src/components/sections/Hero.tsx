"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Carousel } from "../ui/Carousel";

// --- MAGIC PATH COMPONENTS START ---

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

export const AnimatedCTAButton = () => {
    return (
        <a href="#" className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none" aria-label="Start Your Build">
            <span className="
            relative flex items-center h-12 pl-5 pr-2 mr-4
            bg-[#f3f4f6] text-[#121212]
            rounded-l-xl
            font-mono text-sm uppercase tracking-normal
            transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]
          ">
                <span className="z-10 relative">Start Your Build</span>
                <div className="absolute top-0 right-[-16px] bottom-0 w-[18px] h-12 text-[#f3f4f6]">
                    <CornerShape className="w-full h-full transition-colors duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                </div>
            </span>

            <i className="
            relative block w-[51px] h-12 
            transform-gpu
            transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ">
                <div className="absolute inset-0 z-0 text-[#ff5501] group-hover:text-[#f3f4f6] transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <IconBlobShape className="w-full h-full" />
                </div>
                <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                    <span className="
                absolute flex items-center justify-center w-full h-full
                transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                translate-x-0 group-hover:translate-x-[150%]
              ">
                        <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                    </span>
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
};

// --- MAGIC PATH COMPONENTS END ---


const PROJECT_ITEMS = [
    { title: "First Future", tags: ["Web Design", "Web Dev"], imageSrc: "/Firstfuture.png" },
    { title: "Symmetri", tags: ["Web Design", "Web Dev"], imageSrc: "/Symmetri.png" },
    { title: "Two Cents", tags: ["Web Dev"], imageSrc: "/twocents.png" },
    { title: "Custom Cowgirl", tags: ["Web Design", "Web Dev"], imageSrc: "/customcowgirl.png" },
    { title: "Good Manors", tags: ["Web Design", "Web Dev"], imageSrc: "/goodmanors.png" },
    { title: "The Skin Real Serenbe", tags: ["Web Design", "Web Dev"], imageSrc: "/theskinrealserenbe.png" },
    { title: "The Skin Real", tags: ["Web Design", "Web Dev"], imageSrc: "/theskinreal.png" },
    { title: "enCappture", tags: ["Web Design", "Web Dev"], imageSrc: "/encappture.png" },
    { title: "Mountain's Ledge", tags: ["Web Design", "Web Dev"], imageSrc: "/mountainsledge.png" },
    { title: "North Star Nature Suites", tags: ["Web Design", "Web Dev", "SEO", "Email Marketing"], imageSrc: "/northstarnaturesuites.png" },
    { title: "Voyage and vibes", tags: ["Web Design", "Web Dev"], imageSrc: "/voyageandvibes.png" },
    { title: "Dubsy", tags: ["Web Design", "Web Dev"], imageSrc: "/dubsy.png" },
    { title: "Farmulated", tags: ["Web Design", "Web Dev", "SEO", "Email Marketing"], imageSrc: "/farmulated.png" },
    { title: "EOS 615", tags: ["Web Design", "Web Dev"], imageSrc: "/eoswellness.png" },
    { title: "Modern Mentor", tags: ["Web Design", "Web Dev"], imageSrc: "/modernmentor.png" },
    { title: "Endura Commerce", tags: ["Web Design", "Web Dev"], imageSrc: "/endura.png" },
    { title: "Arete", tags: ["Web Design", "Web Dev"], imageSrc: "/arete.png" },
    { title: "WFH Investor", tags: ["Web Design", "Web Dev"], imageSrc: "/wfhinvestor.png" },
    { title: "LLM Research", tags: ["Web Design", "Web Dev"], imageSrc: "/llmresearch.png" },
    { title: "MaxHealth MD", tags: ["Web Design", "Web Dev"], imageSrc: "/eoswellness.png" },
    { title: "Arctic Elevation", tags: ["Web Design", "Web Dev"], imageSrc: "/arcticelevation.png" },
    { title: "Boombox", tags: ["Web Design", "Web Dev", "SEO"], imageSrc: "/boombox.png" },
    { title: "Big Old Pup", tags: ["Web Design", "Web Dev"], imageSrc: "/bigoldpup.png" },
];

const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => (
        <span
            key={index}
            className="word inline-block mr-[0.3em]"
        >
            {word}
        </span>
    ));
};

export function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const partnersRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!videoRef.current || !partnersRef.current || !headlineRef.current || !subtextRef.current) return;

        // Video animation
        const video = videoRef.current;
        const videoState = { rate: 8, blur: 10 };

        video.playbackRate = videoState.rate;
        if (!window.matchMedia("(max-width: 768px)").matches) {
            video.style.filter = `blur(${videoState.blur}px)`;
        }

        gsap.to(videoState, {
            rate: 1,
            blur: 0,
            duration: 3,
            ease: 'power4.out',
            onUpdate: () => {
                if (videoRef.current) {
                    videoRef.current.playbackRate = videoState.rate;
                    // CRITICAL OPTIMIZATION: Skip blur filter on mobile to prevent crash
                    if (!window.matchMedia("(max-width: 768px)").matches) {
                        videoRef.current.style.filter = `blur(${videoState.blur}px)`;
                    }
                }
            },
        });

        const partnerPills = partnersRef.current.querySelectorAll('.partner-pill');
        const headlineWords = headlineRef.current.querySelectorAll('.word, .video-word');
        const subtextWords = subtextRef.current.querySelectorAll('.word');

        gsap.set([...partnerPills, ...headlineWords, ...subtextWords], {
            opacity: 0,
            filter: 'blur(12px)',
            y: 20,
        });

        const masterTl = gsap.timeline();

        masterTl.to(partnerPills, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
        });

        masterTl.to(headlineWords, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.04,
        }, '-=0.5');

        masterTl.to(subtextWords, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.02,
        }, '-=0.5');

    }, []);

    return (
        // EDIT: Increased pt-20 to pt-32 to create more space between Nav and Hero text
        <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[#FAFAFA] pt-32 md:pt-48 pb-20 md:pb-32 text-center">
            <div className="container relative z-10 mx-auto px-4 max-w-full">

                {/* --- 1. PARTNER PILLS --- */}
                <div ref={partnersRef} className="mb-8 hidden md:flex flex-wrap items-center justify-center gap-3">
                    <div className="partner-pill flex items-center gap-2 rounded-full border border-[#f3f4f6] bg-white px-4 py-1.5 font-mono uppercase text-[11px] tracking-[0.2em] text-[#121212]/80">
                        <div className="relative h-3.5 w-3.5">
                            <Image src="/Elementor-Logo-Symbol-Red (1).svg" alt="Elementor" fill className="object-contain" />
                        </div>
                        <span>Elementor Agency Partner</span>
                    </div>
                    <div className="partner-pill flex items-center gap-2 rounded-full border border-[#f3f4f6] bg-white px-4 py-1.5 font-mono uppercase text-[11px] tracking-[0.2em] text-[#121212]/80">
                        <div className="relative h-3.5 w-3.5">
                            <Image src="/shopify_glyph.svg" alt="Shopify" fill className="object-contain" />
                        </div>
                        <span>Shopify Partner</span>
                    </div>
                    <div className="partner-pill flex items-center gap-2 rounded-full border border-[#f3f4f6] bg-white px-4 py-1.5 font-mono uppercase text-[11px] tracking-[0.2em] text-[#121212]/80">
                        <div className="relative h-3.5 w-3.5">
                            <Image src="/CUBE_2D_LIGHT.svg" alt="Cursor" fill className="object-contain" />
                        </div>
                        <span>Cursor Experts</span>
                    </div>
                </div>

                {/* --- 2. HEADLINE --- */}
                <div className="mb-[clamp(1rem,2vw,1.5rem)] flex flex-col items-center justify-center px-4 w-full overflow-hidden">
                    <h1
                        ref={headlineRef}
                        className="flex w-full flex-col sm:flex-row sm:flex-nowrap items-center justify-center gap-0 sm:gap-[1.5vw] text-[#1a1512] tracking-tighter"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        <span className="w-full text-center sm:w-auto text-[clamp(3.5rem,13vw,7.5rem)] sm:text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] sm:whitespace-nowrap">
                            Fast Builds
                        </span>
                        <span className="w-full text-center sm:w-auto text-[clamp(3.5rem,13vw,7.5rem)] sm:text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] sm:whitespace-nowrap sm:order-3">
                            Real Results
                        </span>
                        <span className="video-word block sm:order-2 relative my-2 sm:my-0 translate-y-0 sm:translate-y-[0.20em]">
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-[10rem] h-[10rem] sm:w-[clamp(3rem,10vw,10rem)] sm:h-[clamp(3rem,10vw,10rem)] object-cover rounded-full"
                            >
                                <source src="/videoExport-2025-12-02@02-44-03.854-540x540@60fps.mp4" type="video/mp4" />
                            </video>
                        </span>
                    </h1>
                </div>

                {/* --- 3. SUBTEXT --- */}
                <div className="mx-auto mb-12 max-w-3xl">
                    <p
                        ref={subtextRef}
                        className="font-mono font-medium text-[16px] sm:text-[18px] leading-loose text-gray-600"
                    >
                        {splitIntoWords('We cover your core digital touchpoints with')}{' '}
                        <span className="word inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            web design and development
                        </span>
                        <span className="word inline-block">,</span>{' '}
                        <span className="word inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            Software development
                        </span>
                        <span className="word inline-block">,</span>{' '}
                        <span className="word inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            SEO/AEO
                        </span>
                        <span className="word inline-block">, and</span>{' '}
                        <span className="word inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            email marketing
                        </span>
                        <span className="word inline-block">.</span>
                    </p>
                </div>

                {/* --- 4. CAROUSEL --- */}
                <div className="-mt-4 md:-mt-6 relative z-20">
                    <Carousel items={PROJECT_ITEMS} />
                </div>

                {/* --- 5. CTA BUTTON --- */}
                <div className="relative z-30 -mt-[200px] md:-mt-[220px] flex justify-center pb-8 md:pb-12">
                    <AnimatedCTAButton />
                </div>

            </div>
        </section>
    );
}