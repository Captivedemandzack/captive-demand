'use client';

import React from 'react';
import { SEOHero } from '@/components/services/seo/SEOHero';
import { WhyAEO } from '@/components/services/seo/WhyAEO';
import { SEOMethodology } from '@/components/services/seo/SEOMethodology';
import { ResultsShowcase } from '@/components/services/seo/ResultsShowcase';
import { SEOCaseStudies } from '@/components/services/seo/SEOCaseStudies';
import { SEOPricing } from '@/components/services/seo/SEOPricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export default function SEOServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <SEOHero />
            <WhyAEO />
            <SEOMethodology />
            <ResultsShowcase />
            <SEOCaseStudies />
            <SEOPricing />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
