import { SEOHero } from '@/components/services/seo/SEOHero';
import { WhyAEO } from '@/components/services/seo/WhyAEO';
import { SEOMethodology } from '@/components/services/seo/SEOMethodology';
import { ResultsShowcase } from '@/components/services/seo/ResultsShowcase';
import { SEOCaseStudies } from '@/components/services/seo/SEOCaseStudies';
import { SEOPricing } from '@/components/services/seo/SEOPricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
    title: 'SEO and AEO Services for Growth Brands',
    description:
        'Captive Demand builds technical SEO, content, and answer-engine optimization systems that help growth-stage brands compound organic demand.',
    path: '/services/seo',
});

export default function SEOServicePage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <ServiceSchema
                name="SEO and AEO Services"
                description={metadata.description as string}
                slug="seo"
            />
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
