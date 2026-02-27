'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Globe, Server, Smartphone, Cloud, Brain, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const capabilities = [
    {
        icon: Globe,
        title: 'Web Applications',
        description: 'Full-stack platforms built with modern frameworks. Server-rendered, edge-optimized, and infinitely scalable.',
        span: 'lg:col-span-4',
    },
    {
        icon: Server,
        title: 'API Development',
        description: 'RESTful and GraphQL APIs designed for performance, security, and seamless third-party integration.',
        span: 'lg:col-span-4',
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Cross-platform native experiences for iOS and Android. One codebase, zero compromises.',
        span: 'lg:col-span-4',
    },
    {
        icon: Cloud,
        title: 'Cloud Infrastructure',
        description: 'AWS, GCP, and Azure architectures with CI/CD pipelines, auto-scaling, and 99.9% uptime SLAs.',
        span: 'lg:col-span-6',
    },
    {
        icon: Brain,
        title: 'AI / ML Integration',
        description: 'Intelligent features powered by OpenAI, custom models, and RAG pipelines embedded directly into your product.',
        span: 'lg:col-span-6',
    },
    {
        icon: RefreshCw,
        title: 'Legacy Modernization',
        description: 'Migrate aging systems to modern stacks without downtime. Incremental rewrites, not risky big-bangs.',
        span: 'lg:col-span-12',
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

            gsap.from('.cap-card', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: '.cap-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">

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
                                Engineering that moves<br />
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

                {/* Tech Stack Trust Bar */}
                <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-4 py-2 rounded-full border border-[#1a1512]/10 text-xs font-mono text-[#1a1512]/60 tracking-wider uppercase hover:border-[#1a1512]/30 hover:text-[#1a1512] transition-colors duration-300 cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Capability Cards Grid */}
                <div className="cap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                    {capabilities.map((cap) => (
                        <div
                            key={cap.title}
                            className={`cap-card group relative ${cap.span} rounded-2xl p-8 bg-white/50 backdrop-blur-sm border border-[#1a1512]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1a1512]/5`}
                            style={{
                                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 4px 24px -4px rgba(26,21,18,0.04), 0 1px 2px rgba(26,21,18,0.06)',
                            }}
                        >
                            <div className="mb-6 w-12 h-12 rounded-lg bg-[#ff5501] flex items-center justify-center text-white">
                                <cap.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3
                                className="text-xl md:text-2xl text-[#1a1512] mb-3"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                            >
                                {cap.title}
                            </h3>
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed">
                                {cap.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
