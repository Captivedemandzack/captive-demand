'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        title: 'Inbound Lead Capture',
        description: 'Automatically collect and qualify leads from forms, chatbots, and landing pages.',
    },
    {
        title: 'CRM Data Sync',
        description: 'Sync leads, contacts, and deals to HubSpot, Salesforce, or Pipedrive in real time.',
    },
    {
        title: 'Client Onboarding',
        description: 'Trigger welcome sequences, task assignments, and setup docs when a deal closes.',
    },
    {
        title: 'Proposals & Invoices',
        description: 'Auto-generate proposals from templates and send invoices on schedule.',
    },
    {
        title: 'Reporting Dashboards',
        description: 'Pull data from multiple sources into live dashboards that update automatically.',
    },
    {
        title: 'AI Chatbots & Agents',
        description: 'Deploy AI-powered chat that qualifies leads, answers questions, and books calls 24/7.',
    },
    {
        title: 'Custom Integrations',
        description: 'Connect any tools in your stack with custom API integrations built to your workflow.',
    },
];

const CARD_H = 320;
const TRAY_H = 70;

function Rivet({ className }: { className: string }) {
    return (
        <div
            className={`absolute w-[7px] h-[7px] rounded-full z-30 pointer-events-none ${className}`}
            style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
                boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
            }}
        />
    );
}

function SolutionCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="group relative flex-shrink-0 w-[300px] sm:w-[320px] cursor-pointer" style={{ height: CARD_H }}>
            <div className="absolute inset-0 overflow-hidden rounded-[14px]">
                <div
                    className="absolute left-0 right-0 top-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[70px]"
                    style={{ height: CARD_H + TRAY_H }}
                >
                    <div
                        className="relative bg-white border border-[#e5e5e5] rounded-t-[14px] flex flex-col transition-colors duration-300 ease-out group-hover:bg-[#E8480C] group-hover:border-[#E8480C]"
                        style={{ height: CARD_H, boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)' }}
                    >
                        <Rivet className="top-3 left-3" />
                        <Rivet className="top-3 right-3" />
                        <Rivet className="bottom-3 left-3" />
                        <Rivet className="bottom-3 right-3" />

                        <div className="pt-20 px-8 pb-8 flex flex-col flex-1">
                            <h4
                                className="text-xl font-medium text-[#1a1512] mb-5 transition-colors duration-300 group-hover:text-white"
                                style={{ fontFamily: 'Nohemi, sans-serif' }}
                            >
                                {title}
                            </h4>
                            <p className="font-mono text-xs text-[#1a1512]/50 leading-relaxed flex-1 transition-colors duration-300 group-hover:text-white/70">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div
                        className="relative bg-[#1a1512] rounded-b-[14px] flex items-center justify-center"
                        style={{ height: TRAY_H }}
                    >
                        <Rivet className="bottom-3 left-3" />
                        <Rivet className="bottom-3 right-3" />

                        <span className="inline-flex items-center gap-2.5 text-white font-mono text-[10px] tracking-[0.15em] uppercase font-medium">
                            Get Started
                            <ArrowRight size={13} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AutomationSolutions() {
    const labelRef = useRef<HTMLSpanElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = 'SOLUTIONS';
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                gsap.to(
                    {},
                    {
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: labelRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                        onUpdate: function () {
                            const progress = this.progress();
                            let result = '';
                            for (let i = 0; i < originalText.length; i++) {
                                if (originalText[i] === ' ') {
                                    result += ' ';
                                } else if (progress > i / originalText.length) {
                                    result += originalText[i];
                                } else {
                                    result += chars[Math.floor(Math.random() * chars.length)];
                                }
                            }
                            if (labelRef.current) {
                                labelRef.current.textContent = '/ ' + result;
                            }
                        },
                        onComplete: function () {
                            if (labelRef.current) {
                                labelRef.current.textContent = '/ SOLUTIONS';
                            }
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const doubled = [...solutions, ...solutions];

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 overflow-hidden relative">
            <NoiseOverlay />

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 mb-12 md:mb-16">
                    <div className="text-center">
                        <span
                            ref={labelRef}
                            className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                        >
                            / SOLUTIONS
                        </span>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] tracking-tighter"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                        >
                            What would you like to<br />
                            <span className="text-[#1a1512]/40">automate?</span>
                        </h2>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-5 items-start"
                            animate={{ x: [0, -(solutions.length * 340)] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    duration: 35,
                                    ease: 'linear',
                                },
                            }}
                        >
                            {doubled.map((solution, index) => (
                                <SolutionCard key={index} title={solution.title} description={solution.description} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <span className="font-mono text-sm text-[#1a1512]/30 tracking-wide">+ much more</span>
                </div>
            </div>
        </section>
    );
}
