'use client';

import React from 'react';
import { SoftwareHero } from '@/components/services/software/SoftwareHero';
import { Capabilities } from '@/components/services/software/Capabilities';
import { ProcessTimeline } from '@/components/services/software/ProcessTimeline';
import { PlatformShowcase } from '@/components/services/software/PlatformShowcase';
import { SoftwarePricing } from '@/components/services/software/SoftwarePricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function SoftwareServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">

            {/* 1. HERO */}
            <SoftwareHero />

            {/* 2. CAPABILITIES */}
            <Capabilities />

            {/* 3. PROCESS TIMELINE */}
            <ProcessTimeline />

            {/* 4. PLATFORM SHOWCASE */}
            <PlatformShowcase />

            {/* 5. PRICING */}
            <SoftwarePricing />

            {/* 6. TESTIMONIALS (Reused) */}
            <TestimonialsSection />

            {/* 7. FAQ (Reused) */}
            <FAQSection />

            {/* 8. CTA (Reused) */}
            <CTASection />

        </main>
    );
}
