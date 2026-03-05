'use client';

import React from 'react';
import { AutomationHero } from '@/components/services/automation/AutomationHero';
import { AutomationProblem } from '@/components/services/automation/AutomationProblem';
import { AutomationSolutions } from '@/components/services/automation/AutomationSolutions';
import { AutomationMethodology } from '@/components/services/automation/AutomationMethodology';
import { AutomationIntegrations } from '@/components/services/automation/AutomationIntegrations';
import { AutomationStats } from '@/components/services/automation/AutomationStats';
import { AutomationPricing } from '@/components/services/automation/AutomationPricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export default function AutomationServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <AutomationHero />
            <AutomationProblem />
            <AutomationSolutions />
            <AutomationMethodology />
            <AutomationIntegrations />
            <AutomationStats />
            <AutomationPricing />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
