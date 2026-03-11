'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Check, ArrowRightLeft, Server, Sparkles, Palette, PenTool, Plug } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CTAButton } from '@/components/ui/CTAButton';
import { AccentBr } from '@/components/ui/accent-br';

// --- HELPER COMPONENTS ---
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
        </svg>
        <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
    </div>
);

// --- PRICING CARD COMPONENT ---
const PricingCard = ({
    title,
    description,
    price,
    priceLabel = "Per month / Cancel anytime",
    features,
    isPro = false,
    buttonText = "Select Plan"
}: {
    title: string;
    description: string;
    price: string;
    priceLabel?: string;
    features: string[];
    isPro?: boolean;
    buttonText?: string;
}) => (
    <div className={`
        relative w-full rounded-3xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 overflow-hidden
        ${isPro
            ? 'text-white'
            : 'bg-[#e8e8e8] border border-[#1a1512]/5 text-[#1a1512]'
        }
    `}
        style={isPro ? {
            background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)',
            boxShadow: '0 2px 4px rgba(255,85,1,0.1), 0 8px 20px rgba(0,0,0,0.15), 0 24px 56px rgba(0,0,0,0.2), inset 0 1px 0 0 rgba(255,255,255,0.1)'
        } : {
            boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4)'
        }}
    >

        {/* Most Popular Badge for Pro */}
        {isPro && (
            <div className="absolute top-0 right-0 bg-[#ff5501] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-bl-xl z-10">
                Most Popular
            </div>
        )}

        {/* Top Section: Logo & Title */}
        <div className="relative z-10">

            {/* LOGO BOX */}
            <div className="w-14 h-14 rounded-xl mb-8 flex items-center justify-center bg-[#f5f5f5] border border-[#1a1512]/5">
                <div className="relative w-8 h-8">
                    <Image
                        src="/C.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
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

            {/* Divider */}
            <div className={`w-full h-[1px] mb-8 ${isPro ? 'bg-gradient-to-r from-white/20 to-transparent' : 'bg-[#1a1512]/10'}`} />

            {/* Features List */}
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

        {/* Footer: Price + Button */}
        <div className="mt-auto relative z-10">
            <div className="flex flex-col mb-8">
                <span className="text-4xl font-bold tracking-tight mb-1">{price}</span>
                <span className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-[#1a1512]/40'}`}>{priceLabel}</span>
            </div>

            <CTAButton variant="pricing" text={buttonText} isDarkBg={isPro} fullWidth as="button" />
        </div>
    </div>
);

// --- ADD-ON CARD COMPONENT ---
const AddOnCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="group p-8 h-full bg-[#FAFAFA] hover:bg-white transition-colors duration-300">
        {/* Updated icon container with rounded square orange background */}
        <div className="mb-6 w-12 h-12 rounded-lg bg-[#ff5501] flex items-center justify-center text-white">
            <Icon size={24} />
        </div>
        <h4 className="text-lg text-[#1a1512] mb-2 font-medium">{title}</h4>
        <p className="text-sm text-[#1a1512]/60 leading-relaxed">
            {description}
        </p>
    </div>
);

interface PricingAndAddonsProps {
    embedded?: boolean;
}

export function PricingAndAddons({ embedded }: PricingAndAddonsProps) {
    const labelRef = useRef<HTMLSpanElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = "PRICING & ADD-ONS";
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
                            labelRef.current.textContent = "/ PRICING & ADD-ONS";
                        }
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addOns = [
        {
            icon: ArrowRightLeft,
            title: "Migration",
            description: "Seamless site migration from your current platform. Zero downtime, preserved SEO, content and redirects handled."
        },
        {
            icon: Server,
            title: "Hosting & Maintenance",
            description: "Managed hosting, security updates, backups, and ongoing maintenance so your site stays fast and secure."
        },
        {
            icon: Sparkles,
            title: "Custom Animations",
            description: "Scroll-triggered reveals, micro-interactions, and motion design that elevates your brand experience."
        },
        {
            icon: Palette,
            title: "Custom Graphics & Imagery",
            description: "Photography, illustration, or custom graphics tailored to your brand and audience."
        },
        {
            icon: PenTool,
            title: "Branding",
            description: "Logo design, visual identity systems, and brand guidelines that extend across your digital presence."
        },
        {
            icon: Plug,
            title: "Integrations",
            description: "CRM, payment processors, booking systems, forms, and third-party tools connected and configured."
        }
    ];

    return (
        <section ref={sectionRef} className={`w-full bg-[#FAFAFA] px-4 ${embedded ? 'pt-0 pb-20 md:pb-32' : 'py-20 md:py-32'}`}>
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className={embedded ? 'mb-8 md:mb-10' : 'mb-16 md:mb-24'}>
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
                    </div>
                    <div className={`flex flex-col md:flex-row md:items-start md:justify-between ${embedded ? 'gap-4' : 'gap-8'}`}>
                        <div>
                            {embedded ? (
                                <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                                    / SERVICE
                                </span>
                            ) : (
                                <span
                                    ref={labelRef}
                                    className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                                >
                                    / PRICING & ADD-ONS
                                </span>
                            )}
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                {embedded ? 'Website' : <>Transparent pricing.<AccentBr /><span className="text-[#1a1512]/40">Scalable solutions.</span></>}
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                {embedded ? 'Design that turns visitors into customers.' : 'Start with a solid foundation and expand as you grow. No hidden fees, just results.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- PRICING CARDS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-24 items-stretch">

                    {/* LEFT: STARTER CARD (5/12) */}
                    <div className="lg:col-span-5 h-full">
                        <PricingCard
                            title="Launch"
                            description="Your brand's digital storefront. Custom design, mobile-ready, built to convert."
                            price="$2,500"
                            priceLabel="One-time / 5-page site"
                            features={[
                                "Custom Design (5 Pages)",
                                "Mobile Responsive",
                                "CMS (WordPress or Webflow)",
                                "Contact Forms & Basic SEO",
                                "Google Analytics Setup",
                                "30 Days Post-Launch Support"
                            ]}
                            buttonText="Get Started"
                        />
                    </div>

                    {/* RIGHT: PRO CARD (7/12) */}
                    <div className="lg:col-span-7 h-full">
                        <PricingCard
                            title="Scale"
                            description="Full digital presence for brands ready to grow. E-commerce, custom features, ongoing optimization."
                            price="$5,000"
                            priceLabel="One-time / 10+ pages"
                            isPro={true}
                            features={[
                                "Everything in Launch",
                                "10+ Custom Pages",
                                "E-commerce or Member Portal",
                                "Advanced Animations & UX",
                                "Technical SEO Implementation",
                                "Conversion Tracking & CRO",
                                "CRM or Form Integrations",
                                "90 Days Priority Support"
                            ]}
                            buttonText="Get Started"
                        />
                    </div>
                </div>

                {/* --- ADD-ONS GRID --- */}
                <div className="w-full">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl text-[#1a1512] mb-4" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                            Power-Up Add-ons
                        </h3>
                        <p className="text-[#1a1512]/60 max-w-xl mx-auto">
                            Add-ons to extend your website project. Pick what you need.
                        </p>
                    </div>

                    {/* Grid container with borders, seamless gap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1512]/10 border border-[#1a1512]/10 rounded-2xl overflow-hidden">
                        {addOns.map((addon, index) => (
                            <AddOnCard
                                key={index}
                                icon={addon.icon}
                                title={addon.title}
                                description={addon.description}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}