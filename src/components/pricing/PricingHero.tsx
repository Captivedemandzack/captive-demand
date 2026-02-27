'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

interface PricingHeroProps {
    billingCycle: 'monthly' | 'annual';
    onToggle: (cycle: 'monthly' | 'annual') => void;
}

export function PricingHero({ billingCycle, onToggle }: PricingHeroProps) {
    const labelRef = useRef<HTMLSpanElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "PRICING";
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                gsap.to({}, {
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
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
                            labelRef.current.textContent = "/ PRICING";
                        }
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] pt-32 md:pt-40 pb-16 md:pb-24 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="mb-6 w-full">
                    <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16"
                >
                    <div>
                        <motion.span
                            variants={fadeUp}
                            ref={labelRef}
                            className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                        >
                            / PRICING
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#1a1512] tracking-tighter"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                        >
                            We&apos;ve got a plan<br />
                            <span className="text-[#1a1512]/40">that&apos;s perfect for you</span>
                        </motion.h1>
                    </div>

                    {/* Social Proof */}
                    <motion.div variants={fadeUp} className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] bg-[#1a1512]/10 overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${['#ff5501', '#8b5cf6', '#1a1512', '#E8DDD3'][i]} 0%, ${['#8f3a00', '#6d28d9', '#2d2621', '#d5c9bd'][i]} 100%)`,
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <Star key={i} size={14} fill="#ff5501" className="text-[#ff5501]" strokeWidth={0} />
                                ))}
                                <span className="font-mono text-xs text-[#1a1512] ml-1 font-bold">5.0</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#1a1512]/50 uppercase tracking-wider">
                                from 4,200+ reviews
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Billing Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <div className="inline-flex items-center rounded-full p-1 bg-[#f3f4f6] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-sm border border-[#1a1512]/5">
                        <button
                            onClick={() => onToggle('monthly')}
                            className={`
                                relative px-5 py-2.5 rounded-full text-sm font-mono tracking-wide transition-all duration-300
                                ${billingCycle === 'monthly'
                                    ? 'bg-[#1a1512] text-white shadow-lg'
                                    : 'text-[#1a1512]/60 hover:text-[#1a1512]'
                                }
                            `}
                        >
                            Monthly billing
                        </button>
                        <button
                            onClick={() => onToggle('annual')}
                            className={`
                                relative px-5 py-2.5 rounded-full text-sm font-mono tracking-wide transition-all duration-300
                                ${billingCycle === 'annual'
                                    ? 'bg-[#1a1512] text-white shadow-lg'
                                    : 'text-[#1a1512]/60 hover:text-[#1a1512]'
                                }
                            `}
                        >
                            Annual billing
                        </button>
                    </div>

                    {billingCycle === 'annual' && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#ff5501]/10 text-[#ff5501] text-xs font-mono font-bold uppercase tracking-wider"
                        >
                            Save 20%
                        </motion.span>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
