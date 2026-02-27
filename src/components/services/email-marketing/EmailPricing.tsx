'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Check, BarChart3, Target, Sparkles, Zap, LineChart, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CornerShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 48" className={className} style={{ display: 'block' }}>
        <path d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" fill="currentColor" />
    </svg>
);

const IconBlobShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48" className={className} style={{ display: 'block' }}>
        <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
    </svg>
);

const ArrowIcon = ({ color = "currentColor", className = "" }: { color?: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10" fill="none" className={className}>
        <path fill={color} d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
    </svg>
);

const PricingCTAButton = ({ text, isDarkBg = false }: { text: string, isDarkBg?: boolean }) => (
    <button className="group relative inline-flex items-center text-left cursor-pointer focus:outline-none w-full" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}>
        <span className={`
            relative flex items-center h-12 pl-5 pr-2 mr-4 flex-grow
            rounded-l-xl
            font-mono text-sm uppercase tracking-normal
            transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isDarkBg
                ? 'bg-white text-[#1a1512] group-hover:bg-[#ff5501] group-hover:text-white'
                : 'bg-[#1a1512] text-white group-hover:bg-[#ff5501]'
            }
        `}>
            <span className="z-10 relative font-bold tracking-wider">{text}</span>
            <div className={`
                absolute top-0 right-[-16px] bottom-0 w-[18px] h-12
                transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isDarkBg
                    ? 'text-white group-hover:text-[#ff5501]'
                    : 'text-[#1a1512] group-hover:text-[#ff5501]'
                }
            `}>
                <CornerShape className="w-full h-full" />
            </div>
        </span>
        <i className="
            relative block w-[51px] h-12
            transform-gpu
            transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        ">
            <div className={`
                absolute inset-0 z-0
                transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isDarkBg
                    ? 'text-white group-hover:text-[#ff5501]'
                    : 'text-[#1a1512] group-hover:text-[#ff5501]'
                }
            `}>
                <IconBlobShape className="w-full h-full" />
            </div>
            <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="
                    absolute flex items-center justify-center w-full h-full
                    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                    translate-x-0 group-hover:translate-x-[150%]
                ">
                    <ArrowIcon color={isDarkBg ? "#1a1512" : "#FFFFFF"} className="w-5 h-5" />
                </span>
                <span className="
                    absolute flex items-center justify-center w-full h-full
                    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                    -translate-x-[150%] group-hover:translate-x-0
                ">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>
            </span>
        </i>
    </button>
);

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
    features,
    isPro = false,
    buttonText = "Select Plan"
}: {
    title: string;
    description: string;
    price: string;
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
                <span className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-[#1a1512]/40'}`}>Per month / Cancel anytime</span>
            </div>
            <PricingCTAButton text={buttonText} isDarkBg={isPro} />
        </div>
    </div>
);

const AddOnCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div
        className="group p-8 h-full bg-[#FAFAFA] hover:bg-white transition-colors duration-300"
        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15)' }}
    >
        <div
            className="mb-6 w-12 h-12 rounded-lg bg-[#ff5501] flex items-center justify-center text-white"
            style={{ boxShadow: '0 2px 0 0 rgba(204,51,0,0.8), 0 4px 12px rgba(255,85,1,0.3)' }}
        >
            <Icon size={24} strokeWidth={1.5} />
        </div>
        <h4 className="text-lg text-[#1a1512] mb-2 font-medium">{title}</h4>
        <p className="text-sm text-[#1a1512]/60 leading-relaxed">
            {description}
        </p>
    </div>
);

export function EmailPricing() {
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
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Deep-dive dashboards with cohort analysis, heatmaps, and revenue attribution per flow."
        },
        {
            icon: Target,
            title: "SMS Integration",
            description: "Omnichannel campaigns that pair email with SMS for maximum touchpoint coverage."
        },
        {
            icon: Sparkles,
            title: "AI Subject Lines",
            description: "Machine-learning powered subject line generation optimized for your specific audience."
        },
        {
            icon: Zap,
            title: "CRM Sync",
            description: "Bi-directional sync with HubSpot, Salesforce, or your existing CRM for unified data."
        },
        {
            icon: LineChart,
            title: "Predictive Sending",
            description: "AI-optimized send times based on individual subscriber engagement patterns."
        },
        {
            icon: PenTool,
            title: "Custom Templates",
            description: "Bespoke, on-brand email templates designed for your specific industry and audience."
        }
    ];

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">

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
                                / PRICING & ADD-ONS
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Transparent pricing.<br />
                                <span className="text-[#1a1512]/40">Compounding returns.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                Start with a proven foundation and scale as your list grows. No hidden fees, just measurable ROI.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-24 items-stretch">
                    <div className="lg:col-span-5 h-full">
                        <PricingCard
                            title="Email Starter"
                            description="Essential email infrastructure for growing brands."
                            price="$1,500"
                            features={[
                                "3 Automated Flows",
                                "Up to 10k Subscribers",
                                "Basic Template Library",
                                "Monthly Campaign Sends",
                                "Performance Reporting",
                                "1 Month Onboarding"
                            ]}
                            buttonText="Select Starter"
                        />
                    </div>

                    <div className="lg:col-span-7 h-full">
                        <PricingCard
                            title="Email Pro"
                            description="Full-service email engine for brands ready to scale revenue."
                            price="$3,500"
                            isPro={true}
                            features={[
                                "Unlimited Automated Flows",
                                "50k+ Subscribers",
                                "Custom Template Design",
                                "A/B Testing Suite",
                                "Revenue Attribution Dashboard",
                                "Advanced Segmentation",
                                "Deliverability Monitoring",
                                "Dedicated Email Strategist",
                                "Weekly Performance Calls",
                                "3 Months Priority Support"
                            ]}
                            buttonText="Select Pro"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl text-[#1a1512] mb-4" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                            Power-Up Add-ons
                        </h3>
                        <p className="text-[#1a1512]/60 max-w-xl mx-auto">
                            Extend your email ecosystem with specialized capabilities tailored to your growth stage.
                        </p>
                    </div>

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
