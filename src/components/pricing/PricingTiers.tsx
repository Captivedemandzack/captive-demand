'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { CTAButton } from '@/components/ui/CTAButton';

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
                                <CTAButton variant="pricing" text={tier.cta} isDarkBg={false} fullWidth as="button" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }} />
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
