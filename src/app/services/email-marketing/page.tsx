'use client';

import React from 'react';
import { EmailHero } from '@/components/services/email-marketing/EmailHero';
import { EmailFeatures } from '@/components/services/email-marketing/EmailFeatures';
import { EmailMethodology } from '@/components/services/email-marketing/EmailMethodology';
import { EmailPricing } from '@/components/services/email-marketing/EmailPricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function EmailMarketingServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <EmailHero />
            <EmailFeatures />
            <EmailMethodology />
            <EmailPricing />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
