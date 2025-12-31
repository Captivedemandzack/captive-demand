'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- HELPER COMPONENT ---
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

// --- DATA STRUCTURE ---
const servicesData = [
    {
        id: '01',
        name: 'Strategy',
        subtext: <>We don't guess.<br />We map.</>,
        description: "You wouldn’t build a skyscraper without a blueprint. We don't build websites without one, either. Before we draw a single pixel, we interrogate your business model, spy on your competitors, and map out the exact architecture needed to dominate your niche. We define what \"winning\" looks like mathematically, then we build the plan to hit it.",
        tags: ["Competitor Recon", "SEO Architecture", "Sitemap Logic", "Success Metrics", "User Personas", "Tech Stack Audit"],
        cards: [
            { title: 'Good Manors', image: '/heatmap.png' },
            { title: 'TwoCents', image: '/seostrategy.png' },
            { title: 'EOS Wellness', image: '/sitemapstrategy.png' }
        ]
    },
    {
        id: '02',
        name: 'Creative Direction',
        subtext: <>Look expensive.<br />Charge accordingly.</>,
        description: "Your customers judge you in 0.05 seconds. If you look cheap, they assume you are. We don't just pick colors; we engineer a visual system that signals \"Market Leader\" instantly. This creates the \"Halo Effect\" that allows you to stop competing on features and start competing on value.",
        tags: ["Status Signaling", "Visual Hierarchy", "Trust Psychology", "Asset Direction", "Brand Physics", "Conversion UI"],
        cards: [
            { title: 'Custom Cowgirl', image: '/ccstrategy.png' },
            { title: 'EOS Wellness', image: '/eosart.png' },
            { title: 'WFH Investor', image: '/moodboardwfhfinal.png' }
        ]
    },
    {
        id: '03',
        name: 'Design',
        subtext: <>Form meets function.<br />Pixel perfect execution.</>,
        description: "Great design is invisible. It works so well you don't notice it, you just feel it. We craft user interfaces and brand assets that are beautiful, functional, and built to scale.",
        tags: ["UI/UX Design", "Web Design", "App Design", "Design Systems", "Prototyping"],
        cards: [
            { title: 'Linear Web Design', image: '/Symmetri.png' },
            { title: 'Raycast App', image: '/goodmanors.png' },
            { title: 'Cash App UI', image: '/Firstfuture.png' }
        ]
    },
    {
        id: '04',
        name: 'Development',
        subtext: <>Code that performs.<br />Built for the future.</>,
        description: "We don't just hand off designs. We build them. Using modern frameworks and clean code, we bring digital experiences to life with performance, accessibility, and scalability in mind.",
        tags: ["Front-end Dev", "Next.js", "React", "WebGL", "Creative Coding", "CMS Integration"],
        cards: [
            { title: 'Vercel Platform', image: '/goodmanors.png' },
            { title: 'Stripe Doc Site', image: '/Firstfuture.png' },
            { title: 'Airbnb Listing', image: '/Symmetri.png' }
        ]
    }
];

// --- INTERNAL COMPONENT: The Rich Content View ---
const ServiceContent = ({ service }: { service: typeof servicesData[0] }) => (
    <div className="pb-8 pt-4 px-6 md:px-8">

        {/* Top Grid: Info & Tags */}
        {/* UPDATED GRID LAYOUT:
            - Left Column: 4/12
            - Middle Column: 4/12
            - Right Column: 4/12 (Increased from 3 to give pills room)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">

            {/* Column 1: Subtext & CTA (4/12) */}
            <div className="lg:col-span-4 flex flex-col items-start">
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-sm leading-snug">
                    {service.subtext}
                </p>
                <button className="group flex items-center gap-2 bg-white text-[#1a1512] px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-[#ff5501] hover:text-white transition-colors duration-300">
                    Get Started
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Column 2: Description (4/12) */}
            <div className="lg:col-span-4">
                <p className="font-mono text-sm leading-relaxed text-white/60">
                    {service.description}
                </p>
            </div>

            {/* Column 3: Tags (4/12) - Increased width to prevent stacking */}
            <div className="lg:col-span-4">
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                    {service.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/60 hover:border-white/40 hover:text-white transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Grid: Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.cards.map((card, i) => (
                <div key={i} className="group relative w-full aspect-square bg-[#2a2522] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-[#1a1512]/80 backdrop-blur-sm text-white text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-wide">
                            e.g. {card.title}
                        </span>
                    </div>
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>
            ))}

            {/* Last Card: CTA Box (Fixed Hover Effect) */}
            <div className="group relative w-full aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-[#ff5501] hover:border-[#ff5501] transition-all duration-500">
                {/* Pill Tag - Stays visible */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/10 text-white text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Your Brand Here →
                    </span>
                </div>

                {/* Center Plus Icon - Fades out */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={48} className="text-white opacity-50 group-hover:opacity-0 transition-all duration-300" />
                </div>

                {/* Bottom Text & Arrow - Appears on hover */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                    <span className="text-lg md:text-xl font-medium" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                        Start your new build
                    </span>
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    </div>
);

// --- ACCORDION ITEM COMPONENT ---
const AccordionItem = ({
    service,
    isOpen,
    onClick
}: {
    service: typeof servicesData[0],
    isOpen: boolean,
    onClick: () => void
}) => {
    return (
        <div className={`
            relative w-full overflow-hidden transition-all duration-500 ease-in-out
            rounded-3xl
            ${isOpen ? 'bg-[#1a1512]' : 'bg-[#f3f4f6] hover:bg-[#e8e8e8]'}
        `}>
            {/* THE HEADER / TAB */}
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 md:p-8"
            >
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Number */}
                    <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-[#ff5501] font-bold' : 'text-[#1a1512]/40'}`}>
                        {service.id}
                    </span>

                    {/* Heading */}
                    <span
                        className={`text-2xl md:text-4xl uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white font-medium' : 'text-[#1a1512]/60 group-hover:text-[#1a1512]'}`}
                        style={{ fontFamily: 'Nohemi, sans-serif' }}
                    >
                        {service.name}
                    </span>
                </div>

                {/* Icon Circle */}
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

            {/* THE CONTENT */}
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

// --- MAIN COMPONENT ---
export function Methodology() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Refresh ScrollTrigger when accordion height changes
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
                            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}>
                                From chaos to clarity.<br />
                                <span className="text-[#1a1512]/40">The process behind the product.</span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stack of Accordion Items */}
                <div className="flex flex-col gap-4">
                    {servicesData.map((service, index) => (
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