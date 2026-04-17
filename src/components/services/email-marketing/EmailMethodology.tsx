'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { prefetchImageUrls } from '@/lib/prefetch-images';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { AccentBr } from '@/components/ui/accent-br';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

/** Matches SEO methodology cards: brand name + stat + uppercase label (12 clients = 3 × 4 sections). */
type EmailMethodologyCard = {
    brand: string;
    stat: string;
    label: string;
    image: string;
};

const emailServicesData: Array<{
    id: string;
    name: string;
    subtext: ReactNode;
    description: string;
    tags: string[];
    cards: EmailMethodologyCard[];
}> = [
    {
        id: '01',
        name: 'Audit',
        subtext: <>We don&apos;t blast.<br />We diagnose.</>,
        description: "Before writing a single subject line, we dissect your existing list health, deliverability scores, and past campaign performance. We identify what's leaking revenue, what's hitting spam, and where the untapped segments are hiding. The audit becomes the blueprint for everything that follows.",
        tags: ["List Health Analysis", "Deliverability Audit", "Spam Score Check", "Past Campaign Review", "Competitor Benchmarks", "Tech Stack Assessment"],
        cards: [
            { brand: 'Pontoon Saloon', stat: '+38%', label: 'AVG. OPEN RATE', image: '/seo/pontoonseo.webp' },
            { brand: 'WFH Investor', stat: '+42%', label: 'REPLY RATE', image: '/wfhinvestoremail.avif' },
            { brand: 'North Star Nature Suites', stat: '+56%', label: 'BOOKING EMAIL CTR', image: '/seo/northstarseo.jpg' },
        ],
    },
    {
        id: '02',
        name: 'Segmentation',
        subtext: <>Right message,<br />right inbox.</>,
        description: "Batch-and-blast is dead. We build behavioral and lifecycle segments that treat your subscribers like humans, not rows in a spreadsheet. Purchase history, browsing behavior, engagement scores — every signal becomes a lever for relevance. The result: emails people actually want to open.",
        tags: ["Behavioral Segments", "Lifecycle Stages", "Purchase History", "Engagement Scoring", "RFM Analysis", "Dynamic Lists"],
        cards: [
            { brand: 'Boombox', stat: '+48%', label: 'RE-ENGAGEMENT', image: '/seo/boomboxseo.jpg' },
            { brand: 'Two Cents', stat: '+22%', label: 'LIST HEALTH SCORE', image: '/seo/twocentsseo.jpg' },
            { brand: 'Dubsy', stat: '+19%', label: 'TRIAL EMAIL CTR', image: '/dubsyemail.webp' },
        ],
    },
    {
        id: '03',
        name: 'Design & Copy',
        subtext: <>Open-worthy.<br />Click-worthy.</>,
        description: "Subject lines engineered for dopamine. Templates designed for thumb-stopping clarity on mobile. We pair conversion copywriting with on-brand visual systems that look premium in every inbox — Gmail, Apple Mail, Outlook. Every pixel and word earns its place.",
        tags: ["Subject Line Frameworks", "Mobile-First Templates", "Conversion Copy", "Brand Consistency", "Dark Mode Testing", "Visual Hierarchy"],
        cards: [
            { brand: 'Voyage & Vibes', stat: '+29%', label: 'ABANDON RECOVERY', image: '/voyageandvibesemail.jpg' },
            { brand: 'Velocity', stat: '+35%', label: 'FLOW COMPLETION', image: '/seo/velocityseo.jpg' },
            { brand: 'Dunlap', stat: '+27%', label: 'LEAD NURTURE CTR', image: '/seo/dunlapseo.webp' },
        ],
    },
    {
        id: '04',
        name: 'Automation',
        subtext: <>Set it.<br />Scale it.</>,
        description: "Welcome sequences that convert on day one. Abandoned cart flows that recover lost revenue at 3 AM. Win-back campaigns that resurrect dormant subscribers. We build the machine once, then let compound returns do the heavy lifting while you sleep.",
        tags: ["Welcome Flows", "Abandoned Cart", "Win-Back Series", "Post-Purchase", "Browse Abandon", "Sunset Policy"],
        cards: [
            { brand: "Mountains Ledge", stat: '+31%', label: 'REPEAT PURCHASE RATE', image: "/mountain'sledgeemail.jpg" },
            { brand: 'Nashville Water Taxi', stat: '3×', label: 'RESERVATION CLICKS', image: '/seo/nashvillewatertaxiseo.jpg' },
            { brand: 'The Skin Real', stat: '+33%', label: 'CONSULT REQUESTS', image: '/theskinrealemail.png' },
        ],
    },
];

