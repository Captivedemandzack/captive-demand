'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
    'Traditional agencies burn months before you see anything tangible',
    'Bloated teams add meetings, slow decisions, and inflate project costs',
    'Pricing is hidden with vague scopes that grow larger mid-project',
];

const comparisonData = [
    {
        theirs: { label: 'Typical Agency Timeline', value: '6-12 months', sublabel: 'before measurable results' },
        ours: { label: 'Our Timeline', value: '90 days', sublabel: 'to first-page rankings' },
    },
    {
        theirs: { label: 'Avg. Agency SEO Cost', value: '$5-15k/mo', sublabel: 'locked into annual contracts' },
        ours: { label: 'Our Pricing', value: '$1.5-3.5k/mo', sublabel: 'cancel anytime' },
    },
];

const DecorativeShapeWithLine = ({ shapeColor = "#d5d5d5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

export function WhyAEO() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "THE PROBLEM";
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                gsap.to({}, {
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: function () {
                        const progress = this.progress();
                        let result = "";
                        for (let i = 0; i < originalText.length; i++) {
                            if (originalText[i] === " ") {
                                result += " ";
                            } else if (progress > i / originalText.length) {
                                result += originalText[i];
                            } else {
                                result += chars[Math.floor(Math.random() * chars.length)];
                            }
                        }
                        if (labelRef.current) {
                            labelRef.current.textContent = "/ " + result;
                        }
                    },
                    onComplete: function () {
                        if (labelRef.current) {
                            labelRef.current.textContent = "/ THE PROBLEM";
                        }
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-28 px-4 relative overflow-hidden">
            {/* Noise Texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Decorative line */}
                <div className="mb-6 w-full">
                    <DecorativeShapeWithLine />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* LEFT: Typography & Pain Points */}
                    <div>
                        <span
                            ref={labelRef}
                            className="font-mono text-[11px] tracking-[0.25em] text-[#1a1512]/40 uppercase block mb-6"
                        >
                            / THE PROBLEM
                        </span>

                        <h2
                            className="text-3xl md:text-4xl lg:text-[2.75rem] text-[#1a1512] leading-[1.15] mb-10 tracking-tighter"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                        >
                            Traditional SEO agencies<br className="hidden md:block" />
                            weren&apos;t built for the<br className="hidden md:block" />
                            <span className="text-[#1a1512]/30">AI search era</span>
                        </h2>

                        <div className="flex flex-col gap-4">
                            {painPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="flex items-start gap-3"
                                >
                                    <XCircle size={18} className="text-[#1a1512]/15 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                    <span className="text-sm text-[#1a1512]/50 leading-relaxed">
                                        {point}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: 2x2 Comparison Grid */}
                    <div className="flex flex-col gap-3">
                        {comparisonData.map((row, rowIndex) => (
                            <motion.div
                                key={rowIndex}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: rowIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {/* Theirs - Muted light card */}
                                <div
                                    className="rounded-2xl p-5 md:p-6 border border-[#1a1512]/[0.06] bg-[#f3f4f6]"
                                    style={{
                                        boxShadow: '0 1px 3px rgba(26,21,18,0.04)',
                                    }}
                                >
                                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#1a1512]/25 uppercase block mb-3">
                                        {row.theirs.label}
                                    </span>
                                    <span
                                        className="text-2xl md:text-3xl text-[#1a1512]/50 block mb-1.5 tracking-tight"
                                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                                    >
                                        {row.theirs.value}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#1a1512]/20 leading-tight">
                                        {row.theirs.sublabel}
                                    </span>
                                </div>

                                {/* Ours - Brand accent card */}
                                <div
                                    className="rounded-2xl p-5 md:p-6 relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #ff5501, #cc3300)',
                                        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 8px 32px -8px rgba(255,85,1,0.25), 0 2px 4px rgba(255,85,1,0.1)',
                                    }}
                                >
                                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/60 uppercase block mb-3">
                                        {row.ours.label}
                                    </span>
                                    <span
                                        className="text-2xl md:text-3xl text-white block mb-1.5 tracking-tight"
                                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                                    >
                                        {row.ours.value}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/50 leading-tight">
                                        {row.ours.sublabel}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
