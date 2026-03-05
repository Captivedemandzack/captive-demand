'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function SmallAsterisk() {
    return (
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="asteriskLetterGrad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF7A2E" />
                    <stop offset="100%" stopColor="#E8480C" />
                </linearGradient>
            </defs>
            <path
                d="M24 4L26.8 18.2L38 8L30.8 21.2L44 24L30.8 26.8L38 40L26.8 29.8L24 44L21.2 29.8L10 40L17.2 26.8L4 24L17.2 21.2L10 8L21.2 18.2L24 4Z"
                fill="url(#asteriskLetterGrad)"
            />
        </svg>
    );
}

export function FounderLetter() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.letter-card', {
                opacity: 0, y: 40,
                duration: 1, ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
            gsap.from('.letter-ps', {
                opacity: 0, y: 20,
                duration: 0.8, ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.letter-ps',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="mx-auto max-w-3xl">

                <div
                    className="letter-card relative rounded-2xl bg-white border border-[#e8e8e8] overflow-hidden"
                    style={{
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                >
                    {/* Faint watermark asterisk */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                        <svg width="400" height="400" viewBox="0 0 48 48" fill="none">
                            <path
                                d="M24 4L26.8 18.2L38 8L30.8 21.2L44 24L30.8 26.8L38 40L26.8 29.8L24 44L21.2 29.8L10 40L17.2 26.8L4 24L17.2 21.2L10 8L21.2 18.2L24 4Z"
                                fill="#1a1512"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 p-8 sm:p-12 md:px-16 md:py-14">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#e8e8e8]">
                            <div className="flex items-center gap-3">
                                <SmallAsterisk />
                                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1512]/40">
                                    From the Founder
                                </span>
                            </div>
                            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1512]/30">
                                March 2026
                            </span>
                        </div>

                        {/* Letter Body */}
                        <div className="space-y-6">
                            <p
                                className="text-[18px] md:text-[20px] leading-[1.8] text-[#1a1512]/85"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                            >
                                I started Captive Demand because I saw the same story play out too many times: a business with a great product and an online presence that didn&apos;t match. Not because they didn&apos;t try — they just kept getting sold bad solutions by agencies more interested in closing deals than solving problems.
                            </p>
                            <p
                                className="text-[18px] md:text-[20px] leading-[1.8] text-[#1a1512]/85"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                            >
                                We&apos;re different by design. No account managers. No bloated retainers. When you work with us, you work directly with the people building your project. Every pixel, every line of code, every campaign — it all comes from a small team that treats your business like their own.
                            </p>
                            <p
                                className="text-[18px] md:text-[20px] leading-[1.8] text-[#1a1512]/85"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                            >
                                We take a scientific approach to creative work: hypothesis, testing, measurement, iteration. But we never lose the craft. The best marketing doesn&apos;t feel like marketing — it feels like an experience worth having.
                            </p>
                            <p
                                className="text-[18px] md:text-[20px] leading-[1.8] text-[#1a1512]/85"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                            >
                                If that resonates, I&apos;d love to talk.
                            </p>
                        </div>

                        {/* Signature Footer — name left, signature right */}
                        <div className="mt-12 pt-8 border-t border-[#e8e8e8] flex items-end justify-between">
                            <div>
                                <p
                                    className="text-[22px] text-[#1a1512] tracking-tight"
                                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
                                >
                                    Spencer Donaldson
                                </p>
                                <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#1a1512]/40 mt-1">
                                    Founder, Captive Demand
                                </p>
                            </div>
                            <div className="relative w-[220px] h-[90px] shrink-0">
                                <Image
                                    src="/signature.png"
                                    alt="Spencer Donaldson's signature"
                                    fill
                                    className="object-contain object-right"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* P.S. Note */}
                <div className="letter-ps mt-8 text-center">
                    <p className="font-mono text-[12px] text-[#1a1512]/40 tracking-wide">
                        P.S. We&apos;re always looking for great people.{' '}
                        <Link href="mailto:hello@captivedemand.com" className="text-[#E8480C] hover:underline transition-colors">
                            Get in touch →
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