const ServiceContent = ({ service }: { service: typeof emailServicesData[0] }) => (
    <div className="pb-8 pt-4 px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
            <div className="lg:col-span-4 flex flex-col items-start">
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-sm leading-snug">
                    {service.subtext}
                </p>
                <AnimatedCTAButton />
            </div>

            <div className="lg:col-span-4">
                <p className="font-mono text-sm leading-relaxed text-white/60">
                    {service.description}
                </p>
            </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.cards.map((card, i) => (
                <div key={i} className="group relative w-full aspect-square rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-[#1a1512]/15 via-[#1a1512]/8 via-[#1a1512]/12 to-[#1a1512]/15">
                        <div className="w-full h-full rounded-2xl bg-white/98 backdrop-blur-sm shadow-sm overflow-hidden">
                            <div className="absolute top-4 left-4 right-8 z-20 max-w-[calc(100%-2rem)]">
                                <div
                                    className="inline-flex max-w-full flex-col items-start gap-0.5 px-3 py-2 rounded-[7px] text-left"
                                    style={{
                                        background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                                        color: '#1a1512',
                                        boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <span className="text-[10px] font-semibold leading-tight tracking-tight text-[#1a1512]">{card.brand}</span>
                                    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                                        <span className="text-sm font-bold tracking-tight text-[#1a1512]">{card.stat}</span>
                                        <span className="text-[10px] font-mono font-normal uppercase tracking-wide text-[#1a1512]/75">{card.label}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`absolute inset-0 ${card.image.endsWith('.svg') ? 'bg-[#1a1512]' : ''}`}
                            >
                                <Image
                                    src={card.image}
                                    alt={`${card.brand} — email marketing`}
                                    fill
                                    className={card.image.endsWith('.svg') ? 'object-contain p-10' : 'object-cover'}
                                    unoptimized
                                    priority={i === 0}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </div>
                </div>
            ))}

            <div className="group/card relative w-full aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-[#ff5501] hover:border-[#ff5501] transition-all duration-500">
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/10 text-white text-[10px] font-mono px-3 py-1.5 rounded-[7px] uppercase tracking-wide">
                        Your Brand Here →
                    </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={48} className="text-white opacity-50 group-hover/card:opacity-0 transition-all duration-300" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white opacity-0 transform translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-in-out z-20">
                    <span className="text-lg md:text-xl font-medium" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                        Start your campaign
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
    onClick
}: {
    service: typeof emailServicesData[0],
    isOpen: boolean,
    onClick: () => void
}) => {
    return (
        <div className={`
            relative w-full overflow-hidden transition-all duration-500 ease-in-out
            rounded-3xl
            ${isOpen ? 'bg-[#1a1512]' : 'bg-[#f3f4f6] hover:bg-[#e8e8e8]'}
        `}
            style={isOpen ? {} : { boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15)' }}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 md:p-8"
            >
                <div className="flex min-w-0 flex-1 items-start md:items-center gap-3 sm:gap-4 md:gap-8">
                    <span className={`shrink-0 font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-[#ff5501] font-bold' : 'text-[#1a1512]/40'}`}>
                        {service.id}
                    </span>
                    <span
                        className={`min-w-0 text-left text-lg leading-tight sm:text-xl md:text-4xl md:leading-none uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white font-medium' : 'text-[#1a1512]/60 group-hover:text-[#1a1512]'}`}
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
};

export function EmailMethodology() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const urls = emailServicesData.flatMap((s) => s.cards.map((c) => c.image));
        prefetchImageUrls(urls);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 600);
        return () => clearTimeout(timeout);
    }, [openIndex]);

    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div>
                            <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                                / METHODOLOGY
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                From subscriber to customer.<AccentBr />
                                <span className="text-[#1a1512]/40">The system behind the send.</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {emailServicesData.map((service, index) => (
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
