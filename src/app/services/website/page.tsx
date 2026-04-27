import type { Metadata } from 'next';
import { WebsiteHero } from '@/components/services/website/WebsiteHero';
import { Methodology } from '@/components/services/website/Methodology';
import { ExampleWork } from '@/components/services/website/ExampleWork';
import { PricingAndAddons } from '@/components/services/website/PricingAndAddons';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ServiceSchema } from '@/components/schema/ServiceSchema';

export const metadata: Metadata = {
    title: 'Website Design and Development Services',
    description:
        'Captive Demand designs and develops fast, conversion-focused websites for growth-stage brands, local businesses, and investor-backed companies.',
    alternates: { canonical: '/services/website' },
    openGraph: {
        title: 'Website Design and Development Services | Captive Demand',
        description:
            'Conversion-focused website design and development built for speed, clarity, and growth.',
        url: '/services/website',
    },
};

export default function WebsiteServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <ServiceSchema
                name="Website Design and Development"
                description={metadata.description as string}
                slug="website"
            />

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
