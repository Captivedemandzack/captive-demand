import { PricingPageClient } from '@/components/pricing/PricingPageClient';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
  title: 'Pricing for Websites, SEO, and Growth Systems',
  description:
    'Review Captive Demand pricing for websites, SEO/AEO, email marketing, automation, and software projects built for growth-stage teams.',
  path: '/pricing',
});

export default function PricingPage() {
  return <PricingPageClient />;
}
