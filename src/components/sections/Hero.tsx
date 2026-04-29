"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Carousel } from "../ui/Carousel";
import { ArrowThreeDots } from "../ui/ArrowThreeDots";

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


export const AnimatedCTAButton = () => {
    const buttonText = "START YOUR BUILD";
    const borderRadius = 12; // rounded-l-xl = 12px
    // Button dimensions: text width (162px) + corner overlap
    const buttonWidth = 180; // Total width including corner
    const buttonHeight = 48;
    
    return (
        <a href="/contact" className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none" aria-label="Start Your Build">
            {/* Container for button - sets dimensions and positioning */}
            <div className="relative flex items-center justify-center h-12 mr-1" style={{ width: `${buttonWidth}px` }}>
                {/* Unified SVG Background - Single seamless path covering entire button */}
                <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${buttonWidth} ${buttonHeight}`}
                    preserveAspectRatio="none"
                    style={{ 
                        filter: 'drop-shadow(0px 2px 0px #000000) drop-shadow(0 2px 4px rgba(0,0,0,0.06))'
                    }}
                >
                    <defs>
                        {/* Volume gradient: Lighter top (#2A2522) to darker bottom (#1a1512) for convex 3D shape */}
                        <linearGradient id="buttonFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2A2522" />
                            <stop offset="100%" stopColor="#1a1512" />
                        </linearGradient>
                        
                        {/* Rim Light gradient: Bright white/light at top (50% opacity) fading to transparent at bottom */}
                        <linearGradient id="buttonBorder" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Unified seamless path: Flows continuously from rounded left corner through rectangle to curved right corner */}
                    {/* Left: rounded corner (12px radius) */}
                    {/* Middle: straight rectangle body */}
                    {/* Right: curved corner transition (matching original CornerShape path) */}
                    <path
                        d={`M${borderRadius},0 
                           L${buttonWidth - 18},0 
                           h5.63 
                           c7.808,0 13.536,7.337 11.642,14.91 
                           l-6.09,24.359 
                           A11.527,11.527 0 0,1 ${buttonWidth - 18},${buttonHeight} 
                           L${borderRadius},${buttonHeight} 
                           Q0,${buttonHeight} 0,${buttonHeight - borderRadius} 
                           L0,${borderRadius} 
                           Q0,0 ${borderRadius},0 Z`}
                        fill="url(#buttonFill)"
                        stroke="url(#buttonBorder)"
                        strokeWidth="1.5"
                    />
                </svg>
                
                {/* Text Content - Centered within button width */}
                <span className="
                    relative z-10
                    text-white
                    font-mono text-sm uppercase tracking-normal
                    transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]
                    text-center
                    w-full
                ">
                    {buttonText}
                </span>
            </div>

            {/* Icon Blob - 3D Treatment Matching Button */}
            <i className="
            relative flex items-center justify-center w-[51px] h-12 
            transform-gpu
            transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ">
                {/* Orange state SVG - Default visible */}
                <svg 
                    className="absolute inset-0 w-full h-full opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-0"
                    viewBox="0 0 51 48"
                    preserveAspectRatio="none"
                    style={{ 
                        filter: 'drop-shadow(0px 2px 0px rgba(224, 68, 0, 0.8)) drop-shadow(0 2px 4px rgba(224, 68, 0, 0.3))',
                        visibility: 'visible'
                    }}
                >
                    <defs>
                        {/* Orange state: Lighter orange top to darker orange bottom for 3D convex effect */}
                        <linearGradient id="blobFillOrange" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF7A2E" />
                            <stop offset="100%" stopColor="#CC3300" />
                        </linearGradient>
                        
                        {/* Rim Light gradient: Bright white/orange at top fading to transparent */}
                        <linearGradient id="blobBorderOrange" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    <path
                        d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"
                        fill="url(#blobFillOrange)"
                        stroke="url(#blobBorderOrange)"
                        strokeWidth="1.5"
                    />
                </svg>
                
                {/* Black state SVG (hover) - Completely hidden by default */}
                <svg 
                    className="absolute inset-0 w-full h-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-0 pointer-events-none"
                    viewBox="0 0 51 48"
                    preserveAspectRatio="none"
                    style={{ 
                        filter: 'drop-shadow(0px 2px 0px #000000) drop-shadow(0 2px 4px rgba(0,0,0,0.06))'
                    }}
                >
                    <defs>
                        {/* Black state: Same as button */}
                        <linearGradient id="blobFillBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2A2522" />
                            <stop offset="100%" stopColor="#1a1512" />
                        </linearGradient>
                        
                        {/* Rim Light gradient: Same as button */}
                        <linearGradient id="blobBorderBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    <path
                        d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"
                        fill="url(#blobFillBlack)"
                        stroke="url(#blobBorderBlack)"
                        strokeWidth="1.5"
                    />
                </svg>
                
                {/* Three-dot arrow icon */}
                <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                    <span className="flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] translate-x-0 group-hover:translate-x-[150%]">
                        <ArrowThreeDots color="#FFFFFF" className="w-6 h-6" />
                    </span>
                    <span className="absolute flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-x-[150%] group-hover:translate-x-0">
                        <ArrowThreeDots color="#FFFFFF" className="w-6 h-6" />
                    </span>
                </span>
            </i>
        </a>
    );
};

// --- MAGIC PATH COMPONENTS END ---


const PROJECT_ITEMS = [
    { title: "Custom Cowgirl", tags: ["Web Design", "Web Dev"], imageSrc: "/customcowgirl.png" },
    { title: "Mountain's Ledge", tags: ["Web Design", "Web Dev", "Email Marketing"], imageSrc: "/mountainsledge.png" },
    { title: "Farmulated", tags: ["Web Design", "Web Dev", "SEO", "Email Marketing"], imageSrc: "/farmulated.png" },
    { title: "The Skin Real", tags: ["Web Design", "Web Dev"], imageSrc: "/theskinreal.png" },
    { title: "LLM Research", tags: ["Web Design", "Web Dev"], imageSrc: "/llmresearch.png" },
    { title: "EOS Wellness", tags: ["Web Design", "Web Dev"], imageSrc: "/eos6152.png" },
    { title: "Agentis Longevity", tags: ["Web Design", "Web Dev"], imageSrc: "/agentisweb2.png" },
    { title: "Mantality Health", tags: ["Web Design", "Web Dev"], imageSrc: "/mantalityhealthhome2.png" },
    { title: "First Future", tags: ["Web Design", "Web Dev"], imageSrc: "/Firstfuture.png" },
    { title: "Symmetri", tags: ["Web Design", "Web Dev"], imageSrc: "/Symmetri.png" },
    { title: "WFH Investor", tags: ["Web Design", "Web Dev"], imageSrc: "/wfhinvestor.png" },
    { title: "Arete", tags: ["Web Design", "Web Dev"], imageSrc: "/arete.png" },
    { title: "Dubsy", tags: ["Web Design", "Web Dev"], imageSrc: "/dubsy.png" },
    { title: "MaxHealth MD", tags: ["Web Design", "Web Dev"], imageSrc: "/maxhealthmdweb2.png" },
    { title: "Arctic Elevation", tags: ["Web Design", "Web Dev"], imageSrc: "/arcticelevation.png" },
    { title: "Boombox", tags: ["Web Design", "Web Dev", "SEO"], imageSrc: "/boombox.png" },
    { title: "Two Cents", tags: ["Web Dev"], imageSrc: "/twocents.png" },
    { title: "Good Manors", tags: ["Web Design", "Web Dev"], imageSrc: "/goodmanors.png" },
    { title: "Big Old Pup", tags: ["Web Design", "Web Dev"], imageSrc: "/bigoldpup.png" },
    { title: "The Skin Real Serenbe", tags: ["Web Design", "Web Dev"], imageSrc: "/theskinrealserenbe.png" },
    { title: "enCappture", tags: ["Web Design", "Web Dev"], imageSrc: "/encappture.png" },
    { title: "North Star Nature Suites", tags: ["Web Design", "Web Dev", "SEO", "Email Marketing"], imageSrc: "/northstarnaturesuites.png" },
    { title: "Endura Commerce", tags: ["Web Design", "Web Dev"], imageSrc: "/endura.png" },
    { title: "Voyage and vibes", tags: ["Web Design", "Web Dev"], imageSrc: "/voyageandvibes.png" },
    { title: "Modern Mentor", tags: ["Web Design", "Web Dev"], imageSrc: "/modernmentor.png" },
    { title: "Core Development", tags: ["Web Design", "Web Dev"], imageSrc: "/coredevelopmenthome3.png" },
    { title: "Eagle's flight", tags: ["Web Design", "Web Dev"], imageSrc: "/eaglesflighthome.png" },
];

const splitIntoWords = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => (
        <span key={index}>
            {index > 0 && '\u00A0'}
            <span className="word inline-block">{word}</span>
        </span>
    ));
};

export function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const partnersRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const videoWordRef = useRef<HTMLSpanElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    /**
     * The hero contains an autoplay-loop <video> element. Chrome's Largest
     * Contentful Paint algorithm promotes media elements to LCP candidates,
     * but a looping autoplay video without a stable initial paint never lets
     * the LCP API finalize - which made Lighthouse / PageSpeed Insights
     * report NO_LCP for this page (cascading into Error! on TBT, Minify,
     * unused-CSS/JS and long-tasks audits). Verified via Chrome DevTools
     * PerformanceObserver: removing the <video> from the DOM made LCP fire
     * within 800ms; while the <video> existed, zero LCP entries fired.
     *
     * Fix: defer mounting the <video> by ~4 seconds. During the LCP
     * measurement window the page paints with a same-size placeholder so
     * the layout doesn't shift, Chrome can lock the H1 / subtext as LCP,
     * then the real video swaps in for users.
     */
    const [showHeroVideo, setShowHeroVideo] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;
        const t = window.setTimeout(() => setShowHeroVideo(true), 4000);
        return () => window.clearTimeout(t);
    }, []);

    useLayoutEffect(() => {
        if (!partnersRef.current || !headlineRef.current || !subtextRef.current) return;

        const ctx = gsap.context(() => {
            // Note: the GSAP playback-rate / blur ramp on the hero video used
            // to run here. With the video now mounted ~4s after first paint,
            // a separate effect (below) wires it up once it actually exists.

            const partnerPills = partnersRef.current!.querySelectorAll('.partner-pill');
            const videoWord = videoWordRef.current ? [videoWordRef.current] : [];
            const subtextWords = subtextRef.current!.querySelectorAll('.word');

            // NOTE: The headline words inside <h1> are intentionally NOT hidden
            // or animated here. Keeping them visible from the first paint lets
            // Chrome lock the <h1> spans as the Largest Contentful Paint element
            // instead of reporting NO_LCP, which cascades into Error! on TBT,
            // Minify, and unused-code audits in Lighthouse / PageSpeed Insights.
            gsap.set([...partnerPills, ...videoWord, ...subtextWords], {
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

            masterTl.to(videoWord, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.5');

            masterTl.to(subtextWords, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.02,
            }, '-=0.5');
        });

        return () => ctx.revert();
    }, []);

    /** Run the original playback-rate + blur ramp on the hero video, but only
     *  once the deferred video element is actually mounted. Keeps the same
     *  user-facing motion as before, while letting the LCP measurement window
     *  see no <video> in the DOM. */
    useEffect(() => {
        if (!showHeroVideo) return;
        const video = videoRef.current;
        if (!video) return;
        const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
        const videoState = { rate: 8, blur: 10 };
        video.playbackRate = videoState.rate;
        if (!isMobileViewport) {
            video.style.filter = `blur(${videoState.blur}px)`;
        }
        const tween = gsap.to(videoState, {
            rate: 1,
            blur: 0,
            duration: 3,
            ease: "power4.out",
            onUpdate: () => {
                if (videoRef.current) {
                    videoRef.current.playbackRate = videoState.rate;
                    if (!isMobileViewport) {
                        videoRef.current.style.filter = `blur(${videoState.blur}px)`;
                    }
                }
            },
        });
        return () => {
            tween.kill();
        };
    }, [showHeroVideo]);

    return (
        <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[#FAFAFA] pt-32 md:pt-48 pb-20 md:pb-32 text-center">
            <div className="container relative z-10 mx-auto px-4 max-w-full">

                {/* --- 1. PARTNER PILLS --- */}
                <div ref={partnersRef} className="mb-8 hidden md:flex flex-wrap items-center justify-center gap-3">
                    <div className="partner-pill flex items-center gap-2.5 rounded-xl border border-[#1a1512]/[0.06] bg-white/80 px-4 py-2 font-mono uppercase text-[11px] tracking-[0.15em] text-[#121212]/70" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                        <div className="relative h-4 w-4">
                            <Image src="/Elementor-Logo-Symbol-Red (1).svg" alt="Elementor" fill sizes="16px" className="object-contain" />
                        </div>
                        <span>Elementor Agency Partner</span>
                    </div>
                    <div className="partner-pill flex items-center gap-2.5 rounded-xl border border-[#1a1512]/[0.06] bg-white/80 px-4 py-2 font-mono uppercase text-[11px] tracking-[0.15em] text-[#121212]/70" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                        <div className="relative h-4 w-4">
                            <Image src="/shopify_glyph.svg" alt="Shopify" fill sizes="16px" className="object-contain" />
                        </div>
                        <span>Shopify Partner</span>
                    </div>
                    <div className="partner-pill flex items-center gap-2.5 rounded-xl border border-[#1a1512]/[0.06] bg-white/80 px-4 py-2 font-mono uppercase text-[11px] tracking-[0.15em] text-[#121212]/70" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                        <div className="relative h-4 w-4">
                            <Image src="/CUBE_2D_LIGHT.svg" alt="Cursor" fill sizes="16px" className="object-contain" />
                        </div>
                        <span>Cursor Experts</span>
                    </div>
                </div>

                {/* --- 2. HEADLINE ---
                 * The video used to live INSIDE the <h1>. Chrome promotes media
                 * elements to LCP candidates, but autoplay-loop video without a
                 * poster never produces a stable paint, which made Lighthouse
                 * report NO_LCP for the home page (cascading into Error! on
                 * TBT, Minify, unused-CSS/JS, and long-tasks audits in PSI).
                 *
                 * Fix: the H1 itself is the flex container, and the text spans
                 * + the decorative inline video span are direct flex siblings.
                 * The video gets aria-hidden and role="presentation" so it is
                 * treated as a decorative inline graphic. Visual layout stays
                 * the same: on desktop the video sits between "Fast Builds"
                 * and "Real Results" via sm:order-2, on mobile they stack.
                 */}
                <div className="mb-[clamp(1rem,2vw,1.5rem)] px-4 w-full overflow-hidden">
                    <h1
                        ref={headlineRef}
                        className="flex w-full flex-col sm:flex-row sm:flex-nowrap items-center justify-center gap-0 sm:gap-[1.5vw] text-[#1a1512] tracking-tighter"
                        style={{ fontFamily: "Nohemi, sans-serif", fontWeight: 300 }}
                    >
                        <span className="w-full text-center sm:w-auto text-[clamp(3.5rem,13vw,7.5rem)] sm:text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] sm:whitespace-nowrap">
                            Fast Builds
                        </span>
                        <span className="w-full text-center sm:w-auto text-[clamp(3.5rem,13vw,7.5rem)] sm:text-[clamp(2.5rem,5.5vw,8rem)] leading-[0.9] sm:whitespace-nowrap sm:order-3">
                            Real Results
                        </span>
                        <span
                            ref={videoWordRef}
                            className="video-word block sm:order-2 relative my-2 sm:my-0 translate-y-0 sm:translate-y-[0.20em]"
                            aria-hidden="true"
                            role="presentation"
                        >
                            {showHeroVideo ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    disableRemotePlayback
                                    disablePictureInPicture
                                    x-webkit-airplay="deny"
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="pointer-events-none w-[10rem] h-[10rem] sm:w-[clamp(3rem,10vw,10rem)] sm:h-[clamp(3rem,10vw,10rem)] object-cover rounded-full will-change-transform"
                                >
                                    <source src="/videoExport-2025-12-02@02-44-03.854-540x540@60fps.mp4" type="video/mp4" />
                                </video>
                            ) : (
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none w-[10rem] h-[10rem] sm:w-[clamp(3rem,10vw,10rem)] sm:h-[clamp(3rem,10vw,10rem)] rounded-full bg-[#1a1512]/5"
                                />
                            )}
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
                <div className="relative z-30 -mt-[200px] md:-mt-[220px] flex flex-col items-center pb-8 md:pb-12">
                    <AnimatedCTAButton />
                    <div className="mt-4 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5501] opacity-40" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5501]" />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#1a1512]/50">
                            2 Spots Available
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}