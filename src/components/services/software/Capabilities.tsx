'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

const techStack = [
    'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
    'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Redis',
];

/* Shared stroke props for wireframes — brand grey base, orange accents, tonal hierarchy */
const strokeGrey = 'rgba(26,21,18,0.38)';
const strokeGreyMid = 'rgba(26,21,18,0.28)';
const strokeGreyLight = 'rgba(26,21,18,0.22)';
const strokeGreySubtle = 'rgba(26,21,18,0.12)';
const strokeOrange = 'rgba(255,85,1,0.55)';
const fillGreySubtle = 'rgba(26,21,18,0.03)';

/* Skeleton UI wireframe illustrations — fine lines, brand grey + orange accents, tonal depth */
const SkeletonDashboard = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        <rect x="2" y="2" width="28" height="68" rx="2" stroke={strokeGrey} fill={fillGreySubtle} />
        <line x1="8" y1="12" x2="24" y2="12" stroke={strokeGrey} />
        <line x1="8" y1="20" x2="20" y2="20" stroke={strokeGreyMid} />
        <line x1="8" y1="28" x2="22" y2="28" stroke={strokeGreyLight} />
        <rect x="34" y="2" width="84" height="12" rx="1" stroke={strokeGrey} fill={fillGreySubtle} />
        <rect x="34" y="18" width="84" height="24" rx="1" stroke={strokeGreyMid} fill={fillGreySubtle} />
        <rect x="34" y="46" width="84" height="24" rx="1" stroke={strokeGreyLight} fill={fillGreySubtle} />
        <line x1="40" y1="52" x2="100" y2="52" stroke={strokeGrey} />
        <line x1="40" y1="58" x2="90" y2="58" stroke={strokeGreyMid} />
        <line x1="40" y1="64" x2="80" y2="64" stroke={strokeGreySubtle} />
        <rect x="38" y="22" width="8" height="16" rx="1" stroke={strokeOrange} fill="rgba(255,85,1,0.1)" />
    </svg>
);

const SkeletonApp = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        <rect x="38" y="2" width="44" height="68" rx="4" stroke={strokeGrey} fill={fillGreySubtle} />
        <rect x="44" y="8" width="32" height="6" rx="1" stroke={strokeGrey} fill={fillGreySubtle} />
        <line x1="48" y1="22" x2="72" y2="22" stroke={strokeGrey} />
        <line x1="48" y1="28" x2="68" y2="28" stroke={strokeGreyMid} />
        <line x1="48" y1="34" x2="70" y2="34" stroke={strokeGreyLight} />
        <rect x="48" y="42" width="24" height="16" rx="2" stroke={strokeGreyMid} fill={fillGreySubtle} />
        <rect x="48" y="62" width="24" height="4" rx="1" stroke={strokeOrange} fill="rgba(255,85,1,0.14)" />
        <rect x="52" y="58" width="16" height="3" rx="1" stroke={strokeGreySubtle} />
    </svg>
);

/* Plugin: extension popup + connect slot — "add-on" feel */
const SkeletonPlugin = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        {/* Browser bar with extension icon */}
        <rect x="2" y="2" width="116" height="10" rx="1" stroke={strokeGrey} fill={fillGreySubtle} />
        <rect x="6" y="5" width="4" height="4" rx="0.5" stroke={strokeOrange} fill="rgba(255,85,1,0.12)" />
        <rect x="14" y="5" width="4" height="4" rx="0.5" stroke={strokeGreyMid} />
        <rect x="22" y="5" width="4" height="4" rx="0.5" stroke={strokeGreySubtle} />
        {/* Extension popup panel (settings list) */}
        <rect x="8" y="18" width="48" height="48" rx="3" stroke={strokeGrey} fill={fillGreySubtle} />
        <line x1="14" y1="26" x2="46" y2="26" stroke={strokeGrey} />
        <line x1="14" y1="32" x2="40" y2="32" stroke={strokeGreyMid} />
        <line x1="14" y1="38" x2="44" y2="38" stroke={strokeGreyLight} />
        <rect x="14" y="46" width="24" height="14" rx="2" stroke={strokeOrange} fill="rgba(255,85,1,0.1)" />
        {/* Host app / "Connect to" slot */}
        <rect x="64" y="24" width="48" height="36" rx="3" stroke={strokeGreyMid} fill={fillGreySubtle} />
        <rect x="70" y="30" width="36" height="12" rx="1" stroke={strokeGrey} fill={fillGreySubtle} />
        <line x1="74" y1="36" x2="98" y2="36" stroke={strokeGreyLight} />
        <rect x="70" y="48" width="24" height="8" rx="1" stroke={strokeOrange} fill="rgba(255,85,1,0.08)" />
    </svg>
);

