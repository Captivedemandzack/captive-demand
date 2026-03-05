'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
    {
        client: 'Farmulated',
        industry: 'Health & Wellness',
        image: '/farmulated.png',
        metric: '+427%',
        metricLabel: 'Organic Traffic',
        description: 'From page 5 to position 1 for 34 high-intent keywords in a hyper-competitive CBD market.',
        tags: ['SEO', 'Content Strategy', 'AEO'],
    },
    {
        client: 'North Star Nature Suites',
        industry: 'Hospitality',
        image: '/northstarnaturesuites.png',
        metric: '+289%',
        metricLabel: 'Direct Bookings',
        description: 'Dominated local search and AI answers for luxury cabin rentals, cutting OTA dependency by 60%.',
        tags: ['Local SEO', 'Schema Markup', 'AEO'],
    },
    {
        client: 'Boombox',
        industry: 'Entertainment',
        image: '/boombox.png',
        metric: '+512%',
        metricLabel: 'Search Visibility',
        description: 'Built topical authority from scratch, earning AI citations across ChatGPT and Google SGE within 4 months.',
        tags: ['Technical SEO', 'Entity SEO', 'AEO'],
    },
    {
        client: 'EOS Wellness',
        industry: 'Medical Spa',
        image: '/eoswellness.png',
        metric: '+198%',
        metricLabel: 'Lead Generation',
        description: 'Captured zero-click search traffic with rich snippets and FAQ schema for high-value med-spa services.',
        tags: ['Local SEO', 'Rich Snippets', 'Content'],
    },
    {
        client: 'WFH Investor',
        industry: 'Real Estate',
        image: '/wfhinvestor.png',
        metric: '+356%',
        metricLabel: 'Organic Sessions',
        description: 'Created a content ecosystem that positioned the brand as the go-to authority for remote work real estate investing.',
        tags: ['Content Strategy', 'Topical Authority', 'SEO'],
    },
    {
        client: 'Custom Cowgirl',
        industry: 'E-Commerce',
        image: '/customcowgirl.png',
        metric: '+243%',
        metricLabel: 'Revenue from SEO',
        description: 'Technical overhaul and product schema implementation drove a 3x increase in organic e-commerce revenue.',
        tags: ['E-Commerce SEO', 'Schema', 'Technical'],
    },
];

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

export function SEOCaseStudies() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "CASE STUDIES";
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
                            labelRef.current.textContent = "/ CASE STUDIES";
                        }
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 relative overflow-hidden">
            <NoiseOverlay />
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-24">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div>
                            <span
                                ref={labelRef}
                                className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                            >
                                / CASE STUDIES
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] tracking-tighter"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Proof, not promises.<br />
                                <span className="text-[#1a1512]/40">Real results for real brands.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                Every metric is verified. Every result is from a real client in a real market.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                            className="group relative rounded-2xl overflow-hidden bg-white border border-[#1a1512]/5 cursor-pointer"
                            style={{
                                boxShadow: '0 4px 20px rgba(26,21,18,0.04), 0 1px 3px rgba(26,21,18,0.06)',
                            }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                {/* Browser Chrome */}
                                <div className="absolute top-0 left-0 right-0 h-7 bg-[#f3f4f6] flex items-center px-3 z-10 border-b border-[#1a1512]/5">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
                                        <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
                                        <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
                                    </div>
                                </div>
                                <Image
                                    src={study.image}
                                    alt={study.client}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                                {/* Metric Badge */}
                                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-[rgba(247,247,247,0.17)] backdrop-blur-[10px] text-white px-3 py-1.5 rounded-[6px]">
                                    <TrendingUp size={12} className="text-[#ff5501]" strokeWidth={2} />
                                    <span className="text-sm font-bold tracking-tight">{study.metric}</span>
                                    <span className="text-[10px] font-mono text-white/50 uppercase">{study.metricLabel}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3
                                            className="text-lg text-[#1a1512] mb-0.5"
                                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                                        >
                                            {study.client}
                                        </h3>
                                        <span className="font-mono text-[11px] text-[#1a1512]/40 uppercase tracking-wider">
                                            {study.industry}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center group-hover:bg-[#ff5501] group-hover:text-white transition-colors duration-300">
                                        <ArrowUpRight size={14} className="text-[#1a1512]/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <p className="font-mono text-xs text-[#1a1512]/50 leading-relaxed mb-4">
                                    {study.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {study.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#f3f4f6] text-[#1a1512]/50"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
