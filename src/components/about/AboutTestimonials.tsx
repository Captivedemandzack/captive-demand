"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

type Testimonial = {
    text: string;
    author: string;
    role: string;
    company: string;
    image: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        text: "We needed a modern, high-converting website, and the Captive team delivered beyond expectations. Their design craft hit expected results and boosted conversions by 800% in just two weeks. Highly recommend.",
        author: "Tricia Restifo",
        role: "VP Finance",
        company: "Farmulated",
        image: "/tricia.webp",
    },
    {
        text: "First thing I noticed is the holistic design. Every detail was intentionally crafted. I've worked with agencies before, the results beat expectations. Their design craft 30% expected and boosted conversion rates phenomenally.",
        author: "Jordan Schneider",
        role: "Head of Marketing",
        company: "Boombox",
        image: "/Jordan.jpeg",
    },
    {
        text: "We needed a modern, high-converting website, and the Bravio team delivered beyond expectations. Their design craft hit expected results and boosted conversions by 800% in just two weeks. Highly recommend.",
        author: "Ben Elizer",
        role: "CEO",
        company: "Velocity International",
        image: "/ben.webp",
    },
];

const SmallQuoteIcon = () => (
    <svg
        width="18"
        height="16"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
    >
        <path
            d="M19.7711 12.3665C20.0495 11.3681 18.976 10.6575 17.9395 10.6575C16.5573 10.6575 15.3611 10.1461 14.351 9.12342C13.2878 8.10074 12.7561 6.86277 12.7561 5.40948C12.7561 3.90236 13.2878 2.61054 14.351 1.53403C15.3611 0.511342 16.6104 0 18.099 0C19.9065 0 21.3419 0.645908 22.4051 1.93772C23.4684 3.22954 24 4.89814 24 6.94351C24 10.496 23.0431 13.4026 21.1292 15.6632C19.3099 17.8634 16.818 19.5043 13.6535 20.5857C13.3829 20.6782 13.0928 20.5194 13.0184 20.2432C12.9581 20.0193 13.0593 19.7839 13.2603 19.6683C15.079 18.6223 16.6387 17.3143 17.9395 15.744C18.8192 14.7163 19.4297 13.5904 19.7711 12.3665ZM7.01491 12.6167C7.29338 11.6183 6.21987 10.9077 5.18331 10.9077C3.80108 10.9077 2.60493 10.3963 1.59484 9.37366C0.531589 8.35098 0 7.11299 0 5.6597C0 4.15258 0.531589 2.86076 1.59484 1.78425C2.60493 0.761562 3.85425 0.25022 5.3428 0.25022C7.15032 0.25022 8.58571 0.896128 9.64896 2.18794C10.7122 3.47976 11.2438 5.14836 11.2438 7.19373C11.2438 10.7462 10.2869 13.6528 8.37306 15.9135C6.55373 18.1137 4.06185 19.7545 0.897371 20.836C0.626768 20.9285 0.336657 20.7696 0.262276 20.4935C0.201963 20.2696 0.30315 20.0341 0.504164 19.9185C2.32284 18.8726 3.88253 17.5645 5.18331 15.9942C6.06302 14.9665 6.67355 13.8407 7.01491 12.6167Z"
            fill="url(#quoteGradientSmall)"
        />
        <defs>
            <linearGradient
                id="quoteGradientSmall"
                x1="-4.65"
                y1="13.23"
                x2="27.28"
                y2="14.36"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.127" stopColor="#FF3407" />
                <stop offset="0.227" stopColor="#FC964C" />
                <stop offset="0.305" stopColor="#FC964C" />
                <stop offset="0.491" stopColor="#F62F03" />
                <stop offset="1" stopColor="#FD7C34" />
            </linearGradient>
        </defs>
    </svg>
);

function AnimatedCounter({
    target,
    suffix,
}: {
    target: number;
    suffix: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        let frame: number;
        const duration = 1200;
        const start = performance.now();

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [inView, target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export function AboutTestimonials() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* Left: Stat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        className="flex-shrink-0"
                    >
                        <p
                            className="text-[clamp(4rem,8vw,7rem)] leading-none tracking-tighter text-[#1a1512]"
                            style={{
                                fontFamily: "Nohemi, sans-serif",
                                fontWeight: 300,
                            }}
                        >
                            <AnimatedCounter target={8} suffix="X" />
                        </p>
                        <p className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/40 mt-2">
                            Increase in conversion rate
                        </p>
                    </motion.div>

                    {/* Right: Testimonial Cards */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1"
                    >
                        {TESTIMONIALS.map((t) => (
                            <motion.div
                                key={t.author}
                                variants={fadeUp}
                                className="relative bg-[#f6f5f6] border border-black/5 rounded-2xl p-5 md:p-6 flex flex-col"
                                style={{
                                    boxShadow:
                                        "0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 16px 40px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)",
                                }}
                            >
                                {/* Corner Rivets */}
                                <div className="absolute top-3 left-3 w-[6px] h-[6px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                                <div className="absolute top-3 right-3 w-[6px] h-[6px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                                <div className="absolute bottom-3 left-3 w-[6px] h-[6px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                                <div className="absolute bottom-3 right-3 w-[6px] h-[6px] rounded-full z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))', boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)' }} />
                                <SmallQuoteIcon />
                                <p className="font-mono text-[11px] md:text-xs text-[#1a1512]/60 leading-relaxed mt-4 mb-6 flex-1">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                                        <Image
                                            src={t.image}
                                            alt={t.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1a1512] text-xs">
                                            {t.author}
                                        </p>
                                        <p className="text-[10px] text-[#1a1512]/50">
                                            {t.role}, {t.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
