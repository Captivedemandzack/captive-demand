'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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

const TierCTAButton = ({ text }: { text: string }) => (
    <button className="group relative inline-flex items-center text-left cursor-pointer focus:outline-none w-full" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}>
        <span className="
            relative flex items-center h-12 pl-5 pr-2 mr-4 flex-grow
            rounded-l-xl
            font-mono text-sm uppercase tracking-normal
            transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            bg-[#1a1512] text-white group-hover:bg-[#ff5501]
        ">
            <span className="z-10 relative font-bold tracking-wider">{text}</span>
            <div className="
                absolute top-0 right-[-16px] bottom-0 w-[18px] h-12
                transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                text-[#1a1512] group-hover:text-[#ff5501]
            ">
                <CornerShape className="w-full h-full" />
            </div>
        </span>
        <i className="relative block w-[51px] h-12 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <div className="absolute inset-0 z-0 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] text-[#1a1512] group-hover:text-[#ff5501]">
                <IconBlobShape className="w-full h-full" />
            </div>
            <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] translate-x-0 group-hover:translate-x-[150%]">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-x-[150%] group-hover:translate-x-0">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>
            </span>
        </i>
    </button>
);

interface TierData {
    name: string;
    price: { monthly: number; annual: number };
    unit: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    cta: string;
}

const tiers: TierData[] = [
    {
        name: "Basic plan",
        price: { monthly: 10, annual: 8 },
        unit: "per user\nper month",
        description: "Basic features for up to 10 users.",
        features: [
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20GB individual data each user",
        ],
        cta: "Get started",
    },
    {
        name: "Business plan",
        price: { monthly: 20, annual: 16 },
        unit: "per user\nper month",
        description: "Basic features for up to 20 users.",
        isPopular: true,
        features: [
            "200+ integrations",
            "Advanced reporting and analytics",
            "Up to 20 individual users",
            "40GB individual data each user",
        ],
        cta: "Get started",
    },
    {
        name: "Enterprise plan",
        price: { monthly: 40, annual: 32 },
        unit: "per user\nper month",
        description: "Advanced features + unlimited users.",
        features: [
            "Advanced custom fields",
            "Audit log and data history",
            "Unlimited individual users",
            "Unlimited individual data",
        ],
        cta: "Get started",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    }),
};

interface PricingTiersProps {
    billingCycle: 'monthly' | 'annual';
}

export function PricingTiers({ billingCycle }: PricingTiersProps) {
    return (
        <section className="w-full bg-[#FAFAFA] pb-20 md:pb-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{
                                y: -4,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                },
                            }}
                            className={`
                                relative rounded-3xl p-8 lg:p-10 flex flex-col h-full
                                border border-[#1a1512]/5
                                bg-white/50 backdrop-blur-sm
                                shadow-[0_1px_2px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05),0_20px_48px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.4)]
                                hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.07),0_28px_56px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.5)]
                                transition-shadow duration-300
                            `}
                        >
                            {tier.isPopular && (
                                <div className="absolute top-0 right-0 bg-[#ff5501] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-bl-xl rounded-tr-3xl z-10">
                                    Popular
                                </div>
                            )}

                            {/* Tier Name */}
                            <div className="mb-6">
                                <h3
                                    className="text-xl text-[#1a1512] mb-1"
                                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                                >
                                    {tier.name}
                                </h3>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-4">
                                <motion.span
                                    key={billingCycle}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-5xl lg:text-6xl font-bold text-[#1a1512] tracking-tight"
                                >
                                    ${tier.price[billingCycle]}
                                </motion.span>
                                <span className="font-mono text-xs text-[#1a1512]/40 uppercase tracking-wider whitespace-pre-line leading-tight">
                                    {tier.unit}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="font-mono text-sm text-[#1a1512]/60 mb-8">
                                {tier.description}
                            </p>

                            {/* CTA Button */}
                            <div className="mb-8">
                                <TierCTAButton text={tier.cta} />
                            </div>

                            {/* Divider */}
                            <div className="w-full h-[1px] bg-[#1a1512]/10 mb-8" />

                            {/* Features */}
                            <div>
                                <span className="font-mono text-[10px] text-[#1a1512]/40 uppercase tracking-[0.2em] block mb-4">
                                    Features
                                </span>
                                <p className="font-mono text-xs text-[#1a1512]/50 mb-4">
                                    Everything in our {i === 0 ? 'free' : i === 1 ? 'Basic' : 'Business'} plan plus...
                                </p>
                                <div className="space-y-3">
                                    {tier.features.map((feature, j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <div className="mt-0.5 rounded-full p-0.5 bg-[#ff5501]/15 text-[#ff5501]">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-[#1a1512]/80 leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
