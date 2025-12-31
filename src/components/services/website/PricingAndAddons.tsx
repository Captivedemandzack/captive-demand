'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Check, Search, Mail, Code, Zap, Smartphone, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- SHAPES FOR THE BUTTON ---
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

// --- PRIMARY CTA BUTTON COMPONENT ---
const PricingCTAButton = ({ text, isDarkBg = false }: { text: string, isDarkBg?: boolean }) => (
    <button className="group relative inline-flex items-center text-left cursor-pointer focus:outline-none w-full">
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
        relative w-full rounded-3xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 hover:shadow-2xl overflow-hidden
        ${isPro
            ? 'text-white' // Pro: No border, gradient bg set in style
            : 'bg-[#e8e8e8] border border-[#1a1512]/5 text-[#1a1512]' // Starter: Grey BG + Light Border
        }
    `}
        style={isPro ? {
            background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)'
        } : {}}
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
                <span className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-[#1a1512]/40'}`}>Per month / Cancel anytime</span>
            </div>

            <PricingCTAButton text={buttonText} isDarkBg={isPro} />
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

export function PricingAndAddons() {
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
            icon: Search,
            title: "SEO / AEO",
            description: "Optimize for search engines and AI answers to dominate organic traffic."
        },
        {
            icon: Mail,
            title: "Email Marketing",
            description: "Automated flows and campaigns that convert leads into loyal customers."
        },
        {
            icon: Code,
            title: "Software Development",
            description: "Custom solutions, API integrations, and complex web applications."
        },
        {
            icon: Zap,
            title: "Automation",
            description: "Streamline operations with Zapier, Make, and custom workflow scripts."
        },
        {
            icon: Smartphone,
            title: "Mobile Apps",
            description: "Native iOS and Android applications built for performance and scale."
        },
        {
            icon: PenTool,
            title: "Branding",
            description: "Logo design, visual identity systems, and brand guidelines."
        }
    ];

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
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
                                <span className="text-[#1a1512]/40">Scalable solutions.</span>
                            </h2>
                        </div>
                        <div className="md:max-w-md md:text-right">
                            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                                Start with a solid foundation and expand as you grow. No hidden fees, just results.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- PRICING CARDS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-24 items-stretch">

                    {/* LEFT: STARTER CARD (5/12) */}
                    <div className="lg:col-span-5 h-full">
                        <PricingCard
                            title="Website Starter"
                            description="Essential digital presence for growing businesses."
                            price="$2,500"
                            features={[
                                "Custom Design (5 Pages)",
                                "Mobile Responsive",
                                "Basic SEO Setup",
                                "CMS Integration",
                                "Contact Form & Map",
                                "1 Month Support"
                            ]}
                            buttonText="Select Starter"
                        />
                    </div>

                    {/* RIGHT: PRO CARD (7/12) */}
                    <div className="lg:col-span-7 h-full">
                        <PricingCard
                            title="Website Pro"
                            description="All-inclusive solution for established brands ready to scale."
                            price="$5,000"
                            isPro={true}
                            features={[
                                "Premium Design (10+ Pages)",
                                "Advanced Animations & Interactions",
                                "Comprehensive SEO Strategy",
                                "E-commerce Functionality",
                                "CRM Integration",
                                "Performance Optimization",
                                "Custom Dashboard",
                                "Advanced Analytics",
                                "A/B Testing Setup",
                                "3 Months Priority Support"
                            ]}
                            buttonText="Select Pro"
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
                            Enhance your digital ecosystem with specialized services tailored to your needs.
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