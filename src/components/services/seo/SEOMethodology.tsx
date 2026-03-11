'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

gsap.registerPlugin(ScrollTrigger);

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

const methodologyData = [
    {
        id: '01',
        name: 'Audit & Discovery',
        subtext: <>Find the gaps.<br />Map the opportunity.</>,
        description: "Before we touch a single meta tag, we run a comprehensive audit of your entire digital footprint. We analyze your technical health, content gaps, competitor positioning, and AI citation landscape. This isn't a cookie-cutter checklist — it's a forensic examination of why you're invisible and exactly what it takes to fix it.",
        tags: ["Technical Audit", "Content Gap Analysis", "Competitor Intel", "AI Citation Mapping", "Keyword Universe", "SERP Analysis"],
        cards: [
            { title: 'Farmulated SEO', image: '/farmulated.png' },
            { title: 'Boombox SEO', image: '/boombox.png' },
            { title: 'North Star', image: '/northstarnaturesuites.png' },
        ],
    },
    {
        id: '02',
        name: 'Technical SEO',
        subtext: <>Fix the foundation.<br />Speed wins.</>,
        description: "Your website's technical infrastructure determines whether search engines can even find, crawl, and index your content. We fix Core Web Vitals, implement structured data markup, optimize crawl budgets, and ensure your site architecture feeds AI the signals it needs to trust you as an authoritative source.",
        tags: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Crawl Optimization", "Mobile-First", "Page Speed"],
        cards: [
            { title: 'EOS Wellness', image: '/eoswellness.png' },
            { title: 'Symmetri', image: '/Symmetri.png' },
            { title: 'First Future', image: '/Firstfuture.png' },
        ],
    },
    {
        id: '03',
        name: 'Content & Entity Strategy',
        subtext: <>Own the conversation.<br />Become the answer.</>,
        description: "We build content that isn't just optimized for keywords — it's engineered to be cited by AI. We map your brand's entity graph, create topical authority clusters, and produce content that positions you as the definitive source in your market. This is how you become the answer, not just a result.",
        tags: ["Entity SEO", "Topical Authority", "Content Clusters", "AI-Optimized Copy", "FAQ Engineering", "Knowledge Panels"],
        cards: [
            { title: 'WFH Investor', image: '/wfhinvestor.png' },
            { title: 'Modern Mentor', image: '/modernmentor.png' },
            { title: 'Endura', image: '/endura.png' },
        ],
    },
    {
        id: '04',
        name: 'Monitor & Scale',
        subtext: <>Measure everything.<br />Scale what works.</>,
        description: "SEO isn't a project — it's a system. We track rankings, AI citations, traffic patterns, and conversion data in real-time. Monthly strategy reviews identify what's working and where to double down. As your authority grows, we expand into new markets, topics, and AI platforms systematically.",
        tags: ["Rank Tracking", "AI Citation Monitoring", "Monthly Reporting", "Conversion Tracking", "Market Expansion", "ROI Analysis"],
        cards: [
            { title: 'Custom Cowgirl', image: '/customcowgirl.png' },
            { title: 'Dubsy', image: '/dubsy.png' },
            { title: 'Good Manors', image: '/goodmanors.png' },
        ],
    },
];

const ServiceContent = ({ service }: { service: typeof methodologyData[0] }) => (
    <div className="pb-8 pt-4 px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
            {/* Column 1: Subtext & CTA */}
            <div className="lg:col-span-4 flex flex-col items-start">
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-sm leading-snug">
                    {service.subtext}
                </p>
                <AnimatedCTAButton />
            </div>

            {/* Column 2: Description */}
            <div className="lg:col-span-4">
                <p className="font-mono text-sm leading-relaxed text-white/60">
                    {service.description}
                </p>
            </div>

            {/* Column 3: Tags */}
            <div className="lg:col-span-4">
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                    {service.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-[7px] border border-white/10 text-xs font-mono text-white/60 hover:border-white/40 hover:text-white transition-colors cursor-default" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.15)' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.cards.map((card, i) => (
                <div key={i} className="group relative w-full aspect-square rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-[#1a1512]/15 via-[#1a1512]/8 via-[#1a1512]/12 to-[#1a1512]/15">
                        <div className="w-full h-full rounded-2xl bg-white/98 backdrop-blur-sm shadow-sm overflow-hidden">
                            <div className="absolute top-4 left-4 z-20">
                                <span
                                    className="text-[10px] font-medium px-3 py-1.5 rounded-[7px] uppercase tracking-wider"
                                    style={{
                                        background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                                        color: '#1a1512',
                                        boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    {card.title}
                                </span>
                            </div>
                            <div className="absolute inset-0">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    priority={i === 0}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </div>
                </div>
            ))}

            {/* CTA Card */}
            <div className="group relative w-full aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-[#ff5501] hover:border-[#ff5501] transition-all duration-500">
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/10 text-white text-[10px] font-mono px-3 py-1.5 rounded-[7px] uppercase tracking-wide">
                        Your Brand Here →
                    </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={48} className="text-white opacity-50 group-hover:opacity-0 transition-all duration-300" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                    <span className="text-lg md:text-xl font-medium" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                        Start ranking
                    </span>
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    </div>
);

const AccordionItem = ({
    service,
    isOpen,
    onClick,
}: {
    service: typeof methodologyData[0];
    isOpen: boolean;
    onClick: () => void;
}) => (
    <div
        className={`
            relative w-full overflow-hidden transition-all duration-500 ease-in-out
            rounded-3xl
            ${isOpen ? 'bg-[#1a1512]' : 'bg-[#f3f4f6] hover:bg-[#e8e8e8]'}
        `}
        style={isOpen ? { boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08)' } : {}}
    >
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-6 md:p-8"
        >
            <div className="flex items-center gap-4 md:gap-8">
                <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-[#ff5501] font-bold' : 'text-[#1a1512]/40'}`}>
                    {service.id}
                </span>
                <span
                    className={`text-2xl md:text-4xl uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white font-medium' : 'text-[#1a1512]/60 group-hover:text-[#1a1512]'}`}
                    style={{ fontFamily: 'Nohemi, sans-serif' }}
                >
                    {service.name}
                </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                ? 'bg-white/10 text-white'
                : 'bg-[#e8e8e8] text-[#1a1512]/40 hover:bg-[#d5d5d5]'
                }`}>
                <Plus
                    size={20}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                />
            </div>
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    <ServiceContent service={service} />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export function SEOMethodology() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const labelRef = useRef<HTMLSpanElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 600);
        return () => clearTimeout(timeout);
    }, [openIndex]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "OUR PROCESS";
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
                            labelRef.current.textContent = "/ OUR PROCESS";
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
                <div className="mb-12 md:mb-16">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div>
                            <span
                                ref={labelRef}
                                className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                            >
                                / OUR PROCESS
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] tracking-tighter"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                From invisible to inevitable.<AccentBr />
                                <span className="text-[#1a1512]/40">The system behind the rankings.</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {methodologyData.map((service, index) => (
                        <AccordionItem
                            key={service.id}
                            service={service}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
