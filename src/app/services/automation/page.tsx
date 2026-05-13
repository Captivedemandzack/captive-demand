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
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
    title: 'Workflow Automation Services for Growth Teams',
    description:
        'Captive Demand designs workflow automation, CRM systems, and operational processes that remove manual work and help teams scale.',
    path: '/services/automation',
});

export default function AutomationServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <ServiceSchema
                name="Workflow Automation"
                description={metadata.description as string}
                slug="automation"
            />
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
