"use client";

import React from "react";
import { motion } from "framer-motion";

type Award = {
    name: string;
    description: string;
    year: string;
};

const AWARDS: Award[] = [
    {
        name: "WebVision Best Agency Website",
        description:
            "Awarded for innovative layout and conversion-optimized content.",
        year: "2024",
    },
    {
        name: "Clarity UX Impact Award",
        description:
            "Honored for delivering a user-first experience that improved client engagement and metrics.",
        year: "2023",
    },
    {
        name: "Motion Forward Excellence in Animation",
        description:
            "Known for best motion design work that elevated brand storytelling.",
        year: "2023",
    },
    {
        name: "Studio of the Year — Upstart Awards",
        description:
            "Recognized for exceptional creativity, strategic thinking, and bold execution.",
        year: "2022",
    },
];

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const slideIn = {
    hidden: { opacity: 0, x: -20, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export function AwardsSection() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mb-12"
                >
                    <motion.span
                        variants={fadeUp}
                        className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/50 block mb-3"
                    >
                        Achievements
                    </motion.span>
                    <motion.h2
                        variants={fadeUp}
                        className="text-[clamp(2rem,4vw+1rem,3.5rem)] leading-[1.1] tracking-tighter text-[#1a1512]"
                        style={{
                            fontFamily: "Nohemi, sans-serif",
                            fontWeight: 300,
                        }}
                    >
                        Awards
                    </motion.h2>
                </motion.div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[2fr_3fr_1fr] gap-4 pb-3 border-b border-[#1a1512]/10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512]/30">
                        Name of the award
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512]/30">
                        Description
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512]/30 text-right">
                        Year
                    </span>
                </div>

                {/* Award Rows */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {AWARDS.map((award) => (
                        <motion.div
                            key={award.name}
                            variants={slideIn}
                            className="grid grid-cols-1 md:grid-cols-[2fr_3fr_1fr] gap-2 md:gap-4 py-5 md:py-6 border-b border-[#1a1512]/10 items-baseline group hover:bg-[#1a1512]/[0.02] transition-colors duration-200 -mx-4 px-4 rounded-lg"
                        >
                            <h3
                                className="text-[#1a1512] text-sm md:text-base font-medium"
                                style={{
                                    fontFamily: "Nohemi, sans-serif",
                                    fontWeight: 400,
                                }}
                            >
                                {award.name}
                            </h3>
                            <p className="text-[#1a1512]/50 text-xs md:text-sm leading-relaxed font-sans">
                                {award.description}
                            </p>
                            <span className="font-mono text-xs text-[#1a1512]/40 md:text-right">
                                {award.year}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
