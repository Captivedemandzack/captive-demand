'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { CTAButton } from '@/components/ui/CTAButton';

// --- HELPER COMPONENT ---
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

// --- DATA STRUCTURES ---
interface Metric {
    value: string;
    label: string;
}

interface Project {
    id: string;
    title: string;
    headline?: string;
    description: string;
    image: string;
    number: string;
    industry?: string;
    services?: string[];
    metrics?: Metric[];
}

// Sample data - Updated with 2 SINGLE NUMBER metrics per project
const projects: Project[] = [
    {
        id: '01',
        title: 'Custom Cowgirl',
        headline: 'Modernizing Western Heritage for a Digital Audience.',
        description: 'A bespoke digital experience blending western heritage with modern e-commerce functionality to drive sales and brand loyalty.',
        image: '/customcowgirl.png',
        number: '001',
        industry: 'FASHION',
        services: ['STRATEGY', 'UX/UI DESIGN', 'SHOPIFY DEV'],
        metrics: [
            { value: '+45%', label: 'YoY MOBILE SALES' },
            { value: '5k+', label: 'PRE-LAUNCH SIGNUPS' },
        ]
    },
    {
        id: '02',
        title: 'First Future',
        headline: 'Forward-thinking financial services that combine trust with innovation.',
        description: 'Forward-thinking financial services website that combines trust with modern innovation.',
        image: '/Firstfuture.png',
        number: '002',
        industry: 'FINANCE',
        services: ['WEB DESIGN', 'BRANDING'],
        metrics: [
            { value: '3x', label: 'LEAD GEN' },
            { value: '90%', label: 'ENGAGEMENT' },
        ]
    },
    {
        id: '03',
        title: 'Symmetri',
        headline: 'Geometric precision meets digital fluidity.',
        description: 'A portfolio site for a design studio that practices what it preaches.',
        image: '/Symmetri.png',
        number: '003',
        industry: 'DESIGN',
        services: ['PORTFOLIO', 'INTERACTION'],
        metrics: [
            { value: 'No.1', label: 'SITE OF THE DAY' },
            { value: '4.9', label: 'CLIENT RATING' },
        ]
    },
    {
        id: '04',
        title: 'Tachyon',
        headline: 'High-performance analytics for next-gen teams.',
        description: 'High-performance analytics dashboard for next-gen data teams. Speed meets clarity.',
        image: '/goodmanors.png',
        number: '004',
        industry: 'SAAS',
        metrics: [
            { value: '10x', label: 'FASTER QUERIES' },
            { value: '20k', label: 'DAILY USERS' },
        ]
    },
    {
        id: '05',
        title: 'Vanguard',
        headline: 'Legal tech reimagined. A bold identity.',
        description: 'Legal tech reimagined. A bold, authoritative identity for a firm changing the landscape.',
        image: '/Firstfuture.png',
        number: '005',
        industry: 'LEGAL TECH',
        metrics: [
            { value: '150%', label: 'GROWTH' },
            { value: '#1', label: 'MARKET RANK' },
        ]
    }
];

