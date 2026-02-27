'use client';

import React, { useState } from 'react';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingTiers } from '@/components/pricing/PricingTiers';
import { LogoCloud } from '@/components/pricing/LogoCloud';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { CTASection } from '@/components/sections/CTASection';

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <PricingHero billingCycle={billingCycle} onToggle={setBillingCycle} />
            <PricingTiers billingCycle={billingCycle} />
            <LogoCloud />
            <PricingFAQ />
            <CTASection />
        </main>
    );
}