/* Database: cylinder + table rows — classic DB icon */
const SkeletonDatabase = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        {/* Cylinder top ellipse */}
        <ellipse cx="60" cy="16" rx="36" ry="6" stroke={strokeGrey} />
        {/* Cylinder sides and bottom */}
        <line x1="24" y1="16" x2="24" y2="52" stroke={strokeGrey} />
        <line x1="96" y1="16" x2="96" y2="52" stroke={strokeGrey} />
        <ellipse cx="60" cy="52" rx="36" ry="6" stroke={strokeGrey} />
        {/* Horizontal bands = stacked data layers */}
        <line x1="28" y1="28" x2="92" y2="28" stroke={strokeGreyMid} />
        <line x1="28" y1="36" x2="90" y2="36" stroke={strokeGreyLight} />
        <line x1="28" y1="44" x2="88" y2="44" stroke={strokeGreySubtle} />
        {/* Primary key accent */}
        <rect x="50" y="54" width="20" height="10" rx="1" stroke={strokeOrange} fill="rgba(255,85,1,0.12)" />
    </svg>
);

/* AI Assistant: chat bubbles + input — clear chat UI */
const SkeletonAIAssistant = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        {/* User message (right-aligned bubble) */}
        <rect x="52" y="8" width="56" height="20" rx="10" stroke={strokeGreyMid} fill={fillGreySubtle} />
        <line x1="62" y1="16" x2="98" y2="16" stroke={strokeGrey} />
        <line x1="62" y1="22" x2="90" y2="22" stroke={strokeGreyLight} />
        {/* AI response (left-aligned bubble) */}
        <rect x="12" y="32" width="72" height="24" rx="12" stroke={strokeGrey} fill={fillGreySubtle} />
        <line x1="22" y1="40" x2="74" y2="40" stroke={strokeGrey} />
        <line x1="22" y1="46" x2="68" y2="46" stroke={strokeGreyMid} />
        <line x1="22" y1="52" x2="58" y2="52" stroke={strokeGreySubtle} />
        {/* Input bar */}
        <rect x="12" y="60" width="96" height="10" rx="5" stroke={strokeOrange} fill="rgba(255,85,1,0.08)" />
        <line x1="22" y1="65" x2="50" y2="65" stroke={strokeGrey} />
    </svg>
);

const SkeletonSaaS = () => (
    <svg viewBox="0 0 120 72" className="w-full h-full" fill="none" strokeWidth="0.9" strokeLinecap="round">
        <rect x="2" y="2" width="28" height="68" rx="2" stroke={strokeGrey} fill={fillGreySubtle} />
        <rect x="6" y="8" width="20" height="4" rx="1" stroke={strokeOrange} fill="rgba(255,85,1,0.1)" />
        <line x1="6" y1="18" x2="24" y2="18" stroke={strokeGreyMid} />
        <line x1="6" y1="24" x2="22" y2="24" stroke={strokeGreySubtle} />
        <rect x="34" y="2" width="84" height="10" rx="1" stroke={strokeGrey} fill={fillGreySubtle} />
        <rect x="34" y="16" width="28" height="24" rx="2" stroke={strokeOrange} fill="rgba(255,85,1,0.08)" />
        <rect x="66" y="16" width="28" height="24" rx="2" stroke={strokeGreyMid} fill={fillGreySubtle} />
        <rect x="98" y="16" width="20" height="24" rx="2" stroke={strokeGreyLight} fill={fillGreySubtle} />
        <rect x="34" y="44" width="84" height="26" rx="2" stroke={strokeGreyLight} fill={fillGreySubtle} />
        <line x1="40" y1="52" x2="100" y2="52" stroke={strokeGrey} />
        <line x1="40" y1="58" x2="90" y2="58" stroke={strokeGreyMid} />
        <line x1="40" y1="64" x2="80" y2="64" stroke={strokeGreySubtle} />
    </svg>
);