export function ExampleWork() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];

    // Common Card Content Component
    const CardContent = ({ project }: { project: Project }) => {
        // Use headline if available, fallback to title
        const displayHeadline = project.headline || project.title;

        return (
            <>
                {/* Image Section (2/3 Width) */}
                <div className="relative w-full lg:w-2/3 aspect-[4/3] lg:aspect-none h-full rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Section (1/3 Width) */}
                {/* REMOVED lg:pl-6 to bring content closer to image */}
                <div className="w-full lg:w-1/3 flex flex-col h-full justify-between pt-6 lg:pt-2">

                    {/* Header: Number & Industry Pill */}
                    <div className="flex justify-between items-start mb-6">
                        <span className="font-mono font-bold text-[#ff5501] text-sm">
                            {project.number}
                        </span>
                        {project.industry && (
                            <span className="bg-[#1a1512]/5 text-[#1a1512]/60 text-[10px] font-mono uppercase px-3 py-1 rounded-[6px] tracking-wider">
                                {project.industry}
                            </span>
                        )}
                    </div>

                    {/* Main Body: Title, Description, Services */}
                    <div>
                        {/* Title/Headline - Smaller size */}
                        <h4
                            className="font-medium font-sans text-[#1a1512] mb-4 leading-[1.2] text-xl lg:text-2xl tracking-tight"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            {displayHeadline}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-[#1a1512]/70 font-mono leading-relaxed line-clamp-4 mb-6">
                            {project.description}
                        </p>

                        {/* Services Pills */}
                        {project.services && (
                            <div className="flex flex-wrap gap-2">
                                {project.services.map((service, i) => (
                                    <span key={i} className="border border-[#1a1512]/10 text-[#1a1512]/70 text-[10px] font-mono uppercase px-3 py-1.5 rounded-[4px] tracking-wider shadow-[inset_0px_4px_7px_0px_rgba(255,255,255,0.07),0px_4px_12px_0px_rgba(0,0,0,0.07)]">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: Metrics - Aligned to bottom */}
                    <div className="pt-8 mt-auto">
                        {project.metrics && project.metrics.length > 0 ? (
                            <div className="flex gap-6 lg:gap-8">
                                {project.metrics.map((metric, i) => (
                                    <div key={i}>
                                        <div className="text-[#ff5501] font-sans text-lg lg:text-xl font-bold leading-none mb-1" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                            {metric.value}
                                        </div>
                                        <div className="text-[#1a1512]/50 font-mono text-[10px] uppercase tracking-wider leading-tight">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </>
        );
    };

    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 overflow-hidden relative">
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col h-full">

                {/* Header */}
                <div className="mb-12 md:mb-20 max-w-7xl mx-auto w-full">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div>
                            <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                                / SELECTED WORK
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}>
                                We build ideas that shift<br />
                                perspectives and create <br />
                                <span className="text-[#1a1512]/40">lasting impact.</span>
                            </h2>
                        </div>
                        <div className="shrink-0">
                            <CTAButton variant="grey" text="More case studies" href="/case-studies" ariaLabel="View All Work" />
                        </div>
                    </div>
                </div>

                {/* --- DESKTOP LAYOUT --- */}
                <div className="hidden lg:flex items-start gap-12 lg:gap-6">
                    {/* Left: Tabs Sticky Sidebar */}
                    <div className="w-1/4 flex flex-col gap-8 sticky top-32">
                        {projects.map((project, index) => (
                            <button
                                key={project.id}
                                onClick={() => setActiveIndex(index)}
                                className="group flex items-baseline gap-4 text-left transition-all duration-300"
                            >
                                <span className={`text-xs font-mono transition-colors duration-300 ${activeIndex === index ? 'text-[#ff5501]' : 'text-[#1a1512]/40 group-hover:text-[#1a1512]'
                                    }`}>
                                    {project.number}
                                </span>
                                <h3 className={`text-3xl xl:text-4xl whitespace-nowrap transition-all duration-300 ${activeIndex === index ? 'text-[#1a1512] translate-x-2' : 'text-[#1a1512]/40 group-hover:text-[#1a1512] group-hover:translate-x-1'
                                    }`} style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
                                    {project.title}
                                </h3>
                            </button>
                        ))}
                    </div>

                    {/* Right: The Card Container */}
                    <div className="w-3/4 relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="relative w-full h-full perspective-1000"
                            >
                                <div className={cn(
                                    "w-full h-full",
                                    "rounded-2xl bg-[#f3f4f6] border border-[#1a1512]/5",
                                    "p-[10px]",
                                    "flex gap-4 shadow-sm transition-all duration-300 hover:shadow-md" // CHANGED: gap-6 to gap-4
                                )}>
                                    <CardContent project={activeProject} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- MOBILE/TABLET LAYOUT --- */}
                <div className="flex lg:hidden flex-col gap-12">
                    {projects.map((project, index) => (
                        <div key={project.id} className="flex flex-col">
                            <div className="flex items-baseline gap-3 mb-4 px-2">
                                <span className="text-xs font-mono text-[#ff5501]">
                                    {project.number}
                                </span>
                                <h3 className="text-3xl font-medium text-[#1a1512]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                    {project.title}
                                </h3>
                            </div>
                            <div className={cn(
                                "w-full flex flex-col gap-5",
                                "rounded-2xl bg-[#f3f4f6] border border-[#1a1512]/5",
                                "p-5",
                                "shadow-sm"
                            )}>
                                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 shrink-0">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        {project.industry && (
                                            <span className="bg-[#1a1512]/5 text-[#1a1512]/60 text-[10px] font-mono uppercase px-3 py-1 rounded-[6px] tracking-wider">
                                                {project.industry}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-medium font-sans text-[#1a1512] leading-[1.2]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                        {project.headline || project.title}
                                    </h4>
                                    <p className="text-sm text-[#1a1512]/70 font-mono leading-relaxed">
                                        {project.description}
                                    </p>
                                    {project.services && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.services.map((service, i) => (
                                                <span key={i} className="border border-[#1a1512]/10 text-[#1a1512]/70 text-[10px] font-mono uppercase px-3 py-1.5 rounded-[4px] tracking-wider shadow-[inset_0px_4px_7px_0px_rgba(255,255,255,0.07),0px_4px_12px_0px_rgba(0,0,0,0.07)]">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {project.metrics && (
                                        <div className="flex flex-wrap gap-6 pt-4 border-t border-[#1a1512]/10">
                                            {project.metrics.map((metric, i) => (
                                                <div key={i}>
                                                    <div className="text-[#ff5501] font-sans text-lg font-bold leading-none mb-1" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-[#1a1512]/50 font-mono text-[10px] uppercase tracking-wider leading-tight">
                                                        {metric.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}