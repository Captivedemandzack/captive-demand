"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const OTHER_AGENCIES = [
    "Rigid with little flexibility",
    "Impersonal, outsourced teams",
    "Metric results at best",
    "Focus only on deliverables",
    "Disconnected services",
    "Tiered support without transparency",
];

const CAPTIVE_DEMAND = [
    "Custom-tailored to each client",
    "Realistic goals, consistently delivered",
    "Professional, conversion-focused design",
    "Focused on outcomes and growth",
    "Full-stack creative & performance team",
    "All in-house with full visibility",
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const slideLeft = {
    hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const slideRight = {
    hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export function WhyWorkWithUs() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-16"
                >
                    <motion.span
                        variants={fadeUp}
                        className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/50 block mb-3"
                    >
                        We are
                    </motion.span>
                    <motion.h2
                        variants={fadeUp}
                        className="text-[clamp(2rem,4vw+1rem,3.5rem)] leading-[1.1] tracking-tighter text-[#1a1512] mb-4"
                        style={{
                            fontFamily: "Nohemi, sans-serif",
                            fontWeight: 300,
                        }}
                    >
                        Why work with us?
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-[#1a1512]/50 text-sm md:text-base max-w-lg mx-auto font-sans"
                    >
                        Find out why Captive Demand is better than most
                        agencies.
                    </motion.p>
                </motion.div>

                {/* Comparison Grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                    {/* Other Agencies */}
                    <motion.div
                        variants={slideLeft}
                        className="rounded-2xl border border-[#1a1512]/5 bg-[#f6f5f6] p-6 md:p-8"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#1a1512]/20" />
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/40">
                                Other Agencies
                            </h3>
                        </div>
                        <motion.ul
                            variants={stagger}
                            className="space-y-4"
                        >
                            {OTHER_AGENCIES.map((item) => (
                                <motion.li
                                    key={item}
                                    variants={fadeUp}
                                    className="flex items-start gap-3"
                                >
                                    <X
                                        size={14}
                                        strokeWidth={1.5}
                                        className="text-[#1a1512]/20 mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-[#1a1512]/40 text-sm font-sans">
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Captive Demand */}
                    <motion.div
                        variants={slideRight}
                        className="rounded-2xl bg-white border border-[#1a1512]/5 p-6 md:p-8"
                        style={{
                            boxShadow:
                                "inset 0 1px 0 0 rgba(255,255,255,0.15), 0 10px 15px -3px rgba(26,21,18,0.05), 0 4px 6px -4px rgba(26,21,18,0.05)",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-orange" />
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/80">
                                Captive Demand
                            </h3>
                        </div>
                        <motion.ul
                            variants={stagger}
                            className="space-y-4"
                        >
                            {CAPTIVE_DEMAND.map((item) => (
                                <motion.li
                                    key={item}
                                    variants={fadeUp}
                                    className="flex items-start gap-3"
                                >
                                    <Check
                                        size={14}
                                        strokeWidth={1.5}
                                        className="text-brand-orange mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-[#1a1512]/80 text-sm font-sans font-medium">
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
