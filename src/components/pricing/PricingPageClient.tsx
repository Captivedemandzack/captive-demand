'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PricingHero, type PricingService, SERVICE_TABS } from '@/components/pricing/PricingHero';
import { PricingAndAddons } from '@/components/services/website/PricingAndAddons';
import { SEOPricing } from '@/components/services/seo/SEOPricing';
import { SoftwarePricing } from '@/components/services/software/SoftwarePricing';
import { EmailPricing } from '@/components/services/email-marketing/EmailPricing';
import { AutomationPricing } from '@/components/services/automation/AutomationPricing';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { CTASection } from '@/components/sections/CTASection';

type ServicePricingProps = { embedded?: boolean; enablePricingModal?: boolean };

const SERVICE_COMPONENTS: Record<PricingService, React.ComponentType<ServicePricingProps>> = {
  website: PricingAndAddons,
  seo: SEOPricing,
  software: SoftwarePricing,
  email: EmailPricing,
  automation: AutomationPricing,
};

export function PricingPageClient() {
  const [activeService, setActiveService] = useState<PricingService>('website');
  const ServicePricing = SERVICE_COMPONENTS[activeService];

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA]">
      <PricingHero />
      <section className="w-full bg-[#FAFAFA] px-4 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-wrap items-center gap-2 md:mb-24">
            <div
              className="flex items-center rounded-[8px] p-1"
              style={{
                background: 'linear-gradient(to bottom, #f7f6f5, #EBE9E5)',
                boxShadow:
                  'inset 0 1px 0 0 #FFFFFF, 0 0 0 1px #D1CDC7, 0 2px 4px rgba(0,0,0,0.06)',
              }}
            >
              {SERVICE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveService(tab.id)}
                  className={`rounded-[6px] px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
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
            <ServicePricing embedded enablePricingModal={activeService === 'website'} />
          </motion.div>
        </AnimatePresence>
      </section>
      <PricingFAQ />
      <CTASection />
    </main>
  );
}
