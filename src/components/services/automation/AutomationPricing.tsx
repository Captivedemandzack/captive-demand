'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

import { CTAButton } from '@/components/ui/CTAButton';

const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

const PricingCard = ({
    title,
    description,
    price,
    priceLabel,
    features,
    isPro = false,
    buttonText = "Get Started",
}: {
    title: string;
    description: string;
    price: string;
    priceLabel: string;
    features: string[];
    isPro?: boolean;
    buttonText?: string;
}) => (
    <div
        className={`
            relative w-full rounded-3xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 overflow-hidden
            ${isPro
                ? 'text-white'
                : 'bg-[#e8e8e8] border border-[#1a1512]/5 text-[#1a1512]'
            }
        `}
        style={isPro ? {
            background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)',
            boxShadow: '0 2px 4px rgba(255,85,1,0.1), 0 8px 20px rgba(0,0,0,0.15), 0 24px 56px rgba(0,0,0,0.2), inset 0 1px 0 0 rgba(255,255,255,0.1)',
        } : {
            boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)',
        }}
    >
        {isPro && (
            <div className="absolute top-0 right-0 bg-[#ff5501] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-bl-xl z-10">
                Most Popular
            </div>
        )}

        <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl mb-8 flex items-center justify-center bg-[#f5f5f5] border border-[#1a1512]/5">
                <div className="relative w-8 h-8">
                    <Image src="/C.png" alt="Logo" fill className="object-contain" />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-medium mb-3" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                    {title}
                </h3>
                <p className={`text-base font-mono ${isPro ? 'text-white/60' : 'text-[#1a1512]/60'}`}>
                    {description}
                </p>
            </div>

            <div className={`w-full h-[1px] mb-8 ${isPro ? 'bg-gradient-to-r from-white/20 to-transparent' : 'bg-[#1a1512]/10'}`} />

            <div className={`mb-12 flex-1 ${isPro ? 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4' : 'space-y-4'}`}>
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 rounded-full p-0.5 ${isPro ? 'bg-[#ff5501]/20 text-[#ff5501]' : 'bg-[#1a1512]/10 text-[#1a1512]'}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className={`text-sm leading-tight ${isPro ? 'text-white/80' : 'text-[#1a1512]/80'}`}>
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-auto relative z-10">
            <div className="flex flex-col mb-8">
                <span className="text-4xl font-bold tracking-tight mb-1">{price}</span>
                <span className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-[#1a1512]/40'}`}>{priceLabel}</span>
            </div>
            <CTAButton variant="pricing" text={buttonText} isDarkBg={isPro} fullWidth as="button" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }} />
        </div>
    </div>
);

export function AutomationPricing() {
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
                            labelRef.current.textContent = "/ PRICING";
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
                                / PRICING
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] tracking-tighter"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Simple pricing.<br />
                                <span className="text-[#1a1512]/40">Powerful results.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                One-time builds or ongoing partnerships. No hidden fees, just working automations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    <div className="lg:col-span-5 h-full">
                        <PricingCard
                            title="Automation Build"
                            description="We design and build your custom automation workflows, connect your tools, and hand off a fully working system."
                            price="$2,500"
                            priceLabel="One-time"
                            features={[
                                "Custom workflow design",
                                "Up to 5 automations",
                                "Tool integrations included",
                                "Documentation & training",
                                "30 days post-launch support",
                            ]}
                            buttonText="Get Started"
                        />
                    </div>
                    <div className="lg:col-span-7 h-full">
                        <PricingCard
                            title="Automation Partner"
                            description="Ongoing automation management. We build, maintain, and continuously add new workflows as your business grows."
                            price="$1,500/mo"
                            priceLabel="Per month / Cancel anytime"
                            isPro={true}
                            features={[
                                "Everything in Automation Build",
                                "Unlimited new automations",
                                "Monthly optimization",
                                "Priority support",
                                "Dedicated automation strategist",
                                "Performance monitoring",
                                "Workflow health checks",
                                "Tool migration support",
                                "Custom reporting dashboards",
                                "Quarterly strategy sessions",
                            ]}
                            buttonText="Get Started"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
