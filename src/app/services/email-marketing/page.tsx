import { EmailHero } from '@/components/services/email-marketing/EmailHero';
import { EmailFeatures } from '@/components/services/email-marketing/EmailFeatures';
import { EmailMethodology } from '@/components/services/email-marketing/EmailMethodology';
import { EmailPricing } from '@/components/services/email-marketing/EmailPricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
    title: 'Email Marketing Agency for Revenue Growth',
    description:
        'Captive Demand builds email marketing systems, lifecycle campaigns, and automation that help brands turn owned audiences into revenue.',
    path: '/services/email-marketing',
});

export default function EmailMarketingServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <ServiceSchema
                name="Email Marketing"
                description={metadata.description as string}
                slug="email-marketing"
            />
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
