"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PARTNER_LOGOS = [
    { name: "Farmulated", src: "/logos/farmulated.png" },
    { name: "Boombox", src: "/logos/boombox.svg" },
    { name: "BachBar", src: "/logos/bachbar.png" },
    { name: "Velocity", src: "/logos/velocity.png" },
    { name: "Endura Commerce", src: "/logos/enduracommerce.svg" },
    { name: "Modern Mentor", src: "/logos/modernmentor.png" },
    { name: "Arctic Elevation", src: "/logos/arcticelevation.png" },
    { name: "Arete", src: "/logos/arete.png" },
];

const HERO_IMAGES = [
    { src: "/spencer-donaldson.jpg", alt: "Team collaboration", span: "row-span-2" },
    { src: "/creativedirection1.png", alt: "Design process", span: "" },
    { src: "/creativedirection2.png", alt: "Strategy session", span: "" },
];

export function AboutHero() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headlineRef.current || !subtextRef.current || !tagRef.current) return;

        const words = headlineRef.current.querySelectorAll(".word");
        const subtextWords = subtextRef.current.querySelectorAll(".word");

        gsap.set([tagRef.current, ...words, ...subtextWords], {
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
        });

        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(tagRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.6,
            ease: "power4.out",
        });

        tl.to(
            words,
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.08,
            },
            "-=0.3"
        );

        tl.to(
            subtextWords,
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.04,
            },
            "-=0.4"
        );

        return () => {
            tl.kill();
        };
    }, []);

    const headlineWords = "We take pride in delivering".split(" ");

    return (
        <section className="relative w-full bg-[#FAFAFA] pt-32 md:pt-44 pb-20 md:pb-32 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Tag Label */}
                <div ref={tagRef} className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/50">
                        About us
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                </div>

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1.05] tracking-tighter text-[#1a1512] mb-6"
                    style={{ fontFamily: "Nohemi, sans-serif", fontWeight: 300 }}
                >
                    {headlineWords.map((word, i) => (
                        <span key={i} className="word inline-block mr-[0.3em]">
                            {word}
                        </span>
                    ))}
                    <br />
                    <span
                        className="word inline-block italic text-[#1a1512]/80"
                        style={{ fontFamily: "Syne, sans-serif", fontWeight: 400 }}
                    >
                        Exceptional results
                    </span>
                </h1>

                {/* Subtext */}
                <p
                    ref={subtextRef}
                    className="max-w-xl text-[#1a1512]/60 text-base md:text-lg leading-relaxed mb-16 font-sans"
                >
                    {"We're a digital agency focused on creating high-performing websites and marketing strategies that fuel growth."
                        .split(" ")
                        .map((word, i) => (
                            <span key={i} className="word inline-block mr-[0.3em]">
                                {word}
                            </span>
                        ))}
                </p>

                {/* Asymmetric Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="col-span-1 row-span-2 relative aspect-[3/4] md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                    >
                        <Image
                            src={HERO_IMAGES[0].src}
                            alt={HERO_IMAGES[0].alt}
                            fill
                            className="object-cover grayscale"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.08,
                        }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                    >
                        <Image
                            src={HERO_IMAGES[1].src}
                            alt={HERO_IMAGES[1].alt}
                            fill
                            className="object-cover grayscale"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.16,
                        }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                    >
                        <Image
                            src={HERO_IMAGES[2].src}
                            alt={HERO_IMAGES[2].alt}
                            fill
                            className="object-cover grayscale"
                        />
                    </motion.div>
                </div>

                {/* Trusted By Strip */}
                <div className="flex flex-col items-center gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512]/30">
                        Trusted by top companies
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        {PARTNER_LOGOS.map((logo) => (
                            <motion.div
                                key={logo.name}
                                whileHover={{ y: -2 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                className="opacity-30 hover:opacity-50 transition-opacity duration-300"
                                style={{ filter: "grayscale(100%)" }}
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={100}
                                    height={40}
                                    className="h-6 md:h-8 w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
