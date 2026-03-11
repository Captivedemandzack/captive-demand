'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingHero, type PricingService, SERVICE_TABS } from '@/components/pricing/PricingHero';
import { PricingAndAddons } from '@/components/services/website/PricingAndAddons';
import { SEOPricing } from '@/components/services/seo/SEOPricing';
import { SoftwarePricing } from '@/components/services/software/SoftwarePricing';
import { EmailPricing } from '@/components/services/email-marketing/EmailPricing';
import { AutomationPricing } from '@/components/services/automation/AutomationPricing';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { CTASection } from '@/components/sections/CTASection';

const SERVICE_COMPONENTS: Record<PricingService, React.ComponentType<{ embedded?: boolean }>> = {
    website: PricingAndAddons,
    seo: SEOPricing,
    software: SoftwarePricing,
    email: EmailPricing,
    automation: AutomationPricing,
};

export default function PricingPage() {
    const [activeService, setActiveService] = useState<PricingService>('website');
    const ServicePricing = SERVICE_COMPONENTS[activeService];

    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <PricingHero />
            {/* Pricing section — tabs visually connected with cards */}
            <section className="w-full bg-[#FAFAFA] pt-12 md:pt-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Service tabs — function of pricing cards */}
                    <div className="flex flex-wrap items-center gap-2 mb-20 md:mb-24">
                        <div
                            className="flex items-center p-1 rounded-[8px]"
                            style={{
                                background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                                boxShadow: 'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
                            }}
                        >
                            {SERVICE_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveService(tab.id)}
                                    className={`px-5 py-2.5 rounded-[6px] font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                                        activeService === tab.id
                                            ? 'bg-[#1a1512] text-white shadow-sm'
                                            : 'text-[#1a1512]/50 hover:text-[#1a1512]/70'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                    >
                        <ServicePricing embedded />
                    </motion.div>
                </AnimatePresence>
            </section>
            <PricingFAQ />
            <CTASection />
        </main>
    );
}
