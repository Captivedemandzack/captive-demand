'use client';

import React from 'react';
import { WebsiteHero } from '@/components/services/website/WebsiteHero';
import { Methodology } from '@/components/services/website/Methodology';
import { ExampleWork } from '@/components/services/website/ExampleWork';
import { PricingAndAddons } from '@/components/services/website/PricingAndAddons';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function WebsiteServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">

            {/* 1. HERO */}
            <WebsiteHero />

            {/* 2. METHODOLOGY (Accordion) */}
            <Methodology />

            {/* 3. EXAMPLE WORK (Vertical Flip) */}
            <ExampleWork />

            {/* 4. INVESTMENT / ADD-ONS */}
            <PricingAndAddons />

            {/* 5. TESTIMONIALS (Reused) */}
            <TestimonialsSection />

            {/* 6. FAQ (Reused) */}
            <FAQSection />

            {/* 7. CTA (Reused) */}
            <CTASection />

        </main>
    );
}