const capabilities = [
    {
        Illustration: SkeletonDashboard,
        title: 'Dashboards',
        description: 'Real-time dashboards with live data, KPIs, and interactive charts. Built for your workflow, not a template.',
    },
    {
        Illustration: SkeletonApp,
        title: 'Apps',
        description: 'Web and mobile apps that feel native. Cross-platform, responsive, and built for the way people actually work.',
    },
    {
        Illustration: SkeletonPlugin,
        title: 'Plugins',
        description: 'Extensions, integrations, and add-ons that extend your platform. Connect to Figma, Slack, Shopify, or any API.',
    },
    {
        Illustration: SkeletonDatabase,
        title: 'Databases',
        description: 'Scalable data architecture. Schemas, migrations, indexes, and queries optimized for performance and growth.',
    },
    {
        Illustration: SkeletonAIAssistant,
        title: 'AI Assistants',
        description: 'Intelligent features embedded in your product. Chatbots, search, classification, and automation that learns.',
    },
    {
        Illustration: SkeletonSaaS,
        title: 'SaaS',
        description: 'Full-stack platforms with auth, billing, multi-tenancy, and admin. Built to scale from day one.',
    },
];

export function Capabilities() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "CAPABILITIES";
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
                            labelRef.current.textContent = "/ CAPABILITIES";
                        }
                    }
                });
            }

            // Cards visible by default — no opacity animation that could block rendering
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
            <NoiseOverlay />
            <div className="relative z-10 max-w-7xl mx-auto">

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
                                / CAPABILITIES
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Engineering that moves<AccentBr />
                                <span className="text-[#1a1512]/40">the needle forward.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                From data-intensive backends to pixel-perfect frontends. We cover the full stack.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Capability Cards Grid — 3x2 */}
                <div className="cap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {capabilities.map((cap) => (
                        <div
                            key={cap.title}
                            className="cap-card group relative rounded-2xl p-8 transition-all duration-300"
                        >
                            {/* Illustration — subtle grey→white gradient, soft bezel, layered inner/outer shadow */}
                            <div
                                className="mb-8 h-[200px] w-full rounded-xl overflow-hidden flex items-center justify-center p-4 transition-all duration-300 cap-illus-box"
                                style={{
                                    background: 'linear-gradient(180deg, #f2f2f2 0%, #f8f8f8 35%, #fcfcfc 70%, #ffffff 100%)',
                                    border: '1px solid rgba(26,21,18,0.08)',
                                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.9), inset 0 2px 4px -1px rgba(26,21,18,0.04), 0 1px 4px rgba(26,21,18,0.04), 0 6px 28px -6px rgba(26,21,18,0.08)',
                                }}
                            >
                                <div className="w-[250px] h-[100px]">
                                    <cap.Illustration />
                                </div>
                            </div>

                            {/* Text content — underneath illustration */}
                            <div className="space-y-3">
                                <h3
                                    className="text-xl md:text-2xl text-[#1a1512]"
                                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                                >
                                    {cap.title}
                                </h3>
                                <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed">
                                    {cap.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack — below cards, ServiceContent-style pills */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-[10px] font-medium px-3 py-1.5 rounded-[7px] uppercase tracking-wider"
                            style={{
                                background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                                color: '#1a1512',
                                boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    );
}
